using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EvoNaploTFS.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string ProjectName { get; set; }
        public string Description { get; set; }
        public string SourceLink { get; set; }
        public string Technologies { get; set; }
        [ForeignKey("SemesterId")]
        public int SemesterId { get; set; }
    }
}
