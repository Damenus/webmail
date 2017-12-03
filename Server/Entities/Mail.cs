using System;

namespace WebMail.Server.Entities
{
    public class Mail
    {
        public int ID { get; set; }
        public uint UniqueID { get; set; }
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string AttachmentName { get; set; }
        public string Attachment { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTimeOffset Date { get; set; }
    }
}
