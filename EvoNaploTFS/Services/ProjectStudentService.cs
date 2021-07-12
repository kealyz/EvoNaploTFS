using EvoNaplo.DataAccessLayer;
using EvoNaploTFS.Models;
using EvoNaploTFS.Models.DTO;
using EvoNaploTFS.Models.TableConnectors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace EvoNaploTFS.Services
{
    public class ProjectStudentService
    {
        private readonly EvoNaploContext _evoNaploContext;

        public ProjectStudentService(EvoNaploContext EvoNaploContext)
        {
            _evoNaploContext = EvoNaploContext;
        }

        internal ProjectStudentsDTO GetProjectStudents()
        {
            if(_evoNaploContext.Semesters.ToList().Count == 0)
            {
                return new ProjectStudentsDTO();
            }
            var mostRecentSemesterId = _evoNaploContext.Semesters.Max(semester => semester.Id);
            var projects = _evoNaploContext.Projects.Where(project => project.SemesterId == mostRecentSemesterId).ToList();
            var students = _evoNaploContext.Users.Where(student => student.Role == User.RoleTypes.Student).ToList();
            var projectStudentTable = _evoNaploContext.UserProjects.ToList();

            ProjectStudentsDTO projectStudentsDTO = new ProjectStudentsDTO();

            projectStudentsDTO.projectStudents = students.Select(student => new ProjectStudent(student)).ToList();

            foreach (var project in projects)
            {
                ColumnProject columnProject = new ColumnProject(project);

                foreach (var projectStudent in projectStudentTable)
                {
                    if (projectStudent.ProjectId == project.Id)
                    {
                        columnProject.ProjectStudentIds.Add(projectStudent.UserId.ToString());
                    }
                }

                projectStudentsDTO.columnProjects.Add(columnProject);
                projectStudentsDTO.columnOrder.Add(columnProject.Id);
            }

            return projectStudentsDTO;
        }

        public bool ManageStudentOnProject(StudentToProjectDTO studentToProjectDTO)
        {
            try
            {
                var userProjecToEdit = _evoNaploContext.UserProjects.FirstOrDefault(u => u.UserId == studentToProjectDTO.studentId && u.ProjectId == studentToProjectDTO.fromProjectId);

                if(userProjecToEdit == null)
                {
                    return false;
                }
                userProjecToEdit.ProjectId = studentToProjectDTO.toProjectId;
                _evoNaploContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            
        }

        public async Task JoinProjectAsStudent(int studentId, int projectId)
        {
            var newRowToAdd = new UserProject();
            newRowToAdd.UserId = studentId;
            newRowToAdd.ProjectId = projectId;
            await _evoNaploContext.UserProjects.AddAsync(newRowToAdd);
        }

        public async Task LeaveProjectAsStudent(int studentId, int projectId)
        {
            var rowToDelete = _evoNaploContext.UserProjects.First(row => row.UserId == studentId && row.ProjectId == projectId);
            _evoNaploContext.UserProjects.Remove(rowToDelete);
        }
    }
}
