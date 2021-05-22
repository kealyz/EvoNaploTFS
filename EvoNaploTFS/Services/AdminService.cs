using EvoNaplo.DataAccessLayer;
using EvoNaploTFS.Models;
using EvoNaploTFS.Models.DTO;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvoNaploTFS.Services
{
    public class AdminService
    {
        private readonly EvoNaploContext _evoNaploContext;
        private readonly ILogger<AdminService> _logger;

        public AdminService(ILogger<AdminService> logger, EvoNaploContext EvoNaploContext)
        {
            _logger = logger;
            _evoNaploContext = EvoNaploContext;
        }

        public async Task<IEnumerable<User>> AddAdmin(User user)
        {
            _logger.LogInformation($"Admin hozzáadása következik: {user}");
            user.Role = User.RoleTypes.Admin;
            await _evoNaploContext.Users.AddAsync(user);

            _evoNaploContext.SaveChanges();
            _logger.LogInformation($"Admin hozzáadva.");
            var admins = _evoNaploContext.Users.Where(m => m.Role == User.RoleTypes.Admin);
            return admins.ToList();
        }

        public IEnumerable<UserDTO> ListActiveAdmins()
        {
            var admins = _evoNaploContext.Users.Where(m => m.Role == User.RoleTypes.Admin && m.IsActive == true);
            List<UserDTO> result = new List<UserDTO>();
            foreach (var admin in admins)
            {
                result.Add(new UserDTO(admin));
            }
            return result;

        }

    }
}