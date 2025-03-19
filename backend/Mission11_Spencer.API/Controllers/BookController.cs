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

    public IEnumerable<Book> Get()
    {
        return _bookContext.Books.ToList();
    }
    
    
}
