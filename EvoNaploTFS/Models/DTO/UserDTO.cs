using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvoNaploTFS.Models.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IsActive { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public UserDTO()
        {
            Id = -1;
        }

        public UserDTO(User user)
        {
            Id = user.Id;
            IsActive = user.IsActive ? "Active" : "Inactive";
            Name = $"{user.FirstName} {user.LastName}";
            Email = user.Email;
            if (!String.IsNullOrEmpty(user.PhoneNumber))
            {
                PhoneNumber = user.PhoneNumber;
            }
            else
            {
                PhoneNumber = "No data";
            }
        }
    }
}
