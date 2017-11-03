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
    }
}
