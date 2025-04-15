import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagenation from "./Pagenation";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sorted, setSorted] = useState<boolean>(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p className="text-red-500">Error {error}</p>;

  const handleSort = () => {
    if (sorted) return; // Prevent re-sorting if already sorted


    const sortedBooks = [...books].sort((a, b) => (a.title < b.title ? -1 : 1));
    setBooks(sortedBooks);
    setSorted(true);
  };

  return (
    <>
      <div
        // style={{
        //   background:
        //     "url('https://source.unsplash.com/random/1920x1080') no-repeat center",
        //   backgroundSize: "cover",
        //   backgroundAttachment: "fixed",
        //   color: "white",
        //   textAlign: "center",
        //   padding: "80px 20px",
        // }}
      >
        <h1>Explore Our Books</h1>
      </div>

      {/* Book List */}
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Number of Pages:</strong> {b.pageCount} Pages
              </li>
              <li>
                <strong>Price:</strong> ${b.price}
              </li>
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
      <Pagenation
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />

      {/* Pagination Controls */}

      <button onClick={handleSort}>Sort by Project Name</button>
    </>
  );
}

export default BookList;