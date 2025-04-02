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

    // Explicitly define the [HttpGet] attribute for pagination and filtering by book types
    [HttpGet]
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

    // Explicitly define the [HttpGet] attribute for getting book types
    [HttpGet("GetBookTypes")]
    public IActionResult GetBookTypes()
    {
        var bookTypes = _bookContext.Books.Select(b => b.Category)
            .Distinct()
            .ToList();
        
        return Ok(bookTypes);
    }

    // Explicitly define the [HttpPost] attribute for adding a new book
    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book newBook)
    {
        if (newBook == null)
        {
            return BadRequest("Invalid book data.");
        }

        // Log the book data to see what is being received
        Console.WriteLine($"Received book: {newBook.Title}, {newBook.Author}, {newBook.Publisher}");

        _bookContext.Books.Add(newBook);
        _bookContext.SaveChanges();

        return Ok(newBook);
    }


    // Explicitly define the [HttpPut] attribute for updating an existing book
    [HttpPut("UpdateBook/{bookID}")]
    public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
    {
        var existingBook = _bookContext.Books.Find(bookID);
        if (existingBook == null)
        {
            return NotFound(new { message = "Book not found" });
        }

        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.ISBN = updatedBook.ISBN;
        existingBook.Classification = updatedBook.Classification;
        existingBook.Category = updatedBook.Category;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;

        _bookContext.Books.Update(existingBook);
        _bookContext.SaveChanges();

        return Ok(existingBook);
    }

    // Explicitly define the [HttpDelete] attribute for deleting a book
    [HttpDelete("DeleteBook/{bookID}")]
    public IActionResult DeleteBook(int bookID)
    {
        var book = _bookContext.Books.Find(bookID);

        if(book == null)
        {
            return NotFound(new {message = "Book not found"});
        }

        _bookContext.Books.Remove(book);
        _bookContext.SaveChanges();

        return NoContent();
    }
}
