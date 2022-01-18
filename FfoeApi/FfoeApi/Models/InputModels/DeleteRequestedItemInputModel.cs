using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.InputModels
{
    public class DeleteRequestedItemInputModel
    {
        public string StudentId { get; set; }
        public int BookId { get; set; }
    }
}
