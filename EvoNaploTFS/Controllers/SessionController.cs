//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using EvoNaplo.Models.DTO;
//using EvoNaplo.Services;
//using Microsoft.AspNetCore.Mvc;



//namespace EvoNaplo.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class SessionController : Controller
//    {


//        private LoginService _loginService;

//        public SessionController(LoginService loginService)
//        {
//            _loginService = loginService;
//        }



//        POST api/<controller>
//        [HttpPost]
//        public void PostLogIN([FromBody] LoginDTO loginDTO)
//        {
//            _loginService.LogInUser(loginDTO);

//            redirect ?
//        }


//        Get api/<controller>
//        [HttpGet]
//        public void GetLogOut()
//        {
//            _loginService.LogOutUser();

//            redirect ?
//        }

//    }
//}
