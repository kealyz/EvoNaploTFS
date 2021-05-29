using EvoNaplo.DataAccessLayer;
using EvoNaploTFS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace EvoNaploTFS.Services
{
    public class ProjectService
    {
        private readonly EvoNaploContext _evoNaploContext;

        public ProjectService(EvoNaploContext EvoNaploContext)
        {
            _evoNaploContext = EvoNaploContext;
        }

        public IEnumerable<Project> ListProjects()
        {
            var projects = _evoNaploContext.Projects;
            return projects.ToList();

        }

    }
}
