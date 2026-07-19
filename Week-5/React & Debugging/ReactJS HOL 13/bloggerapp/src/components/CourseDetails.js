import React from 'react';
import CourseCard from './CourseCard';

/**
 * Component to manage and list Course Details.
 * Maintains state/array of 5 courses and renders using map().
 */
const CourseDetails = () => {
  const courses = [
    {
      id: 301,
      name: 'Full-Stack ReactJS Development',
      trainer: 'John Doe',
      duration: '8 Weeks',
      fee: 299.99
    },
    {
      id: 302,
      name: 'Modern CSS Masterclass',
      trainer: 'Sarah Smith',
      duration: '4 Weeks',
      fee: 149.50
    },
    {
      id: 303,
      name: 'Next.js 14 Production Patterns',
      trainer: 'Michael Chang',
      duration: '6 Weeks',
      fee: 249.00
    },
    {
      id: 304,
      name: 'Advanced JavaScript (ES6+)',
      trainer: 'David Johnson',
      duration: '5 Weeks',
      fee: 199.00
    },
    {
      id: 305,
      name: 'TypeScript & Application Architecture',
      trainer: 'Emily White',
      duration: '6 Weeks',
      fee: 229.99
    }
  ];

  return (
    <div className="details-container">
      <h2 className="section-title">Training Courses</h2>
      <div className="grid-layout">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
