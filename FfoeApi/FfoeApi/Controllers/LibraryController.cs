using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FfoeApi.Models.InputModels;
using FfoeApi.Models.OutputModels;
using FfoeApi.Services;
using FfoeApi.Services.DapperServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace FfoeApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LibraryController : ControllerBase
    {

        protected readonly IDapperService dapperService;

        private const string StoreProcedureGetAllBooks = "[dbo].[GetAllBooks]";
        private const string StoreProcedureGetBookItems = "[dbo].[GetBookItems]";
        private const string StoreProcedureGetBorrowedBooks = "[dbo].[GetBorrowedBooks]";
        private const string StoreProcedureGetReturnedBooks = "[dbo].[GetReturnedBooks]";
        private const string StoreProcedureGetAvailableBooks = "[dbo].[GetAvailableBooks]";
        private const string StoreProcedureGetCategories = "[dbo].[GetAllCategories]";
        private const string StoreProcedureGetRequestedBooks = "[dbo].[GetRequestedBooks]";
        private const string StoreProcedureInsertBorrower = "[dbo].[InsertBorrower]";
        private const string StoreProcedureUpdateBorrower = "[dbo].[UpdateBorrower]";
        private const string StoreProcedureUpdateReturnDate = "[dbo].[UpdateReturnDate]";
        private const string StoreProcedureInsertCategory = "[dbo].[InsertCategory]";
        private const string StoreProcedureDeleteCategory = "[dbo].[DeleteCategory]";
        private const string StoreProcedureInsertBook = "[dbo].[InsertBook]";
        private const string StoreProcedureInsertBookItem = "[dbo].[InsertBookItem]";
        private const string StoreProcedureDeleteBook = "[dbo].[DeleteBook]";
        private const string StoreProcedureDeleteBookItem = "[dbo].[DeleteBookItem]";
        private const string StoreProcedureDeleteAllBookItems = "[dbo].[DeleteAllBookItems]";
        private const string StoreProcedureDeleteArchiveEntry = "[dbo].[DeleteArchiveEntry]";
        private const string StoreProcedureDeleteRequestedItem = "[dbo].[DeleteRequestedItem]";

        public LibraryController(IConfiguration config, IDapperService _dapperService)
        {
            dapperService = _dapperService;
        }

        [HttpGet]
        [Route("getAllBooks")]
        public async Task<IActionResult> GetAllBooksAsync()
        {
             IEnumerable<AllBooksModel> exequtedResult = await this.dapperService.ExecuteListAsync<AllBooksModel>(
               StoreProcedureGetAllBooks);
            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("getBookItems")]
        public async Task<IActionResult> GetBookItemsAsync(GetBookItemsInputModel inputModel)
        {
            IEnumerable<AllBooksModel> exequtedResult = await this.dapperService.ExecuteListAsync<AllBooksModel>(
              StoreProcedureGetBookItems,
              new
              {
                  @bindingId = inputModel.BindingID
              });
            return Ok(exequtedResult);
        }


        [HttpGet]
        [Route("getBorrowedBooks")]
        public async Task<IActionResult> GetBorrowedBooksAsync()
        {
            IEnumerable<BorrowedBooksModel> exequtedResult = await this.dapperService.ExecuteListAsync<BorrowedBooksModel>(
               StoreProcedureGetBorrowedBooks);
            return Ok(exequtedResult);
        }

        [HttpGet]
        [Route("getReturnedBooks")]
        public async Task<IActionResult> GetReturnedBooksAsync()
        {
            IEnumerable<BorrowedBooksModel> exequtedResult = await this.dapperService.ExecuteListAsync<BorrowedBooksModel>(
               StoreProcedureGetReturnedBooks);
            return Ok(exequtedResult); 
        }
        [HttpPost]
        [Route("getAvailableBooks")]
        public async Task<IActionResult> GetAvailableBooksAsync(UpdateReturnDateInputModel inputModel)
        {
            IEnumerable<AllBooksModel> exequtedResult = await this.dapperService.ExecuteListAsync<AllBooksModel>(
               StoreProcedureGetAvailableBooks,
               new
               {
                  @bookId = inputModel.BookId,
               });
            return Ok(exequtedResult);
        }
        [HttpGet]
        [Route("getCategories")]
        public async Task<IActionResult> GetCategoriesAsync()
        {
            IEnumerable<CategoriesModel> exequtedResult = await this.dapperService.ExecuteListAsync<CategoriesModel>(
               StoreProcedureGetCategories);
            return Ok(exequtedResult);
        }

        [HttpGet]
        [Route("getRequestedBooks")]
        public async Task<IActionResult> GetRequestedBooksAsync()
        {
            IEnumerable<BorrowedBooksModel> exequtedResult = await this.dapperService.ExecuteListAsync<BorrowedBooksModel>(
               StoreProcedureGetRequestedBooks);
            return Ok(exequtedResult);
        }


        [HttpPost]
        [Route("insertBorrower")]
        public async Task<IActionResult> InsertBorrowerAsync(InsertBorrowerInputModel inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureInsertBorrower,
               new
               {
                   @borrowerId = inputModel.BorrowerId,
                   @bookId = inputModel.BookId,
                   @borrowedFrom = inputModel.BorrowedFrom,
                   @borrowedTo = inputModel.BorrowedTo,
                   @issuerId = inputModel.IssuerId,
                   @issuerName = inputModel.IssuerName,
                   @isRequested = inputModel.IsRequested
               });

            return Ok(exequtedResult);
        }
        [HttpPost]
        [Route("updateBorrower")]
        public async Task<IActionResult> UpdateBorrowerAsync(InsertBorrowerInputModel inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureUpdateBorrower,
               new
               {
                   @borrowerId = inputModel.BorrowerId,
                   @bookId = inputModel.BookId,
                   @borrowedFrom = inputModel.BorrowedFrom,
                   @borrowedTo = inputModel.BorrowedTo,
                   @issuerId = inputModel.IssuerId,
                   @issuerName = inputModel.IssuerName,
                   @isRequested = inputModel.IsRequested
               });

            return Ok(exequtedResult);
        }
        
        [HttpPost]
        [Route("updateReturnDate")]
        public async Task<IActionResult> UpdateReturnDateAsync(UpdateReturnDateInputModel inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureUpdateReturnDate,
               new
               {
                   @borrowerId = inputModel.BorrowerId,
                   @bookId = inputModel.BookId,
                   @actualReturnDate = inputModel.ReturnDate,
                  
               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("insertCategory")]
        public async Task<IActionResult> InsertCategoryAsync(InsertCategoryInputModel inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureInsertCategory,
               new
               {
                   @categoryName = inputModel.CategoryName
               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("deleteCategory")]
        public async Task<IActionResult> DeleteCategoryAsync(DeleteCategoryInputModel inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureDeleteCategory,
               new
               {
                   @categoryId = inputModel.CategoryId
               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("insertBook")]
        public async Task<IActionResult> InsertBookAsync(InsertBookInputModel inputModel)
        {
           IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureInsertBook,
               new
               {
                   @id = inputModel.BookId,
                   @bookName = inputModel.BookTitle,
                   @categoryId = inputModel.CategoryId,
                   @language = inputModel.Language,
                   @publicationYear = inputModel.PublicationYear,
                   @librarianId = inputModel.LibrarianId
               });

            return Ok(exequtedResult);
        }


        [HttpPost]
        [Route("deleteBook")]
        public async Task<IActionResult> DeleteBookAsync(DeleteBookInputModel inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureDeleteBook,
               new
               {
                   @bookId = inputModel.BookId,
               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("insertBookItem")]
        public async Task<IActionResult> InsertBookItemAsync(InsertBookInputModel inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureInsertBookItem,
               new
               {
                   @id = inputModel.BookId,
                   @bookTitle = inputModel.BookTitle,
                   @categoryId = inputModel.CategoryId,
                   @bindingId = inputModel.BindingId,
                   @language = inputModel.Language,
                   @publicationYear = inputModel.PublicationYear,
                   @librarianId = inputModel.LibrarianId
               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("deleteBookItem")]
        public async Task<IActionResult> DeleteBookItemAsync(DeleteBookInputModel inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureDeleteBookItem,
               new
               {
                   @bookId = inputModel.BookId,
               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("deleteAllBookItems")]
        public async Task<IActionResult> DeleteAllBookItemsAsync(DeleteBookInputModel inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureDeleteAllBookItems,
               new
               {
                   @bookId = inputModel.BookId,
                   @bindingId = inputModel.BindingId,
               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("deleteArchiveEntry")]
        public async Task<IActionResult> DeleteArchiveEntryAsync(DeleteBookInputModel inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureDeleteArchiveEntry,
               new
               {
                   @rowId = inputModel.BookId
               });

            return Ok(exequtedResult);
        }

        [HttpPost]
        [Route("deleteRequestedItem")]
        public async Task<IActionResult> DeleteRequestedItemAsync(DeleteRequestedItemInputModel inputModel)
        {
            IEnumerable<MainResponseModel> exequtedResult = await this.dapperService.ExecuteListAsync<MainResponseModel>(
               StoreProcedureDeleteRequestedItem,
               new
               {
                   @bookId = inputModel.BookId,
                   @studentId = inputModel.StudentId,
               });

            return Ok(exequtedResult);
        }
    }
}
