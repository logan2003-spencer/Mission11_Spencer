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

    public IActionResult Get(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookTypes = null)
    {
        var query = _bookContext.Books.AsQueryable();

        if (bookTypes != null && bookTypes.Any())
        {
            query = query.Where(b => bookTypes.Contains(b.Category));
        }
        
        var totalNumBooks = _bookContext.Books.Count();

        // Skip records based on page number, and take the records based on page size
        var books = query
            .Skip((pageNum - 1) * pageSize)  // Skip previous pages
            .Take(pageSize)                 // Take the required number of books
            .ToList();


        var someObject = new
        {
            Books = books,
            TotalNumBooks = totalNumBooks
        };
        return Ok(someObject);
    }

    [HttpGet("GetBookTypes")]
    public IActionResult GetBookTypes()
    {
        var bookTypes = _bookContext.Books.Select(b => b.Category)
            .Distinct()
            .ToList();
        
        return Ok(bookTypes);
    }
    
    
}
