using EvoNaplo.DataAccessLayer;
using EvoNaploTFS.Models;
using EvoNaploTFS.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvoNaplo.Services
{
    public class SemesterService
    {
        private readonly EvoNaploContext _evoNaploContext;

        public SemesterService(EvoNaploContext EvoNaploContext)
        {
            _evoNaploContext = EvoNaploContext;
        }
        //public async Task<IEnumerable<Semester>> PostAddSemester(SemesterDTO semesterDTO)
        //{

        //    await _evoNaploContext.Semesters.AddAsync(new Semester(semesterDto.StartDate, semesterDto.EndDate, semesterDto.DemoDate));
        //    _evoNaploContext.SaveChanges();
        //    return _evoNaploContext.Semesters.ToList();
        //}
        public IEnumerable<SemesterDTO> GetSemesters()
        {
            var semesters = _evoNaploContext.Semesters;
            List<SemesterDTO> result = new List<SemesterDTO>();
            foreach(var semester in semesters)
            {
                result.Add(new SemesterDTO(semester));
            }
            return result;
        }
        public SemesterDTO GetSemesterById(int id)
        {
            var semester = _evoNaploContext.Semesters.FirstOrDefault(u => u.Id == id);
            if (semester != null)
            {
                return new SemesterDTO(semester);
            }
            else
            {
                return new SemesterDTO();
            }
        }
        public Semester GetSemesterToEditById(int id)
        {
            var semester = _evoNaploContext.Semesters.FirstOrDefault(u => u.Id == id);
            if (semester != null)
            {
                return new Semester(semester);
            }
            else
            {
                return new Semester();
            }
        }
        public async Task<IEnumerable<Semester>> EditSemester(Semester semester)
        {
            var SemesterToEdit = await _evoNaploContext.Semesters.FindAsync(semester.Id);
            SemesterToEdit.StartDate = semester.StartDate;
            SemesterToEdit.EndDate = semester.EndDate;
            _evoNaploContext.SaveChanges();
            return _evoNaploContext.Semesters.ToList();
        }

        //public async Task<IEnumerable<Semester>> PutEditSemester(int id, SemesterDto semesterDto)
        //{
        //    _logger.LogInformation($"{id} ID-vel rendelkező szemeszter keresése");
        //    var semesterToEdit = await _evoNaploContext.Semesters.FindAsync(id);
        //    _logger.LogInformation($"{id} ID-vel rendelkező szemeszter módosítása indul {semesterDto} adatokra");
        //    semesterToEdit.StartDate = semesterDto.StartDate;
        //    semesterToEdit.EndDate = semesterDto.EndDate;
        //    semesterToEdit.DemoDate = semesterDto.DemoDate;
        //    _evoNaploContext.SaveChanges();
        //    _logger.LogInformation($"{id} ID-vel rendelkező szemeszter módosítása kész");
        //    return _evoNaploContext.Semesters.ToList();
        //}
        public async Task<IEnumerable<Semester>> DeleteSemester(int id)
        {
            var semesterToDelete = await _evoNaploContext.Semesters.FindAsync(id);
            _evoNaploContext.Remove(semesterToDelete);
            _evoNaploContext.SaveChanges();
            return _evoNaploContext.Semesters.ToList();
        }
    }
}
