import React from "react";
import "../Stylesheets/mystyle.css";

function CalculateScore() {
  // Student Profile details
  const student = {
    name: "Alex Morgan",
    rollNo: "2026CSE042",
    className: "B.Tech CSE",
    section: "A"
  };

  // Subject Marks details
  const marks = {
    Maths: 85,
    Physics: 78,
    Chemistry: 92,
    English: 80,
    CS: 95
  };

  // Perform Calculations
  const total = marks.Maths + marks.Physics + marks.Chemistry + marks.English + marks.CS;
  const average = total / 5;
  const result = (average >= 50 && marks.Maths >= 40 && marks.Physics >= 40 && marks.Chemistry >= 40 && marks.English >= 40 && marks.CS >= 40) ? "Pass" : "Fail";
  
  let grade = "F";
  if (result === "Pass") {
    if (average >= 90) grade = "S";
    else if (average >= 80) grade = "A";
    else if (average >= 70) grade = "B";
    else if (average >= 60) grade = "C";
    else grade = "D";
  }

  return (
    <div className="card">
      <h1 className="heading">Student Score Card</h1>
      
      <div className="profile">
        <p><b>Name:</b> {student.name}</p>
        <p><b>Roll No:</b> {student.rollNo}</p>
        <p><b>Class:</b> {student.className}</p>
        <p><b>Section:</b> {student.section}</p>
      </div>

      <div className="marks">
        <h2>Marks List</h2>
        <p>Mathematics: {marks.Maths}</p>
        <p>Physics: {marks.Physics}</p>
        <p>Chemistry: {marks.Chemistry}</p>
        <p>English: {marks.English}</p>
        <p>Computer Science: {marks.CS}</p>
      </div>

      <div className="results">
        <h2>Performance</h2>
        <p><b>Total Marks:</b> {total} / 500</p>
        <p><b>Average Marks:</b> {average}%</p>
        <p><b>Result:</b> <span className={result.toLowerCase()}>{result}</span></p>
        <p><b>Grade:</b> {grade}</p>
      </div>
    </div>
  );
}

export default CalculateScore;
