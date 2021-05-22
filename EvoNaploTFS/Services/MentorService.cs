﻿using EvoNaplo.DataAccessLayer;
using EvoNaploTFS.Models;
using EvoNaploTFS.Models.DTO;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvoNaploTFS.Services
{
    public class MentorService
    {
        private readonly EvoNaploContext _evoNaploContext;
        private readonly ILogger<MentorService> _logger;

        public MentorService(ILogger<MentorService> logger, EvoNaploContext EvoNaploContext)
        {
            _logger = logger;
            _evoNaploContext = EvoNaploContext;
        }

        public async Task<IEnumerable<User>> AddMentor(User user)
        {
            _logger.LogInformation($"Mentor hozzáadása következik: {user}");
            user.Role = User.RoleTypes.Mentor;
            await _evoNaploContext.Users.AddAsync(user);

            _evoNaploContext.SaveChanges();
            _logger.LogInformation($"Mentor hozzáadva.");
            var mentors = _evoNaploContext.Users.Where(m => m.Role == User.RoleTypes.Mentor);
            return mentors.ToList();
        }

        public IEnumerable<UserDTO> ListActiveMentors()
        {
            var mentors = _evoNaploContext.Users.Where(m => m.Role == User.RoleTypes.Mentor && m.IsActive == true);
            List<UserDTO> result = new List<UserDTO>();
            foreach (var mentor in mentors)
            {
                result.Add(new UserDTO(mentor));
            }
            return result;
        }
    }
}
