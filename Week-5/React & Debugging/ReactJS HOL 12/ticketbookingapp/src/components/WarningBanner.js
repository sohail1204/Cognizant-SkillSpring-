import React from 'react';

/**
 * WarningBanner Component
 * Demonstrates preventing a component from rendering by returning null.
 * 
 * Props:
 * - warn: boolean. If false, the component returns null, preventing it from rendering.
 * - message: string warning message to be displayed.
 */
const WarningBanner = ({ warn, message }) => {
  if (!warn) {
    // Returning null prevents the component from rendering anything on the UI,
    // although React still keeps track of its lifecycle and state internally.
    return null;
  }

  return (
    <div className="warning-banner">
      <span className="warning-icon">⚠</span>
      <span className="warning-message">{message}</span>
    </div>
  );
};

export default WarningBanner;
