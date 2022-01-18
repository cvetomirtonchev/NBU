using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.InputModels
{
    public class UpdateUserDetailsInputModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public int UserType { get; set; }
        [Required]
        public int IsApproved { get; set; }
        public int? FacultyNumber { get; set; }
        public string? PhoneNumber { get; set; }

    }
}
