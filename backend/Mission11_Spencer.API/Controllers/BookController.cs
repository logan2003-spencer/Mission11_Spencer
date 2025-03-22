using Microsoft.AspNetCore.Mvc;
using Mission11_Spencer.API.Data;

namespace Mission11_Spencer.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookController : Controller
{
    private BookContext _bookContext;
    
    public BookController(BookContext temp)
    {
        _bookContext = temp;
    }

    public IActionResult Get(int pageSize = 5, int pageNum = 1)
    {
        // Skip records based on page number, and take the records based on page size
        var books = _bookContext.Books
            .Skip((pageNum - 1) * pageSize)  // Skip previous pages
            .Take(pageSize)                 // Take the required number of books
            .ToList();

        var totalNumBooks = _bookContext.Books.Count();

        var someObject = new
        {
            Books = books,
            TotalNumBooks = totalNumBooks
        };
        return Ok(someObject);
    }

    
    
}
