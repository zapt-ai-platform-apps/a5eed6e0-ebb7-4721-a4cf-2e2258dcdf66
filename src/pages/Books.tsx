import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/browser';

interface Book {
  id: number;
  title: string;
  author: string;
}

function Books(): JSX.Element {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("Fetching books from API...");
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (err: unknown) {
        console.error(err);
        Sentry.captureException(err);
        setError("Error fetching books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-full p-4">
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id} className="mb-2">
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;