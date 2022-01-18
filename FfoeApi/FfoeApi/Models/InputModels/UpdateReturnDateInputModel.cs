using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.InputModels
{
    public class UpdateReturnDateInputModel
    {
        public string BorrowerId { get; set; }
        public int BookId { get; set; }
        public DateTime ReturnDate { get; set; }
    }
}
