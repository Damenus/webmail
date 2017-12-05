using System;
using Xunit;
using WebMail.Server.Controllers.api;
using Moq;
using WebMail.Server.Entities;
using WebMail.Server.Extensions;
using WebMail.Server.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using MailKit;
using MailKit.Net.Imap;
using MailKit.Search;
using MailKit.Security;
using MimeKit;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using MailKit.Net.Smtp;
using System.Security.Cryptography;
using System.Text;
using System.IO;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Configuration;
using WebMail.Server;
using Microsoft.Extensions.Options;
using WebMail.Server.Controllers;
using WebMail.Server.Filters;
using WebMail;
using Microsoft.Extensions.Configuration;

namespace WebMailTests
{
     public class IntegrationTests
     {
//         private readonly TestServer _server;
//         private readonly HttpClient _client;
//         public IntegrationTests(){
//             string[] args = {};
//             // _server = new TestServer(WebMail.Program.BuildWebHost(args));
//             _server = new TestServer(new WebHostBuilder()
//                     .UseConfiguration(      
//                          new ConfigurationBuilder()
//                             .SetBasePath(Directory.GetCurrentDirectory())
//                             .AddJsonFile("hosting.json", optional: true)
//                             .Build())
//                  .UseStartup<StartupTest>());
//             _client = _server.CreateClient();


//         }

//     // public static IWebHost BuildWebHost(string[] args) =>
// //           WebHost.CreateDefaultBuilder(args)
// //               .UseConfiguration(new ConfigurationBuilder()
// //                   .SetBasePath(Directory.GetCurrentDirectory())
// //                   .AddJsonFile("hosting.json", optional: true)
// //                   .Build()
// //               )
// //               .UseStartup<Startup>()
// //               .Build();
//         private async Task<string> GetCheckResponseString(string querystring = "")
//         {
//             var request = "/Manage/RemoveLogin";
//             if(!string.IsNullOrEmpty(querystring))
//             {
//                 request += "?" + querystring;
//             }
//             var response = await _client.GetAsync(request);
//             response.EnsureSuccessStatusCode();

//             return await response.Content.ReadAsStringAsync();
//         }

//         [Fact]
//         public async void TestMethod4Async()
//         {
//             var responseString = await GetCheckResponseString();

//             // Assert
//             //Assert.Equal("Pass in a number to check in the form /checkprime?5", responseString);
//         }
     }
}