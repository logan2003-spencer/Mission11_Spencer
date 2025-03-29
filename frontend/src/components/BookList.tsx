import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sorted, setSorted] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const categoryParams = selectedCategories
      .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      .join("&");

    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5010/api/Book?pageSize=${pageSize}&pageNum=${pageNum}${
          selectedCategories.length ? `&${categoryParams}` : ""
        }`
      );

      if (!response.ok) {
        console.error("Failed to fetch books:", response.statusText);
        return;
      }
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

  const handleSort = () => {
    const sortedBooks = [...books].sort((a, b) => (a.title < b.title ? -1 : 1));
    setBooks(sortedBooks);
    setSorted(true);
  };

  return (
    <>
      {/* Parallax Section */}
      <div
        style={{
          background: "url('https://source.unsplash.com/random/1920x1080') no-repeat center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          color: "white",
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <h1>Explore Our Books</h1>
      </div>

      {/* Book List */}
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
            <button
              className="btn btn-success"
              onClick={() => navigate(`/donate/${b.title}/${b.bookID}`)}
            >
              Donate
            </button>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button key={index + 1} onClick={() => setPageNum(index + 1)} disabled={pageNum === index + 1}>
          {index + 1}
        </button>
      ))}
      <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

      {/* Page Size Selector */}
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>

      <button onClick={handleSort}>Sort by Project Name</button>
    </>
  );
}

export default BookList;
