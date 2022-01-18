using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.InputModels
{
    public class InsertBookInputModel
    {
        public int BookId { get; set; }
        public string BookTitle { get; set; }
        public int CategoryId { get; set; }
        public int BindingId { get; set; }
        public string Language { get; set; }
        public int PublicationYear { get; set; }
        public string LibrarianId { get; set; }
    }
}
