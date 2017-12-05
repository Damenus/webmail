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
// using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace WebMailTests
{
    public class UnitTests
    {
        public static UserManager<TUser> TestUserManager<TUser>(IUserStore<TUser> store = null) where TUser : class
        {
            store = store ?? new Mock<IUserStore<TUser>>().Object;
            var options = new Mock<IOptions<IdentityOptions>>();
            var idOptions = new IdentityOptions();
            idOptions.Lockout.AllowedForNewUsers = false;
            options.Setup(o => o.Value).Returns(idOptions);
            var userValidators = new List<IUserValidator<TUser>>();
            var validator = new Mock<IUserValidator<TUser>>();
            userValidators.Add(validator.Object);
            var pwdValidators = new List<PasswordValidator<TUser>>();
            pwdValidators.Add(new PasswordValidator<TUser>());
            var userManager = new UserManager<TUser>(store, options.Object, new PasswordHasher<TUser>(),
                userValidators, pwdValidators, new UpperInvariantLookupNormalizer(),
                new IdentityErrorDescriber(), null,
                new Mock<ILogger<UserManager<TUser>>>().Object
                );
            validator.Setup(v => v.ValidateAsync(userManager, It.IsAny<TUser>()))
                .Returns(Task.FromResult(IdentityResult.Success)).Verifiable();
            return userManager;
        }

        // private UserController BuildCoontrollerWithDatabase()
        // {
        //     DbContextOptionsBuilder dbContextOptionsBuilder = new DbContextOptionsBuilder();
        //     dbContextOptionsBuilder.UseInMemoryDatabase();

        //     ApplicationDbContext applicationDbContext = new ApplicationDbContext( dbContextOptionsBuilder.Options);

        //     var userStore = new UserStore<ApplicationUser>(applicationDbContext);
        //     UserManager<ApplicationUser>  userManager = TestUserManager<ApplicationUser>(userStore);
        //     return new UserController(userManager);
        // }

        [Fact]
        public void TestMethodTrue()
        {
            Assert.True(1 == 1);
        }

        [Fact]
        public void TestMethodFalse()
        {
           Assert.False(1 == 2);
        }

        [Fact]
        public void TestMethodSendMail()
        {
            var optionsBuilder = new DbContextOptions<ApplicationDbContext>();
            optionsBuilder.Freeze();
            var dbContext = new Mock<ApplicationDbContext>(optionsBuilder);

            var userStore = new Mock<IUserStore<ApplicationUser>>();
            var userManager = TestUserManager<ApplicationUser>();
            // userManager.GetUserId() = 1;

            var env = new Mock<IHostingEnvironment>();

            var sendMailModel = new SendMailModel();

            WebMail.Server.Controllers.HomeController testhomeController = new WebMail.Server.Controllers.HomeController(userManager, env.Object);
            var view = testhomeController.Index();

        }

        [Fact]
        public void TestToString()
        {
            ValidationErrorCollection validationErrorCollection = new ValidationErrorCollection();
            var html = validationErrorCollection.ToHtml();

            Assert.True( html == "");
        }
        
        [Fact]
        public void TestDecryptPassword()
        {
            var optionsBuilder = new DbContextOptions<ApplicationDbContext>();
            optionsBuilder.Freeze();
            var dbContext = new Mock<ApplicationDbContext>(optionsBuilder);

            var userStore = new Mock<IUserStore<ApplicationUser>>();
            var userManager = TestUserManager<ApplicationUser>();

            // Startup.Configuration["Data:PasswordEncryptionKey"]
            var env = new Mock<IHostingEnvironment>();
            var configuration = new Mock<IConfiguration>();
            // configuration.Setup.configuration;
            // configuration.SetupProperty.configuration = "Data:PasswordEncryptionKey";

            // IConfiguration cconfiguration;
            
            //  cconfiguration["Data:PasswordEncryptionKey"] = "ss";

            // var startup = new Startup(cconfiguration,env.Object);
            // Startup.Configuration["Data:PasswordEncryptionKey"] = "ss";

            // // var startup = new Mock<Startup>(configuration.Object,env.Object);
            // // Startup.Configuration["Data:PasswordEncryptionKey"] = "ss";
            // MailController mailController = new MailController(dbContext.Object, userManager);

            // var pass = "AlaMaKota";
            // var encrypt = mailController.decryptPasswordMethod(pass);
            // var decrypt = mailController.decryptPasswordMethod(encrypt);

            // Assert.True(decrypt == pass);

            // PrivateObject obj = new PrivateObject(mailController);
            // var retVal = obj.Invoke("DecryptPassword");
            // Assert.AreEqual(retVal);
            
        }
        
    }
}