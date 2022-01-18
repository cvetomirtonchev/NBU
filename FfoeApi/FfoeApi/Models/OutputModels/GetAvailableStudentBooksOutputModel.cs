using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.InputModels
{
    public class GetAvailableStudentBooksOutputModel
    {
        public int ID { get; set; }
        public int BindingId { get; set; }
        public string BookTitle { get; set; }
        public string Language { get; set; }
        public string CategoryName { get; set; }
        public int PublicationYear { get; set; }
    }
}
