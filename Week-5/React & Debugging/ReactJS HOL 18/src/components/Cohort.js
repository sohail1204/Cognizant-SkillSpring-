import React from 'react';

export const CohortData = [
  {
    code: 'C01',
    name: 'React JS Basics',
    startDate: '2026-07-01',
    strength: 25
  },
  {
    code: 'C02',
    name: 'Advanced React & Redux',
    startDate: '2026-08-01',
    strength: 30
  }
];

const Cohort = ({ cohort }) => {
  return (
    <div className="cohort-card">
      <h4>{cohort.name}</h4>
      <p>Code: {cohort.code}</p>
    </div>
  );
};

export default Cohort;
