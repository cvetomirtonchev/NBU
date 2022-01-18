
using System.ComponentModel.DataAnnotations;

namespace FfoeApi.Models.InputModels
{
    public class UpdateRoleInputModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public int UserType { get; set; }
    }
}
