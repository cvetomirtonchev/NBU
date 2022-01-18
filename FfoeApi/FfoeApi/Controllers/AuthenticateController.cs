using FfoeApi.Authentication;
using FfoeApi.Models.AuthenticationModels;
using FfoeApi.Models.MailModels;
using FfoeApi.Services.MailService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FfoeApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMailService mailService;
 
        public AuthenticateController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IMailService mailService)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            this.mailService = mailService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password) && user.IsApproved == 1 && user.EmailConfirmed)
            {
                IList<string> userRoles = await userManager.GetRolesAsync(user);

                List<Claim> authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                SymmetricSecurityKey authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                JwtSecurityToken token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(1),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    id = user.Id,
                    userName = user.FirstName + " " + user.LastName,
                    userType = user.UserType,
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            if (user != null)
            {
                if (!user.EmailConfirmed)
                {
                    return StatusCode(StatusCodes.Status502BadGateway,
                        new Response { Status = "Error", Message = "Confirmé votre email!" }); ;
                }
                if (user.IsApproved != 1)
                {
                    return StatusCode(StatusCodes.Status401Unauthorized,
                        new Response { Status = "Error", Message = "Votre compte doit être approuvé par l'administrateur!", Email = user.Email });
                }
            }
            return StatusCode(StatusCodes.Status401Unauthorized,
                         new Response { Status = "Error", Message = "Votre nom d'utilisateur ou mot de passe sont incorrects!"});
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            ApplicationUser userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "L'utilisateur déjà exists!" });

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                FirstName = model.FirstName,
                LastName = model.LastName,
                FacultyNumber = model.FacultyNumber,
                UserType = 2,
                IsApproved = 1
            };
            IdentityResult result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    new Response { Status = "Error", Message = "La création de l'utilisateur a échoué! Veuillez vérifier les détails de l'utilisateur et réessayer.." });

            if (!await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));
            }

            if (await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await userManager.AddToRoleAsync(user, UserRoles.User);
            }
            string token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            Uri callbackUrl = new Uri(Url.Link("ConfirmEmailRoute", new { userId = user.Id, token }));

            MailRequest request = new MailRequest
            {
                ToEmail = user.Email,
                UserName = user.UserName,
                Subject = "Email confirmation",
                Body = callbackUrl.ToString()
            };

            await mailService.SendEmailAsync(request);
            return Ok(new Response { Status = "Succès", Message = "L'utilisateur a été créé avec succès, veuillez confirmer votre e-mail.!" });
        }
    }

}
