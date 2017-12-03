using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebMail.Server.Entities
{
    public class Draft
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
