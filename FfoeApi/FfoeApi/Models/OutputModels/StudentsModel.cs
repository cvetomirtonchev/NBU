using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.OutputModels
{
    public class StudentsModel
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int FacultyNumber { get; set; }
    }
}
