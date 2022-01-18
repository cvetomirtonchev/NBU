using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.AuthenticationModels
{
    public class LoginResponseModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public int? UserType { get; set; }
        public string Token { get; set; }
    }
}
