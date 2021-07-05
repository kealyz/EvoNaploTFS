using EvoNaploTFS.Models.DTO;
using EvoNaploTFS.Services;
using Microsoft.AspNetCore.Mvc;

namespace EvoNaploTFS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectStudentController : ControllerBase
    {
        private readonly ProjectStudentService _projectStudentService;

        public ProjectStudentController(ProjectStudentService ProjectStudentService)
        {
            _projectStudentService = ProjectStudentService;
        }

        [HttpGet("ProjectsStudents")]
        public ProjectStudentsDTO GetProjects()
        {
            return _projectStudentService.GetProjectStudents();
        }
    }
}
