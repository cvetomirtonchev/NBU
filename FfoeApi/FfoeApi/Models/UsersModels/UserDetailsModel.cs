using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.UsersModels
{
    public class UserDetailsModel
    {
		public string UserName { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public bool EmailConfirmed { get; set; }
		public string PhoneNumber { get; set; }
		public int FacultyNumber { get; set; }
		public int UserType { get; set; }
		public int IsApproved { get; set; }
		public int CourseYear { get; set; }
	}
}
