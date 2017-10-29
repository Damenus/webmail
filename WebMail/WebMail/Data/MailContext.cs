using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebMail.Models
{
    public class MailContext : DbContext
    {
        public MailContext (DbContextOptions<MailContext> options)
            : base(options)
        {
        }

        public DbSet<WebMail.Models.Mail> Mail { get; set; }
    }
}
