using EvoNaplo.DataAccessLayer;
using EvoNaploTFS.Models.DTO;
using EvoNaploTFS.Models.TableConnectors;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EvoNaploTFS.Services
{
    public class CommentService
    {
        private readonly EvoNaploContext _evoNaploContext;

        public CommentService(EvoNaploContext EvoNaploContext)
        {
            _evoNaploContext = EvoNaploContext;
        }

        internal async Task AddStudentComment(StudentComment studentComment)
        {
            await _evoNaploContext.StudentComments.AddAsync(studentComment);
        }

        internal async Task AddProjectComment(ProjectComment projectComment)
        {
            await _evoNaploContext.ProjectComments.AddAsync(projectComment);
        }

        internal async Task EditStudentComment(CommentDTO studentComment)
        {
            var studentCommentToEdit = await _evoNaploContext.StudentComments.FindAsync(studentComment.Id);
            studentCommentToEdit.Comment = studentComment.Comment;
            _evoNaploContext.SaveChanges();
        }

        internal async Task EditProjectComment(CommentDTO projectComment)
        {
            var projectCommentToEdit = await _evoNaploContext.ProjectComments.FindAsync(projectComment.Id);
            projectCommentToEdit.Comment = projectComment.Comment;
            _evoNaploContext.SaveChanges();
        }
    }
}
