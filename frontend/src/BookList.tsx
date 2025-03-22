import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {
  // state being set
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sorted, setSorted] = useState<boolean>(false); 


  // Fetch books based on pageSize and pageNum
  useEffect(() => {
    const fetchBooks = async () => {
      // API request for fetching books with pagination
      const response = await fetch(
        `https://localhost:5010/api/Book?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();

      // Update the state with fetched data
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);

      // Calculate the total number of pages based on total items and page size
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum]); // dependencies are pageSize and pageNum

  const handleSort = () => {
    const sortedBooks = [...books].sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    setBooks(sortedBooks);
    setSorted(true); // Update the sorted state
  };

  return (
    <>
      <h1>Professor Hilton's splendid Books</h1>
      <br />
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li><strong>Author:</strong> {b.author}</li>
              <li><strong>Publisher:</strong> {b.publisher}</li>
              <li><strong>Classification:</strong> {b.classification}</li>
              <li><strong>Category:</strong> {b.category}</li>
              <li><strong>Number of Pages:</strong> {b.pageCount} Pages</li>
              <li><strong>Price:</strong> ${b.price}</li>
            </ul>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>
      {
        [...Array(totalPages)].map((_, index) => (
          <button key={index + 1} onClick={() => setPageNum(index + 1)} disabled={pageNum === (index + 1)}>
            {index + 1}
          </button>
        ))
      }
      <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

      <br />
      <br />
      <label>
        Results per page:
        <select 
          value={pageSize} 
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1); // Reset to the first page when page size changes
          }}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
        </select>
      </label>
      <br />
      <br />
      <button onClick={handleSort}>Sort by Project Name</button>

    </>
  );
}

export default BookList;
