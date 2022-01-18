using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Models.InputModels
{
    public class DeleteCategoryInputModel
    {
        [Required]
        public int CategoryId { get; set; }
    }
}
