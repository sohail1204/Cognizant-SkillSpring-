import React from 'react';
import BlogCard from './BlogCard';

/**
 * Component to manage and list Blog Details.
 * Maintains state/array of 5 blogs and renders using map().
 */
const BlogDetails = () => {
  const blogs = [
    {
      id: 201,
      title: 'Mastering React 18 Concurrent Features',
      author: 'Dan Abramov',
      category: 'ReactJS',
      publishedDate: '2026-05-15'
    },
    {
      id: 202,
      title: 'A Guide to CSS Grid and Flexbox layouts',
      author: 'Rachel Andrew',
      category: 'CSS/Design',
      publishedDate: '2026-06-01'
    },
    {
      id: 203,
      title: 'Why TypeScript is Essential for Large Codebases',
      author: 'Anders Hejlsberg',
      category: 'TypeScript',
      publishedDate: '2026-06-10'
    },
    {
      id: 204,
      title: 'Understanding ES6 Generator Functions',
      author: 'Kyle Simpson',
      category: 'JavaScript',
      publishedDate: '2026-06-20'
    },
    {
      id: 205,
      title: 'Optimizing LCP for Core Web Vitals',
      author: 'Addy Osmani',
      category: 'Web Performance',
      publishedDate: '2026-06-28'
    }
  ];

  return (
    <div className="details-container">
      <h2 className="section-title">Blog Articles</h2>
      <div className="grid-layout">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
