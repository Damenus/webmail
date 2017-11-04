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

namespace WebMail.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [AllowAnonymous]
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

        public MailController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;

            if (!_dbContext.Mails.Any())
            {
                _dbContext.Mails.AddRange(MAILS);
            }

            _dbContext.SaveChanges();
        }

        public IEnumerable<Mail> GetMails()
        {
            return _dbContext.Mails;
        }

        public bool UpdateInboxMessages()
        {
            try
            {
                ImapClient imapClient = new ImapClient();
                imapClient.Connect("imap.gmail.com", 993, SecureSocketOptions.SslOnConnect);
                imapClient.Authenticate("webmail2017.dev", "12341234xx");
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
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred while trying to update inbox mails: {0}", ex.Message);
                return false;
            }
        }
    }
}
