using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using FfoeApi.Authentication;
using FfoeApi.Models.InputModels;
using FfoeApi.Models.OutputModels;
using FfoeApi.Models.UsersModels;
using FfoeApi.Services;
using FfoeApi.Services.DapperServices;
using FfoeApi.Workers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace FfoeApi.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        protected readonly IDapperService dapperService;

        private const string StoreProcedureUpdateRole = "[dbo].[UpdateUserRole]";
        private const string StoreProcedureUpdateUserDetails = "[dbo].[UpdateUserDetails]";
        private const string StoreProcedureGetUserDetails = "[dbo].[GetUserDetails]";
        private const string StoreProcedureGetStudents = "[dbo].[GetStudents]";
        private const string StoreProcedureUpdateProfileDetails = "[dbo].[UpdateProfileDetails]";

        private readonly UserManager<ApplicationUser> userManager;

        public UsersController(UserManager<ApplicationUser> userManager, IConfiguration config, IDapperService _dapperService)
        {
            this.userManager = userManager;
            dapperService = _dapperService;
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<IActionResult> GetAll()
        {
            List<ApplicationUser> users = await userManager.Users.ToListAsync();

            List<UsersTableModel> list = new List<UsersTableModel>();

            foreach (var user in users)
            {
                UsersTableModel test = new UsersTableModel()
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    FacultyNumber = user.FacultyNumber,
                    PhoneNumber = user.PhoneNumber,
                    UserType = user.UserType,
                    IsApproved = user.IsApproved
                };
                list.Add(test);
            }
            return Ok(list);
        }

        [HttpPost]
        [Route("updateUserRole")]
        public async Task<IActionResult> UpdateUserRoleAsync(UpdateRoleInputModel inputModel)
        {
            int exequtedResult = await this.dapperService.ExecuteFirstAsync<int>(
               StoreProcedureUpdateRole,
               new
               {
                   @userId = inputModel.UserId,
                   @userType = inputModel.UserType,
               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("updateUserDetails")]
        public async Task<IActionResult> UpdateUserDetailsAsync(UpdateUserDetailsInputModel inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureUpdateUserDetails,
               new
               {
                   @userId = inputModel.UserId,
                   @userType = inputModel.UserType,
                   @facultyNumber = inputModel.FacultyNumber,
                   @phoneNumber = inputModel.PhoneNumber,
                   @isApproved = inputModel.IsApproved
               });

            return Ok(exequtedResult);
        }

        [HttpGet]
        [Route("getStudents")]
        public async Task<IActionResult> GetStudentsAsync()
        {
            IEnumerable<StudentsModel> exequtedResult = await this.dapperService.ExecuteListAsync<StudentsModel>(
               StoreProcedureGetStudents);
            return Ok(exequtedResult);
        }

        [HttpGet()]
        [Route("getUserDetails/{userId}")]
        public async Task<IActionResult> getUserDetailsAsync(string userId)
        {
            IEnumerable<UserDetailsModel> exequtedResult = await this.dapperService.ExecuteListAsync<UserDetailsModel>(
               StoreProcedureGetUserDetails,
               new
               {
                   @userId = userId
               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("updateProfileDetails")]
        public async Task<IActionResult> UpdateProfileDetailsAsync(UpdateProfileDetails inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureUpdateProfileDetails,
               new
               {
                   @firstName = inputModel.FirstName,
                   @lastName = inputModel.LastName,
                   @userId = inputModel.UserId,
                   @email = inputModel.Email,
                   @phoneNumber = inputModel.PhoneNumber,
                   @facultyNumber = inputModel.FacultyNumber
               });

            return Ok(exequtedResult);
        }
        
    }

}
