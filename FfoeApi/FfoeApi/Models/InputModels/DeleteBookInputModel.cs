using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.InputModels
{
    public class DeleteBookInputModel
    {
        [Required]
        public int BookId { get; set; }
        public int BindingId { get; set; }
    }
}
