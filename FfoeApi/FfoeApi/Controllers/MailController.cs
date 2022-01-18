using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FfoeApi.Authentication;
using FfoeApi.Models.MailModels;
using FfoeApi.Services.MailService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Cmp;

namespace FfoeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailService mailService;
        private readonly UserManager<ApplicationUser> userManager;
        public MailController(UserManager<ApplicationUser> userManager, IMailService mailService)
        {
            this.mailService = mailService;
            this.userManager = userManager;
        }
        [HttpPost("send")]
        public async Task<IActionResult> SendMail([FromForm] MailRequest request)
        {
            try
            {
                await mailService.SendEmailAsync(request);
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [HttpPost("sendConfirmationEmail")]
        public async Task<IActionResult> SendConfirmationMail([FromForm] MailRequest request)
        {
            try
            {
                ApplicationUser user = await userManager.FindByNameAsync(request.UserName);

                string token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                Uri callbackUrl = new Uri(Url.Link("ConfirmEmailRoute", new { userId = user.Id, token = token }));
                request.ToEmail = user.Email;
                request.UserName = user.UserName;
                request.Subject = "Email confirmation";
                request.Body = "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>";
               
                await mailService.SendEmailAsync(request);
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpGet]
        [Route("ConfirmEmail", Name = "ConfirmEmailRoute")]
        public async Task<IActionResult> ConfirmEmail(string userId = "", string token = "")
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(token))
            {
                ModelState.AddModelError("", "User Id and Code are required");
                return BadRequest(ModelState);
            }

            var user = await userManager.FindByIdAsync(userId);

            IdentityResult result = await this.userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Redirect("http://localhost:4200/account/login");
            }
            else
            {
                return BadRequest(result);
            }
        }
    }
}
