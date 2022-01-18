using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.OutputModels
{
    public class AllBooksModel
    {
        public int ID { get; set; }
        public string BookTitle { get; set; }
        public string CategoryName { get; set; }
        public int CategoryId { get; set; }
        public string Language { get; set; }
        public int FreeNoCopies { get; set; }
        public int TotalNoCopies { get; set; }
        public string StudentName { get; set; }
        public string PublicationYear { get; set; }
        public int IsAvailable { get; set; }


    }
}
