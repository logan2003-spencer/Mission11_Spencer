import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL = 'https://mission13-spencer.azurewebsites.net/api'

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      .join("&");

    const response = await fetch(
      `${API_URL}?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();
    return data as FetchBooksResponse;  // Ensure we return the correct type

  } catch (error) {
    console.error('Error fetching books', error);
    throw error;  // Rethrow error to be handled by the caller
  }
};

export const addBook = async (newBook: Book) : Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error(`Failed to add book: ${response.statusText}`);
    }

    const addedBook = await response.json();  // Assuming the API returns the added book
    return addedBook;

  } catch (error) {
    console.error('Error adding book:', error);
    throw error;  // Rethrow the error so the calling function can handle it
  }
};


export const updateBook = async(bookID: number, updatedBook: Book) : Promise<Book> =>{
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating book: ', error);
    throw error;
  }
}


export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID} `,
      {
        method: 'DELETE'
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete book')
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
}

