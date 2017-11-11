using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebMail.Server.Entities
{
    public class MailAccount
    {
        public int ID { get; set; }
        public string MailAddress { get; set; }
        public string ImapServerAddress { get; set; }
        public string Password { get; set; }
        public int UserID { get; set; }
        public ApplicationUser User { get; set; }
    }
}
