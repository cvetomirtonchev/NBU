using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace FfoeApi.Authentication
{
    public class ApplicationUser : IdentityUser
    {
        [Required(ErrorMessage = "First Name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; }

        //[Required(ErrorMessage = "Faculty Number is required")]
        public int? FacultyNumber { get; set; }

        public int? UserType { get; set; }
        public int IsApproved { get; set; }
    }
}