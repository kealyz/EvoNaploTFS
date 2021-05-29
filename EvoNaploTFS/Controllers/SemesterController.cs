using System.Collections.Generic;
using System.Threading.Tasks;
using EvoNaplo.Services;
using EvoNaploTFS.Models;
using EvoNaploTFS.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EvoNaplo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SemesterController : ControllerBase
    {
        private readonly SemesterService _semesterService;

        public SemesterController(SemesterService SemesterService)
        {
            _semesterService = SemesterService;
        }

        // Add
        // POST /api/Semester Postman body részébe az adatok
        //[HttpPost]
        //public async Task<int> /*IEnumerable<Semester>*/ PostAddSemester(SemesterDto semesterDto)
        //{
        //    await _semesterService.PostAddSemester(semesterDto);
        //    return StatusCodes.Status200OK;
        //}

        // List
        // GET /api/Semester
        [HttpGet("Semesters")]
        public IEnumerable<SemesterDTO> GetSemesters()
        {
            return _semesterService.GetSemesters();
        }

        [HttpGet("GetSemesterById")]
        public SemesterDTO GetSemesterById(int id)
        {
            return _semesterService.GetSemesterById(id);
        }

        [HttpGet("GetSemesterToEditById")]
        public Semester GetSemesterToEditById(int id)
        {
            return _semesterService.GetSemesterToEditById(id);
        }

        //PUT
        [HttpPut("EditSemester")]
        public async Task<int> EditSemester([FromBody] Semester semester)
        {
            await _semesterService.EditSemester(semester);
            return StatusCodes.Status200OK;
        }

        //Delete (is-active falsera)
        // PUT /api/Semester Postman param részébe az adatok
        [HttpDelete("DELETE")]
        public async Task<int> DeleteSemester(int id)
        {
            await _semesterService.DeleteSemester(id);
            return StatusCodes.Status200OK;
        }

        ////Edit
        //// PUT /api/Semester/edit Postman params és body részébe az adatok
        //[HttpPut("edit")]
        //public async Task<int> PutEditSemester(int id, SemesterDto semesterDto)
        //{
        //    await _semesterService.PutEditSemester(id, semesterDto);
        //    return StatusCodes.Status200OK;
        //}
    }
}