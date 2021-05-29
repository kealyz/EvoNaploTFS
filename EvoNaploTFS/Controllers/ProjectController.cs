using System.Collections.Generic;
using System.Threading.Tasks;
using EvoNaplo.Services;
using EvoNaploTFS.Models;
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
        public IEnumerable<Project> GetProject()
        {
            return _projectService.ListProjects();
        }

    }
}