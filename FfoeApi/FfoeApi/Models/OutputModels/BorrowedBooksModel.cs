using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.OutputModels
{
    public class BorrowedBooksModel
    {
        public int RowId { get; set; }
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string BookTitle { get; set; }
        public string BookId { get; set; }
        public string CategoryName { get; set; }
        public string BorrowedFrom { get; set; }
        public string BorrowedTo { get; set; }
        public string ActualReturnDate { get; set; }
        public bool IsOverDue { get; set; }


    }
}
