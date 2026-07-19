import React from 'react';

const CohortDetails = ({ cohort }) => {
  if (!cohort) {
    return <div className="no-cohort">No cohort details available</div>;
  }

  return (
    <div className="cohort-details">
      <h3>{cohort.code}</h3>
      <p>Name: {cohort.name}</p>
      <p>Start Date: {cohort.startDate}</p>
      <p>Strength: {cohort.strength}</p>
    </div>
  );
};

export default CohortDetails;
