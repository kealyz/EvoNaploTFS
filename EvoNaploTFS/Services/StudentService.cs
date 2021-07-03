using EvoNaplo.DataAccessLayer;
using EvoNaploTFS.Models;
using EvoNaploTFS.Models.DTO;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvoNaploTFS.Services
{
    public class StudentService
    {
        private readonly EvoNaploContext _evoNaploContext;
        private readonly ILogger<StudentService> _logger;

        public StudentService(ILogger<StudentService> logger, EvoNaploContext EvoNaploContext)
        {
            _logger = logger;
            _evoNaploContext = EvoNaploContext;
        }
        
        public async Task<IEnumerable<User>> AddStudent(User user)
        {
            _logger.LogInformation($"Diák hozzáadása következik: {user}");
            user.Role = User.RoleTypes.Student;
            user.IsActive = true;
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            await _evoNaploContext.Users.AddAsync(user);
            _evoNaploContext.SaveChanges();
            _logger.LogInformation($"Diák hozzáadva.");
            var students = _evoNaploContext.Users.Where(m => m.Role == User.RoleTypes.Student);
            return students.ToList();
        }

        public IEnumerable<UserDTO> ListActiveStudents()
        {
            var students = _evoNaploContext.Users.Where(m => m.Role == User.RoleTypes.Student && m.IsActive == true);
            List<UserDTO> result = new List<UserDTO>();
            foreach (var student in students)
            {
                result.Add(new UserDTO(student));
            }
            return result;
        }

        public IEnumerable<UserDTO> ListJanis()
        {
            var students = _evoNaploContext.Users.Where(m => m.Role == User.RoleTypes.Jani);
            List<UserDTO> result = new List<UserDTO>();
            foreach (var student in students)
            {
                result.Add(new UserDTO(student));
            }
            return result;
        }

        //public async Task<IEnumerable<User>> EditStudent(int id, StudentDto studentDto)
        //{
        //    _logger.LogInformation($"{id} ID-vel rendelkező diák keresése");
        //    var studentToEdit = await _evoNaploContext.Users.FindAsync(id);
        //    _logger.LogInformation($"{id} ID-vel rendelkező diák módosítása indul {studentDto} adatokra");
        //    studentToEdit.Email = studentDto.Email;
        //    studentToEdit.SetNewPassword(studentDto.Password);
        //    studentToEdit.FirstName = studentDto.FirstName;
        //    studentToEdit.LastName = studentDto.LastName;
        //    studentToEdit.PhoneNumber = studentDto.PhoneNumber;
        //    _evoNaploContext.SaveChanges();
        //    _logger.LogInformation($"{id} ID-vel rendelkező diák módosítása kész");
        //    var students = _evoNaploContext.Users.Where(m => m.Role == Role.Student);
        //    return students.ToList();
        //}

        //public async Task<IEnumerable<User>> InactivateStudent(int id)
        //{
        //    _logger.LogInformation($"{id} ID-vel rendelkező diák keresése");
        //    var studentToDelete = await _evoNaploContext.Users.FindAsync(id);
        //    _logger.LogInformation($"{id} ID-vel rendelkező diák inaktiválása indul");
        //    studentToDelete.IsActive = false;
        //    _evoNaploContext.SaveChanges();
        //    _logger.LogInformation($"{id} ID-vel rendelkező diák inaktiválása kész");
        //    var students = _evoNaploContext.Users.Where(m => m.Role == Role.Student);
        //    return students.ToList();
        //}

        public async Task<IEnumerable<User>> DeleteUser(int id)
        {
            var studentToDelete = await _evoNaploContext.Users.FindAsync(id);
            var role = studentToDelete.Role;
            _evoNaploContext.Users.Remove(studentToDelete);
            _evoNaploContext.SaveChanges();
            var students = _evoNaploContext.Users.Where(m => m.Role == role);
            return students.ToList();
        }
    }
}
