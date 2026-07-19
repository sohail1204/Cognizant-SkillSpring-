import React from 'react';

function IndianPlayers() {
  // Array containing Indian Team players
  const indianPlayers = [
    "Virat Kohli",       // 1st (Odd)
    "Rohit Sharma",       // 2nd (Even)
    "MS Dhoni",           // 3rd (Odd)
    "KL Rahul",           // 4th (Even)
    "Ravindra Jadeja",    // 5th (Odd)
    "Jasprit Bumrah",     // 6th (Even)
    "Mohammed Shami",     // 7th (Odd)
    "Ravichandran Ashwin",// 8th (Even)
    "Hardik Pandya",      // 9th (Odd)
    "Rishabh Pant",       // 10th (Even)
    "Shubman Gill"        // 11th (Odd)
  ];

  // Part 8: Array Destructuring
  // Destructuring individual elements from the array
  const [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11] = indianPlayers;

  // Grouping into Odd and Even Team Players based on 1-based positioning
  const oddTeamPlayers = [p1, p3, p5, p7, p9, p11];
  const evenTeamPlayers = [p2, p4, p6, p8, p10];

  // Part 9: Merge Arrays using Spread Operator
  const T20Players = ["Suryakumar Yadav", "Sanju Samson", "Rinku Singh"];
  const RanjiTrophyPlayers = ["Sarfaraz Khan", "Abhimanyu Easwaran", "Yash Dhull"];

  // Merging both arrays using Spread Operator
  const mergedPlayers = [...T20Players, ...RanjiTrophyPlayers];

  return (
    <div className="indian-players-container">
      <h2>Indian Team Players</h2>
      <p className="section-desc">
        This component demonstrates ES6 Destructuring (dividing a list into Odd and Even positioned players) 
        and the ES6 Spread Operator (merging two separate player pools into a unified roster).
      </p>

      <div className="grid-container">
        {/* Odd Position Players Card */}
        <div className="card">
          <h3>Odd Position Players (1st, 3rd, 5th...)</h3>
          <ul className="players-list">
            {oddTeamPlayers.map((player, idx) => (
              <li key={idx} className="player-item odd-item">
                <span className="bullet">⚡</span> {player}
              </li>
            ))}
          </ul>
        </div>

        {/* Even Position Players Card */}
        <div className="card">
          <h3>Even Position Players (2nd, 4th, 6th...)</h3>
          <ul className="players-list">
            {evenTeamPlayers.map((player, idx) => (
              <li key={idx} className="player-item even-item">
                <span className="bullet">🔥</span> {player}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Merged Players Section */}
      <div className="card merged-card">
        <h3>Merged Player Pool (Spread Operator)</h3>
        <div className="pool-info">
          <div>
            <strong>T20 Squad:</strong> {T20Players.join(", ")}
          </div>
          <div>
            <strong>Ranji Squad:</strong> {RanjiTrophyPlayers.join(", ")}
          </div>
        </div>
        <table className="players-table">
          <thead>
            <tr>
              <th>Merged No.</th>
              <th>Player Name</th>
              <th>Source Squad</th>
            </tr>
          </thead>
          <tbody>
            {mergedPlayers.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player}</td>
                <td>
                  <span className={`badge ${T20Players.includes(player) ? 'badge-t20' : 'badge-ranji'}`}>
                    {T20Players.includes(player) ? 'T20' : 'Ranji Trophy'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IndianPlayers;
