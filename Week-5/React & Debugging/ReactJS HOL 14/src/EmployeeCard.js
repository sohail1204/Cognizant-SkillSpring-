import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

function EmployeeCard(props) {
  const { employee } = props;
  
  // Retrieve theme directly from ThemeContext using useContext hook
  const theme = useContext(ThemeContext);

  return (
    <div className={`employee-card ${theme}`}>
      <h3>{employee.name}</h3>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Department:</strong> {employee.dept}</p>
      {/* Button styles updated to use the context theme */}
      <button className={theme}>View Profile</button>
    </div>
  );
}

export default EmployeeCard;
