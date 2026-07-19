import React from 'react';
import BookCard from './BookCard';

/**
 * Component to manage and list Book Details.
 * Maintains state/array of 5 books and renders using map().
 */
const BookDetails = () => {
  const books = [
    {
      id: 101,
      name: 'Eloquent JavaScript',
      author: 'Marijn Haverbeke',
      price: 29.99,
      publisher: 'No Starch Press'
    },
    {
      id: 102,
      name: 'You Don\'t Know JS Yet',
      author: 'Kyle Simpson',
      price: 24.95,
      publisher: 'O\'Reilly Media'
    },
    {
      id: 103,
      name: 'Clean Code',
      author: 'Robert C. Martin',
      price: 37.50,
      publisher: 'Prentice Hall'
    },
    {
      id: 104,
      name: 'JavaScript - The Good Parts',
      author: 'Douglas Crockford',
      price: 22.00,
      publisher: 'O\'Reilly Media'
    },
    {
      id: 105,
      name: 'Learning React',
      author: 'Alex Banks & Eve Porcello',
      price: 32.99,
      publisher: 'O\'Reilly Media'
    }
  ];

  return (
    <div className="details-container">
      <h2 className="section-title">Book Collection</h2>
      <div className="grid-layout">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
