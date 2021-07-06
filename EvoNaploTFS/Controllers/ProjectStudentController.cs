using EvoNaploTFS.Models.DTO;
using EvoNaploTFS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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

        [HttpPut("ProjectsStudentsChanged")]
        public async Task<int> EditStudentOnProjects([FromBody] StudentToProjectDTO studentToProjectDTO)
        {
            if(_projectStudentService.ManageStudentOnProject(studentToProjectDTO))
            {
                return StatusCodes.Status200OK;
            }
            return StatusCodes.Status401Unauthorized;
        }
    }
}
