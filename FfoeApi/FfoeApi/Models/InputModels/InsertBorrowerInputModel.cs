using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.InputModels
{
    public class InsertBorrowerInputModel
    {
        public string BorrowerId { get; set; }
        public int BookId { get; set; }
        public DateTime? BorrowedFrom { get; set; }
        public DateTime? BorrowedTo{ get; set; }
        public string? IssuerId { get; set; }
        public string? IssuerName { get; set; }
        public int? IsRequested { get; set; }
    }
}
