import React from 'react';

/**
 * Reusable Card component for displaying Book Details.
 * Receives the book object as a prop.
 */
const BookCard = ({ book }) => {
  const { id, name, author, price, publisher } = book;

  return (
    <div className="card book-card">
      <div className="card-header">
        <span className="card-badge">Book #{id}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-meta">By <strong>{author}</strong></p>
        <div className="card-details">
          <span className="card-price">${price}</span>
          <span className="card-publisher">Published by: {publisher}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
