using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.AuthenticationModels
{
    public class Response
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public string Email { get; set; }
    }
}
