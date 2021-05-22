//using EvoNaplo.DataAccessLayer;
//using EvoNaplo.Models.DTO;
//using Microsoft.Extensions.Logging;
//using System;
//using System.Linq;


//namespace EvoNaplo.Services
//{
//    public class LoginService
//    {
//        private readonly EvoNaploContext _evoNaploContext;
//        private readonly ILogger<LoginService> _logger;
//        private readonly PasswordService _passwordService; 

//        public LoginService(ILogger<LoginService> logger, EvoNaploContext EvoNaploContext,PasswordService passwordService)
//        {
//            _logger = logger;
//            _evoNaploContext = EvoNaploContext;
//            _passwordService = passwordService;
//        }

//        /// <summary>
//        /// This method tries to log in a user.
//        /// </summary>
//        /// <param name="email">email imput from the user</param>
//        /// <param name="password">password input from the user</param>
//        public void LogInUser(LoginDTO loginDTO)
//        {
//            _logger.LogInformation("Login starting");

//            //Fetch the stored password
//            string savedPasswordHash = _evoNaploContext.Users.FirstOrDefault(u => u.Email == loginDTO.Email).Password;

//            if(_passwordService.VerifyPassword(loginDTO.Password,savedPasswordHash))
//            {
//                //unlimited power
//                //Console.BackgroundColor = System.ConsoleColor.Cyan;

//                //this will have to be done on the frontend as soon as the frontend is implemented
//                Console.WriteLine($"you are now logged in as {_evoNaploContext.Users.FirstOrDefault(u => u.Email == loginDTO.Email).Name}");

//                //TODO cookie things i have to ask smart people about
//                _logger.LogInformation("Login success");

//            }
//            else
//            {
                
//                Console.WriteLine("Login failed, please try again");

//                _logger.LogInformation("Login Failure");
//            }
//        }

//        /// <summary>
//        /// This method logs out the current user
//        /// </summary>
//        public void LogOutUser(/*current user stored maybe in the cookies */)
//        {
//            // current user=null ???

//            _logger.LogInformation("user logged out");
//        }
//    }
//}
