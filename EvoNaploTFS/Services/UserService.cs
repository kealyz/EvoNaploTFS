using EvoNaplo.DataAccessLayer;
using EvoNaploTFS.Models;
using EvoNaploTFS.Models.DTO;
using EvoNaploTFS.Models.TableConnectors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvoNaploTFS.Services
{
    public class UserService
    {
        private readonly EvoNaploContext _evoNaploContext;
        public UserService(EvoNaploContext EvoNaploContext)
        {
            _evoNaploContext = EvoNaploContext;
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
        public IEnumerable<UserDTO> ListActiveMentors()
        {
            var mentors = _evoNaploContext.Users.Where(m => m.Role == User.RoleTypes.Mentor && m.IsActive == true);
            List<UserDTO> result = new List<UserDTO>();
            foreach (var mentor in mentors)
            {
                result.Add(new UserDTO(mentor));
            }
            return result;
        }

        public IEnumerable<UserDTO> ListActiveAdmins()
        {
            var admins = _evoNaploContext.Users.Where(m => m.Role == User.RoleTypes.Admin && m.IsActive == true);
            List<UserDTO> result = new List<UserDTO>();
            foreach (var admin in admins)
            {
                result.Add(new UserDTO(admin));
            }
            return result;
        }

        public UserDTO GetUserById(int id)
        {
            var user = _evoNaploContext.Users.FirstOrDefault(u => u.Id == id);
            if(user != null)
            {
                return new UserDTO(user);
            }
            else
            {
                return new UserDTO();
            }
        }

        public IEnumerable<StudentCommentDTO> GetStudentComments(int id)
        {
            var comments = _evoNaploContext.StudentComments.Where(c => c.UserId == id);
            List<StudentComment> commentsCopy = new List<StudentComment>();
            foreach (var comment in comments)
            {
                commentsCopy.Add(comment);
            }
            List<StudentCommentDTO> result = new List<StudentCommentDTO>();
            foreach (var comment in commentsCopy)
            {
                var commenter = _evoNaploContext.Users.FirstOrDefault(u => u.Id == comment.CommenterId);
                string commenterName = $"{commenter.FirstName} {commenter.LastName}";
                result.Add(new StudentCommentDTO(comment,commenterName));
            }
            return result;
        }

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
