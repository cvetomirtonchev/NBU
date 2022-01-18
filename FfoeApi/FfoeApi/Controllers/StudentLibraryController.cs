
using FfoeApi.Models.InputModels;
using FfoeApi.Models.OutputModels;
using FfoeApi.Services;
using FfoeApi.Services.DapperServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FfoeApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentLibraryController : ControllerBase
    {
        protected readonly IDapperService dapperService;

        private const string StoreProcedureGetAvailableBooksForStudent = "[dbo].[GetAvailableBooksForStudent]";
        private const string StoreProcedureReserveBook = "[dbo].[GetAvailableBooksForStudent]";
        private const string StoreProcedureGetStudentTakenBooks = "[dbo].[GetStudentTakenBooks]";
        private const string StoreProcedureGetStudentRequestedBooks = "[dbo].[GetStudentRequestedBooks]";
        private const string StoreProcedureGetStudentReturnedBooks = "[dbo].[GetStudentReturnedBooks]";


        public StudentLibraryController(IConfiguration config, IDapperService _dapperService)
        {
            dapperService = _dapperService;
        }

        [HttpGet]
        [Route("getAvailableBooksForStudent")]
        public async Task<IActionResult> getAvailableBooksForStudentAsync()
        {
            IEnumerable<GetAvailableStudentBooksOutputModel> exequtedResult = await this.dapperService.ExecuteListAsync<GetAvailableStudentBooksOutputModel>(
               StoreProcedureGetAvailableBooksForStudent);

            List<GetAvailableStudentBooksOutputModel> list = new List<GetAvailableStudentBooksOutputModel>();

            foreach (GetAvailableStudentBooksOutputModel book in exequtedResult)
            {
                var isExist = list.Find(x => x.BindingId == book.BindingId);

                if(isExist == null)
                {
                    list.Add(book);
                }
            }

            return Ok(list);
        }

        [HttpPost]
        [Route("reserveBook")]
        public async Task<IActionResult> UpdateReturnDateAsync(UpdateReturnDateInputModel inputModel)
        {
            int exequtedResult = await this.dapperService.ExecuteFirstAsync<int>(
               StoreProcedureReserveBook,
               new
               {
                   @borrowerId = inputModel.BorrowerId,
                   @bookId = inputModel.BookId,
                   @actualReturnDate = inputModel.ReturnDate,

               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("getStudentTakenBooks")]
        public async Task<IActionResult> getStudentTakenBooks(StudentsModel model)
        {

            IEnumerable<BorrowedBooksModel> exequtedResult = await this.dapperService.ExecuteListAsync<BorrowedBooksModel>(
               StoreProcedureGetStudentTakenBooks,
               new
               {
                   @studentId = model.Id
               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("getStudentRequestedBooks")]
        public async Task<IActionResult> getStudentRequestedBooks(StudentsModel model)
        {

            IEnumerable<BorrowedBooksModel> exequtedResult = await this.dapperService.ExecuteListAsync<BorrowedBooksModel>(
               StoreProcedureGetStudentRequestedBooks,
               new
               {
                   @studentId = model.Id
               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("getStudentReturnedBooks")]
        public async Task<IActionResult> getStudentArchiveBorrows(StudentsModel model)
        {

            IEnumerable<BorrowedBooksModel> exequtedResult = await this.dapperService.ExecuteListAsync<BorrowedBooksModel>(
               StoreProcedureGetStudentReturnedBooks,
               new
               {
                   @studentId = model.Id
               });

            return Ok(exequtedResult);
        }
    }
}
