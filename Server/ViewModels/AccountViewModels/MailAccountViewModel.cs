using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebMail.Server.ViewModels.AccountViewModels
{
    public class MailAccountViewModel
    {
        [Required]
        [Display(Name = "MailAddress")]
        public string MailAddress { get; set; }

        [Required]
        [Display(Name = "ImapServerAddress")]
        public string ImapServerAddress { get; set; }

        [Required]
        [Display(Name = "SmtpServerAddress")]
        public string SmtpServerAddress { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}
