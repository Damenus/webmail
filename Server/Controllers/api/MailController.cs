using System;
using System.Net;
using System.Threading.Tasks;
using WebMail.Server.Entities;
using WebMail.Server.Extensions;
using WebMail.Server.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using MailKit;
using MailKit.Net.Imap;
using MailKit.Search;
using MailKit.Security;
using MimeKit;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using MailKit.Net.Smtp;
using System.Security.Cryptography;
using System.Text;
using System.IO;

namespace WebMail.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize]
    public class MailController : BaseController
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public MailController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        // api/mail?[address=<mail_address>]&[messageUID=<UID>]
        [HttpGet]
        public IEnumerable<Mail> GetMailsFromGivenMailbox([FromQuery] string address, [FromQuery] uint? messageUID) 
        {
            int userId = Int32.Parse(_userManager.GetUserId(this.User));

            IQueryable<MailAccount> query; 
            if (address == null)    //address was not given as a parameter
                query = _dbContext.MailAccounts.Where(a => a.UserID == userId);
            else
                query = _dbContext.MailAccounts.Where(a => a.UserID == userId && a.MailAddress == address);

            if (!query.Any())   // if given email was not found
                return null;

            MailAccount userMailAccount = query.First();
            HashSet<Mail> mails = new HashSet<Mail>();
            try
            {
                ImapClient imapClient = new ImapClient();
                //imapClient.Connect("imap.gmail.com", 993, SecureSocketOptions.SslOnConnect);
                imapClient.Connect(userMailAccount.ImapServerAddress, 993, SecureSocketOptions.SslOnConnect);
                //imapClient.Authenticate("webmail2017.dev", "12341234xx");
                imapClient.Authenticate(userMailAccount.MailAddress, decryptPassword(userMailAccount.Password));
                imapClient.Inbox.Open(FolderAccess.ReadOnly);

                if (messageUID == null) //if uid parameter was not given - return all messages
                {
                    var uidsFromServer = imapClient.Inbox.Search(SearchQuery.All);
                    var summaries = imapClient.Inbox.Fetch(uidsFromServer, MessageSummaryItems.Full | MessageSummaryItems.Envelope | MessageSummaryItems.UniqueId);

                    foreach (var summary in summaries)
                    {
                        string bodyText = "";
                        try
                        {
                            var textBody = summary.TextBody;
                            var bodyPart = (TextPart)imapClient.Inbox.GetBodyPart(summary.UniqueId, textBody);
                            bodyText = bodyPart.Text;
                        }
                        catch(Exception ex)
                        {
                            bodyText = "";
                        }

                        mails.Add(new Mail
                        {
                            UniqueID = summary.UniqueId.Id,
                            Sender = summary.Envelope.From.ToString(),
                            Title = summary.Envelope.Subject,
                            Body = bodyText,
                            Date = (DateTimeOffset)summary.Envelope.Date
                        });
                    }
                }
                else        //if uid parameter was given - return precise message
                {
                    UniqueId uid = new UniqueId((uint)messageUID);
                    MimeMessage message = imapClient.Inbox.GetMessage(uid);
                    mails.Add(new Mail
                    {
                        UniqueID = uid.Id,
                        Sender = message.From.ToString(),
                        Title = message.Subject,
                        Body = message.TextBody,
                        Date = message.Date
                    });
                }

                imapClient.Disconnect(true);
            }
            catch(Exception e)
            {
                return null;
                //return _dbContext.Mails; // return "hello world" mails from DB
            }

            return mails;
        }

        /* [HttpPut("UpdateInboxMails")]
         public IActionResult UpdateInboxMails()
         {
             ImapClient imapClient = new ImapClient();

             try
             {
                 imapClient.Connect("imap.gmail.com", 993, SecureSocketOptions.SslOnConnect);
             }
             catch (Exception ex)
             {
                 return Content("Error while trying to connect IMAP server: {0}", ex.Message);
             }

             try
             {
                 imapClient.Authenticate("webmail2017.dev", "12341234xx");
             }
             catch (Exception ex)
             {
                 return Content("IMAP authentication error: {0}", ex.Message);
             }

             try
             {
                 imapClient.Inbox.Open(FolderAccess.ReadOnly);
                 var uidsFromServer = imapClient.Inbox.Search(SearchQuery.All);
                 var uidsFromDB = GetMails().Select(m => m.UniqueID);

                 foreach (UniqueId uid in uidsFromServer)
                 {
                     if (!uidsFromDB.Contains(uid.Id))
                     {
                         MimeMessage message = imapClient.Inbox.GetMessage(uid);
                         _dbContext.Mails.Add(new Mail
                         {
                             UniqueID = uid.Id,
                             Sender = message.From.ToString(),
                             Title = message.Subject,
                             Body = message.TextBody,
                             Date = message.Date
                         });
                         _dbContext.SaveChanges();
                     }
                 }

                 imapClient.Disconnect(true);
             }
             catch (Exception ex)
             {
                 return Content("Error while trying to download mails from IMAP server: {0}", ex.Message);
             }

             return Content("UpdateInboxMails completed successfully.");
         }*/

        [HttpGet("Drafts")]
        public IEnumerable<Draft> GetDrafts([FromQuery] uint? messageID)
        {
            int userId = Int32.Parse(_userManager.GetUserId(this.User));

            IQueryable<MailAccount> query;
            query = _dbContext.MailAccounts.Where(a => a.UserID == userId);
            
            if (!query.Any())   // if given email was not found
                return null;

            MailAccount userMailAccount = query.First();
            try
            {
                if (messageID == null) //if uid parameter was not given - return all messages
                {
                    return _dbContext.Drafts.Where(d => d.Sender == userMailAccount.MailAddress).ToHashSet();
                }
                else        //if uid parameter was given - return precise message
                {
                    return _dbContext.Drafts.Where(d => d.Sender == userMailAccount.MailAddress && d.ID == messageID).ToHashSet();
                }
            }
            catch (Exception e)
            {
                return null;
                //return _dbContext.Mails; // return "hello world" mails from DB
            }
        }

        [HttpPost("SaveDraft")]
        public IActionResult SaveDraft([FromBody] SendMailModel model)
        {
            try
            {
                int userId = Int32.Parse(_userManager.GetUserId(this.User));
                MailAccount userMailAccount = _dbContext.MailAccounts.Where(a => a.UserID == userId).First();
                Draft draft = new Draft
                {
                    Receiver = model.Receiver,
                    Title = model.Subject,
                    Body = model.Body,
                    Attachment = model.Attachment,
                    Sender = userMailAccount.MailAddress
                };

                _dbContext.Drafts.Add(draft);
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content("Error while trying to save draft: ", ex.Message);
            }

            return Content("SaveDraft completed successfully.");
        }

        [HttpPost("SendMail")]
        public IActionResult SendMail([FromBody] SendMailModel model)
        {
            string receiver = model.Receiver;
            string subject = model.Subject;
            string body = model.Body;
            string attachment = model.Attachment;

            int userId = Int32.Parse(_userManager.GetUserId(this.User));
            MailAccount userMailAccount = _dbContext.MailAccounts.Where(a => a.UserID == userId).First();
            MimeMessage message = new MimeMessage();
            try
            {
                message.From.Add(new MailboxAddress("", userMailAccount.MailAddress));
                message.To.Add(new MailboxAddress("", receiver));
                message.Subject = subject;

                var builder = new BodyBuilder { TextBody = body };

                if (attachment != null)
                {
                    byte[] attachmentData = Convert.FromBase64String(model.Attachment);
                    builder.Attachments.Add(model.AttachmentName ?? "Attachment", attachmentData);
                }

                message.Body = builder.ToMessageBody();
            }
            catch (Exception ex)
            {
                return Content("Error while trying to construct MimeMessage object: {0}", ex.Message);
            }

            try
            {
                using (SmtpClient smtpClient = new SmtpClient())
                {
                    smtpClient.Connect(userMailAccount.SmtpServerAddress, 587);
                    smtpClient.Authenticate(userMailAccount.MailAddress, decryptPassword(userMailAccount.Password));
                    smtpClient.Send(message);
                    smtpClient.Disconnect(true);
                }
            }
            catch (Exception ex)
            {
                return Content("Error while trying to send mail via SMTP: {0}", ex.Message);
            }

            return Content("SendMail completed successfully.");
        }

        private string decryptPassword(string encryptedPassword)
        {
            string decryptedPassword;
            using (Aes aes = Aes.Create())
            {
                aes.Mode = CipherMode.ECB;
                aes.KeySize = 128;
                aes.Padding = PaddingMode.PKCS7;
                aes.Key = Encoding.ASCII.GetBytes(Startup.Configuration["Data:PasswordEncryptionKey"]);

                var decryptor = aes.CreateDecryptor();
                byte[] encryptedPasswordBytes = Convert.FromBase64String(encryptedPassword);
                byte[] decryptedBytes = decryptor.TransformFinalBlock(encryptedPasswordBytes, 0, encryptedPasswordBytes.Length);
                decryptedPassword = Encoding.ASCII.GetString(decryptedBytes);
            }
            return decryptedPassword;
        }

        public string decryptPasswordMethod(string encryptedPassword)
        {
            return decryptPassword(encryptedPassword);
        }
    }
}
