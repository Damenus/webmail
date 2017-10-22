using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace WebMail.Models
{
    public class WebMailContext : DbContext
    {
        public WebMailContext(DbContextOptions<WebMailContext> options)
            : base(options)
        {
        }

        public DbSet<WebMail.Models.Mail> Mail { get; set; }
    }
}
