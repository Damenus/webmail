using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebMail.Server;
using WebMail.Server.Entities;
using Microsoft.AspNetCore.Authorization;
using WebMail.Server.ViewModels.AccountViewModels;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace WebMail.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/MailAccounts")]
    [Authorize]
    public class MailAccountsController : Controller
    {
        private readonly ApplicationDbContext _dbcontext;
        private readonly UserManager<ApplicationUser> _userManager;

        public MailAccountsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _dbcontext = context;
            _userManager = userManager;
        }

        // GET: api/MailAccounts
        [HttpGet]
        public IEnumerable<MailAccount> GetMailAccounts()
        {
            int userId = Int32.Parse(_userManager.GetUserId(this.User));

            var mailAccounts = _dbcontext.MailAccounts.Select(m => m).Where(m => m.UserID == userId);

            return mailAccounts;
        }

        /*// GET: api/MailAccounts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMailAccount([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mailAccount = await _dbcontext.MailAccounts.SingleOrDefaultAsync(m => m.ID == id);

            if (mailAccount == null)
            {
                return NotFound();
            }

            return Ok(mailAccount);
        }*/

        /*// PUT: api/MailAccounts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMailAccount([FromRoute] int id, [FromBody] MailAccount mailAccount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != mailAccount.ID)
            {
                return BadRequest();
            }

            _dbcontext.Entry(mailAccount).State = EntityState.Modified;

            try
            {
                await _dbcontext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MailAccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }*/

        // POST: api/MailAccounts
        [HttpPost]
        public async Task<IActionResult> PostMailAccount([FromBody] MailAccountViewModel model, string returnUrl = null)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            int userId = Int32.Parse(_userManager.GetUserId(this.User));
            ApplicationUser user = _dbcontext.ApplicationUsers.Where(u => u.Id == userId).First();

            var mailAccount = new MailAccount
            {
                MailAddress = model.MailAddress,
                ImapServerAddress = model.ImapServerAddress,
                SmtpServerAddress = model.SmtpServerAddress,
                Password = model.Password,
                UserID = userId,
                User = user
            };

            _dbcontext.MailAccounts.Add(mailAccount);
            user.MailAccounts.Add(mailAccount);
            _dbcontext.SaveChanges();

            return CreatedAtAction("GetMailAccount", new { id = mailAccount.ID }, mailAccount);
        }

        // DELETE: api/MailAccounts/<mail_address>
        [HttpDelete("{mailAddress}")]
        public async Task<IActionResult> DeleteMailAccount([FromRoute] string mailAddress)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int userId = Int32.Parse(_userManager.GetUserId(this.User));
            ApplicationUser user = _dbcontext.ApplicationUsers.Where(u => u.Id == userId).First();

            var mailAccount = await _dbcontext.MailAccounts.SingleOrDefaultAsync(m => m.MailAddress == mailAddress && m.UserID == userId);
            if (mailAccount == null)
            {
                return NotFound();
            }

            _dbcontext.MailAccounts.Remove(mailAccount);
            await _dbcontext.SaveChangesAsync();

            return Ok(mailAccount);
        }

        private bool MailAccountExists(int id)
        {
            return _dbcontext.MailAccounts.Any(e => e.ID == id);
        }
    }
}