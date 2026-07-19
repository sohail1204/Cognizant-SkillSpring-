import React, { useState } from 'react';
import BookDetails from './components/BookDetails';
import BlogDetails from './components/BlogDetails';
import CourseDetails from './components/CourseDetails';
import './App.css';

// Method 5: Returning null helper component
// If 'show' prop is false, this component returns null, preventing itself from rendering in the DOM.
const FooterDetails = ({ show }) => {
  if (!show) {
    return null; // Returning null
  }
  return (
    <footer className="app-footer animate-fade-in">
      <div className="footer-content">
        <p>© 2026 Blogger App. Created for ReactJS Hands-On 13 (Conditional Rendering, Lists & Keys).</p>
        <span className="footer-badge">React 18+ Functional Architecture</span>
      </div>
    </footer>
  );
};

function App() {
  // State variables to control the visibility of each component/section
  const [showBooks, setShowBooks] = useState(true);
  const [showBlogs, setShowBlogs] = useState(true);
  const [showCourses, setShowCourses] = useState(true);
  const [systemStatus, setSystemStatus] = useState('active'); // active or maintenance
  const [showFooter, setShowFooter] = useState(true);

  // Method 1: if...else conditional rendering
  // Executed within a helper function to decide what JSX to return based on the current state.
  const renderSystemStatusBadge = () => {
    if (systemStatus === 'active') {
      return (
        <div className="status-badge active-status animate-pulse">
          <span className="dot"></span> System Live & Operational
        </div>
      );
    } else {
      return (
        <div className="status-badge maintenance-status">
          <span className="dot warning"></span> System in Maintenance Mode
        </div>
      );
    }
  };

  // Method 2: Element Variables
  // We store the component inside a variable based on conditional checks.
  let courseSectionElement;
  if (showCourses) {
    courseSectionElement = <CourseDetails />;
  } else {
    courseSectionElement = (
      <div className="hidden-placeholder">
        <p>🔒 Training Courses component has been toggled off. Enable it from the dashboard.</p>
      </div>
    );
  }

  // Toggle helper functions
  const toggleBooks = () => setShowBooks(!showBooks);
  const toggleBlogs = () => setShowBlogs(!showBlogs);
  const toggleCourses = () => setShowCourses(!showCourses);
  const toggleSystemStatus = () => {
    setSystemStatus(systemStatus === 'active' ? 'maintenance' : 'active');
  };
  const toggleFooter = () => setShowFooter(!showFooter);

  return (
    <div className="app-container">
      {/* Header section */}
      <header className="app-header">
        <div className="header-top">
          <h1 className="main-title">BloggerApp Dashboard</h1>
          {/* Method 1: Rendered here */}
          {renderSystemStatusBadge()}
        </div>
        <p className="subtitle">
          Demonstrating React Functional Components, Lists, Unique Keys, map() & Conditional Rendering.
        </p>
      </header>

      {/* Control Dashboard */}
      <section className="control-panel">
        <h3 className="panel-title">Interactive Rendering Dashboard</h3>
        <div className="button-group">
          <button 
            className={`btn ${showBooks ? 'btn-active' : 'btn-inactive'}`} 
            onClick={toggleBooks}
          >
            Toggle Books <span className="method-label">(Logical &&)</span>
          </button>
          
          <button 
            className={`btn ${showBlogs ? 'btn-active' : 'btn-inactive'}`} 
            onClick={toggleBlogs}
          >
            Toggle Blogs <span className="method-label">(Ternary Operator)</span>
          </button>
          
          <button 
            className={`btn ${showCourses ? 'btn-active' : 'btn-inactive'}`} 
            onClick={toggleCourses}
          >
            Toggle Courses <span className="method-label">(Element Variables)</span>
          </button>

          <button 
            className="btn btn-status-toggle" 
            onClick={toggleSystemStatus}
          >
            Toggle System Status <span className="method-label">(if...else)</span>
          </button>

          <button 
            className={`btn ${showFooter ? 'btn-active' : 'btn-inactive'}`} 
            onClick={toggleFooter}
          >
            Toggle Footer <span className="method-label">(Returning null)</span>
          </button>
        </div>
      </section>

      {/* Main Content Area containing the details components */}
      <main className="app-content">
        
        {/* Method 4: Logical && Rendering for Book Details */}
        {showBooks && (
          <section className="content-section animate-fade-in">
            <BookDetails />
          </section>
        )}

        {/* Method 3: Ternary Operator Rendering for Blog Details */}
        {showBlogs ? (
          <section className="content-section animate-fade-in">
            <BlogDetails />
          </section>
        ) : (
          <section className="content-section disabled-section animate-fade-in">
            <div className="hidden-placeholder">
              <p>📭 Blog Articles component is disabled. Toggle "Blogs" to enable view.</p>
            </div>
          </section>
        )}

        {/* Method 2: Element Variables Rendering for Course Details */}
        <section className="content-section animate-fade-in">
          {courseSectionElement}
        </section>

      </main>

      {/* Method 5: Returning null component invocation */}
      <FooterDetails show={showFooter} />
    </div>
  );
}

export default App;
