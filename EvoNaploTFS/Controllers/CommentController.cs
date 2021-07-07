﻿using EvoNaploTFS.Models.DTO;
using EvoNaploTFS.Models.TableConnectors;
using EvoNaploTFS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EvoNaploTFS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly CommentService _commentService;

        public CommentController(CommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost("StudentComment")]
        public async Task<int> StudentComment([FromBody] StudentComment studentComment)
        {
            await _commentService.AddStudentComment(studentComment);
            return StatusCodes.Status200OK;
        }

        [HttpPost("ProjectComment")]
        public async Task<int> ProjectComment([FromBody] ProjectComment projectComment)
        {
            await _commentService.AddProjectComment(projectComment);
            return StatusCodes.Status200OK;
        }

        [HttpPost("EditStudentComment")]
        public async Task<int> EditStudentComment([FromBody] CommentDTO studentComment)
        {
            await _commentService.EditStudentComment(studentComment);
            return StatusCodes.Status200OK;
        }

        [HttpPost("EditProjectComment")]
        public async Task<int> EditProjectComment([FromBody] CommentDTO projectComment)
        {
            await _commentService.EditProjectComment(projectComment);
            return StatusCodes.Status200OK;
        }
    }
}
