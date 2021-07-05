using System.Collections.Generic;

namespace EvoNaploTFS.Models.DTO
{
    public class ProjectStudentsDTO
    {
        public List<ProjectStudent> projectStudents { get; set; } = new List<ProjectStudent>();
        public List<ColumnProject> columnProjects { get; set; } = new List<ColumnProject>();
        public List<string> columnOrder { get; set; } = new List<string>();
    }

    public class ProjectStudent
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public ProjectStudent(User user)
        {
            Id = user.Id.ToString();
            Name = $"{user.FirstName} {user.LastName}";
        }
    }

    public class ColumnProject
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public List<string> ProjectStudentIds { get; set; } = new List<string>();

        public ColumnProject(Project project)
        {
            Id = project.Id.ToString();
            Title = project.ProjectName;
        }
    }
}
