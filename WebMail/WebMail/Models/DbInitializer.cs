using System;
using System.Linq;
using WebMail.Models;

namespace WebMail
{
    internal class DbInitializer
    {
        internal static void Initialize(MailContext context)
        {
            context.Database.EnsureCreated();

            if (context.Mail.Any())
            {
                return;
            }

            context.Mail.AddRange(
                new Mail
                {
                    Title = "Hello world"
                },
                new Mail
                {
                    Title = "Re: Hello world"
                }
            );

            context.SaveChanges();
        }
    }
}