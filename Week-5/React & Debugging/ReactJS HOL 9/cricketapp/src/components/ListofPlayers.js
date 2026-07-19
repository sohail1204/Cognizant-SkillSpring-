import React from 'react';

function ListofPlayers() {
  // Array containing exactly 11 cricket players with name and score
  const players = [
    { name: "Sachin Tendulkar", score: 95 },
    { name: "Virat Kohli", score: 88 },
    { name: "MS Dhoni", score: 72 },
    { name: "Rohit Sharma", score: 65 },
    { name: "Yuvraj Singh", score: 58 },
    { name: "Suresh Raina", score: 45 },
    { name: "Gautam Gambhir", score: 97 },
    { name: "Virender Sehwag", score: 105 },
    { name: "Rahul Dravid", score: 35 },
    { name: "Sourav Ganguly", score: 82 },
    { name: "Ravindra Jadeja", score: 68 }
  ];

  // Filtering players whose score is below 70 using ES6 filter() and Arrow Functions
  const filteredPlayers = players.filter(player => player.score < 70);

  return (
    <div className="player-list-container">
      <h2>List of Players</h2>
      <p className="section-desc">
        This component demonstrates the use of the ES6 <code>map()</code> method to iterate and display all players, 
        and the <code>filter()</code> method combined with arrow functions to display players with scores below 70.
      </p>

      {/* Part 5: Display all players using map() */}
      <div className="card">
        <h3>All 11 Players</h3>
        <table className="players-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Player Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td className="score-cell">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Part 6: Filtered players list */}
      <div className="card filtered-card">
        <h3>Players with Score &lt; 70</h3>
        <table className="players-table">
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player, index) => (
              <tr key={index} className="low-score-row">
                <td>{player.name}</td>
                <td className="score-cell">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListofPlayers;
