export interface Book {
  isbn: string | number | readonly string[] | undefined;
  bookID: number;
  title: string;
  author: string;
  publisher: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}