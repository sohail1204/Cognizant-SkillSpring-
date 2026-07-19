import React from 'react';
import EmployeeCard from './EmployeeCard';

// Dummy employee data
const employeesData = [
  { id: 1, name: 'Alice Johnson', role: 'Lead Architect', dept: 'Engineering' },
  { id: 2, name: 'Bob Smith', role: 'Product Operations', dept: 'Operations' },
  { id: 3, name: 'Charlie Brown', role: 'Interaction Designer', dept: 'Design' }
];

// Refactored: Removed theme prop entirely
function EmployeesList() {
  return (
    <div className="employee-list-container">
      <h2>Active Members</h2>
      <div className="employee-grid">
        {employeesData.map((emp) => (
          /* Refactored: No longer passing theme prop down */
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>
    </div>
  );
}

export default EmployeesList;
