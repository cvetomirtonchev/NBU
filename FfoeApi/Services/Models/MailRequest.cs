﻿using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
namespace FfoeApi.Models.MailModels
{
    public class MailRequest
    {
        public string UserName { get; set; }
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public List<IFormFile> Attachments { get; set; }
    }
}