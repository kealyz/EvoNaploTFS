using EvoNaplo.Services;
using EvoNaploTFS.Helpers;
using EvoNaploTFS.Models;
using EvoNaploTFS.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvoNaploTFS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly LoginService loginService;
        private readonly JwtService jwtService;

        public AuthController(LoginService service, JwtService jwt)
        {
            loginService = service;
            jwtService = jwt;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginDTO loginDTO)
        {
            User user = loginService.LogInUser(loginDTO);
            if (user == null)
            {
                return BadRequest(new { message = "No such user" });
            }

            if (BCrypt.Net.BCrypt.Verify(loginDTO.password, user.Password))
            {
                var jwt = jwtService.GenerateToken(user.Id);
                return Ok(new
                {
                    jwt
                });
            }
            else
            {
                return BadRequest(new { message = "Bad password" });
            }
        }

        [HttpGet]
        public IActionResult Getting()
        {
            return Ok(new { message = "Muxik" });
        }
    }
}
