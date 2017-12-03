using System;
using Xunit;
using WebMail.Server.Controllers.api;

namespace WebMailTests
{
    public class UnitTests
    {
        public MailController mailController;

        [Fact]
        public void TestMethod1()
        {
            Assert.True(1 == 1);
            
        }

        [Fact]
        public void TestMethod()
        {
           Assert.False(1 == 2);
        }
    }
}
