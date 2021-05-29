using System.Collections.Generic;
using System.Threading.Tasks;
using EvoNaploTFS.Models;
using EvoNaploTFS.Models.DTO;
using EvoNaploTFS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EvoNaploTFS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService _projectService;

        public ProjectController(ProjectService ProjectService)
        {
            _projectService = ProjectService;
        }

        [HttpGet("Projects")]
        public IEnumerable<ProjectDTO> GetProjects()
        {
            return _projectService.GetProjects();
        }
        [HttpGet("GetProjectById")]
        public ProjectDTO GetProjectById(int id)
        {
            return _projectService.GetProjectById(id);
        }

        [HttpGet("GetProjectToEditById")]
        public Project GetProjectToEditById(int id)
        {
            return _projectService.GetProjectToEditById(id);
        }
        //PUT
        [HttpPut("EditProject")]
        public async Task<int> EditProject([FromBody] Project project)
        {
            await _projectService.EditProject(project);
            return StatusCodes.Status200OK;
        }

        [HttpDelete("DELETE")]
        public async Task<int> DeleteProject(int id)
        {
            await _projectService.DeleteProject(id);
            return StatusCodes.Status200OK;
        }

    }
}