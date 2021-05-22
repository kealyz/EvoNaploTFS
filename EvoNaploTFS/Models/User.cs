using EvoNaplo.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EvoNaploTFS.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Password { get; set; }
        public bool IsActive { get; set; }
        [Required]
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public RoleTypes Role { get; set; }

        public enum RoleTypes
        {
            Student,
            Mentor,
            Admin,
            Jani
        }
        public User()
        {

        }

        public User(User user)
        {
            FirstName = user.FirstName;
            LastName = user.LastName;
            Password = user.Password;
            IsActive = true;
            Email = user.Email;
            PhoneNumber = user.PhoneNumber;
            Role = user.Role;
        }
    }
}
