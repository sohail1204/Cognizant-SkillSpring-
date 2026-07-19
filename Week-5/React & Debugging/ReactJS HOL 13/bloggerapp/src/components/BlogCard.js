import React from 'react';

/**
 * Reusable Card component for displaying Blog Details.
 * Receives the blog object as a prop.
 */
const BlogCard = ({ blog }) => {
  const { id, title, author, category, publishedDate } = blog;

  return (
    <div className="card blog-card">
      <div className="card-header">
        <span className="card-badge">Blog #{id}</span>
        <span className="card-category">{category}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-meta">Written by <strong>{author}</strong></p>
        <div className="card-details">
          <span className="card-date">Published: {publishedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
