using EvoNaplo.DataAccessLayer;
using EvoNaploTFS.Models;
using EvoNaploTFS.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace EvoNaploTFS.Services
{
    public class ProjectService
    {
        private readonly EvoNaploContext _evoNaploContext;

        public ProjectService(EvoNaploContext EvoNaploContext)
        {
            _evoNaploContext = EvoNaploContext;
        }

        public IEnumerable<ProjectDTO> GetProjects()
        {
            var projects = _evoNaploContext.Projects;
            List<ProjectDTO> result = new List<ProjectDTO>();
            foreach (var project in projects)
            {
                result.Add(new ProjectDTO(project));
            }
            return result;
        }

        internal IEnumerable<ProjectDTO> GetProjectsOfCurrentSemseter()
        {
            var semesterList = _evoNaploContext.Semesters.ToList();
            var currentSemester = semesterList.OrderByDescending(semester => semester.Id).First();
            var currentSemesterId = currentSemester.Id;
            var projects = _evoNaploContext.Projects.ToList();
            List<ProjectDTO> result = new List<ProjectDTO>();
            foreach (var project in projects)
            {
                result.Add(new ProjectDTO(project));
            }
            return result.Where(project => project.SemesterId == currentSemesterId);
        }

        public ProjectDTO GetProjectById(int id)
        {
            var project = _evoNaploContext.Projects.FirstOrDefault(u => u.Id == id);
            if (project != null)
            {
                return new ProjectDTO(project);
            }
            else
            {
                return new ProjectDTO();
            }
        }
        public Project GetProjectToEditById(int id)
        {
            var project = _evoNaploContext.Projects.FirstOrDefault(u => u.Id == id);
            if (project != null)
            {
                return new Project(project);
            }
            else
            {
                return new Project();
            }
        }
        public async Task<IEnumerable<Project>> EditProject(Project project)
        {
            var ProjectToEdit = await _evoNaploContext.Projects.FindAsync(project.Id);
            ProjectToEdit.ProjectName = project.ProjectName;
            ProjectToEdit.Description = project.Description;
            ProjectToEdit.SourceLink = project.SourceLink;
            ProjectToEdit.Technologies = project.Technologies;
            _evoNaploContext.SaveChanges();
            return _evoNaploContext.Projects.ToList();
        }
        public async Task<IEnumerable<Project>> DeleteProject(int id)
        {
            var projectToDelete = await _evoNaploContext.Projects.FindAsync(id);
            _evoNaploContext.Remove(projectToDelete);
            _evoNaploContext.SaveChanges();
            return _evoNaploContext.Projects.ToList();
        }
    }
}
