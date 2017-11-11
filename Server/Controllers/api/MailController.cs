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

namespace WebMail.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize]
    public class MailController : BaseController
    {
        private static List<Mail> MAILS = new List<Mail>
        {
            new Mail
            {
                Title = "Hello, World!",
                Body = "Lorem ipsum"
            },
            new Mail
            {
                Title = "Foo bar baz",
                Body = "Lorem ipsum"
            },
            new Mail
            {
                Title = "ADkjahsdfka",
                Body = "Lorem ipsum"
            }
        };

        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public MailController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;

            if (!_dbContext.Mails.Any())
            {
                _dbContext.Mails.AddRange(MAILS);
            }

            _dbContext.SaveChanges();
        }

        [HttpGet]
        public IEnumerable<Mail> GetMails()
        {
            //return _dbContext.Mails;
            
            int userId = Int32.Parse(_userManager.GetUserId(this.User));

            MailAccount userMailAccount = _dbContext.MailAccounts.Where(a => a.UserID == userId).First();
            HashSet<Mail> mails = new HashSet<Mail>();
            try
            {
                ImapClient imapClient = new ImapClient();
                //imapClient.Connect("imap.gmail.com", 993, SecureSocketOptions.SslOnConnect);
                imapClient.Connect(userMailAccount.ImapServerAddress, 993, SecureSocketOptions.SslOnConnect);
                //imapClient.Authenticate("webmail2017.dev", "12341234xx");
                imapClient.Authenticate(userMailAccount.MailAddress, userMailAccount.Password);
                imapClient.Inbox.Open(FolderAccess.ReadOnly);
                var uidsFromServer = imapClient.Inbox.Search(SearchQuery.All);

                foreach (UniqueId uid in uidsFromServer)
                {
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
            catch (Exception ex)
            {
                return _dbContext.Mails; // return "hello world" mails from DB
            }

            return mails;
        }

        [HttpPut("UpdateInboxMails")]
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
        }
    }
}
