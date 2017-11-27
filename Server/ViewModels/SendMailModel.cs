using System.ComponentModel.DataAnnotations;

namespace WebMail.Server.ViewModels
{
    public class SendMailModel
    {
        [Required]
        [EmailAddress]
        public string Receiver { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Body { get; set; }
        public string AttachmentName { get; set; }
        public string Attachment { get; set; }
    }
}
