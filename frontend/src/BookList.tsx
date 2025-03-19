import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {
  // state being set
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("https://localhost:5010/api/Book");
      const data = await response.json();
      setBooks(data);
    };

    fetchProjects();
  }, []);

  return (
    <>
      <h1>Professor Hilton's splendid Books</h1>
      <br />

      {books.map((b) => (
        <div id="bookCard">
          <h3>{b.title}</h3>

          <ul>
            <li>Author: {b.author}</li>
            <li>Publisher: {b.publisher}</li>
            <li>Classification: {b.classification}</li>
            <li>Category: {b.category}</li>
            <li>Number of Pages: {b.pageCount} Pages</li>
            <li>Price: ${b.price}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
