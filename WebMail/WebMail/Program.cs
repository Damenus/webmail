using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using WebMail.Models;
using MailKit;
using MailKit.Net.Imap;
using MailKit.Security;
using MailKit.Search;

namespace WebMail
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<MailContext>();
                    DbInitializer.Initialize(context);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }

            DownloadMails();

            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();

        public static void DownloadMails()
        {
            Console.WriteLine("\n========== DownloadMails() BEGIN ==========\n");
            try
            {
                ImapClient imapClient = new ImapClient();
                imapClient.Connect("imap.gmail.com", 993, SecureSocketOptions.SslOnConnect);
                imapClient.Authenticate("webmail2017.dev", "12341234xx");

                imapClient.Inbox.Open(FolderAccess.ReadOnly);
                var uids = imapClient.Inbox.Search(SearchQuery.All);

                foreach (var uid in uids)
                {
                    var message = imapClient.Inbox.GetMessage(uid);
                    Console.WriteLine("\n{0} -------------------------", uid);
                    Console.WriteLine("From: {0}", message.From);
                    Console.WriteLine("Subject: {0}", message.Subject);
                    //Console.WriteLine("TextBody: {0}\n", message.TextBody); // uncomment to print whole message content
                }

                imapClient.Disconnect(true);
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred while trying to download mails: {0}", ex.Message);
            }
            Console.WriteLine("\n=========== DownloadMails() END ===========\n");
        }
    }
}
