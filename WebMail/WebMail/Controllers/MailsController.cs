using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebMail.Models;

namespace WebMail.Controllers
{
    [Route("api/[controller]")]
    public class MailsController : Controller
    {
        private readonly WebMailContext _context;

        public MailsController(WebMailContext context)
        {
            _context = context;
        }

        // GET api/mails
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return _context.Mail
                .Select(mail => mail.Title);
        }

        // GET api/mails/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return _context.Mail
                .Where(mail => mail.ID == id)
                .Select(mail => mail.Title)
                .First();
        }

        // POST api/mails
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/mails/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/mails/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
