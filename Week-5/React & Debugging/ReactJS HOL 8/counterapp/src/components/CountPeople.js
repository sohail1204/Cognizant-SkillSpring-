import React, { Component } from 'react';

class CountPeople extends Component {
  // Part 4 - Constructor
  constructor(props) {
    super(props);
    
    // Initialize State with entrycount and exitcount set to 0
    this.state = {
      entrycount: 0,
      exitcount: 0
    };

    // Bind methods to 'this' context
    this.UpdateEntry = this.UpdateEntry.bind(this);
    this.UpdateExit = this.UpdateExit.bind(this);
  }

  // Part 5 - Implement Methods
  
  // Increments entrycount by 1
  UpdateEntry() {
    this.setState((prevState) => {
      return { entrycount: prevState.entrycount + 1 };
    });
  }

  // Increments exitcount by 1
  UpdateExit() {
    this.setState((prevState) => {
      return { exitcount: prevState.exitcount + 1 };
    });
  }

  // Part 6 & 7 - JSX UI and Event Handling
  render() {
    return (
      <div className="counter-container">
        <h2 className="counter-title">Mall Entry Counter</h2>
        
        <div className="stats-box">
          <div className="stat-item entry">
            <span className="stat-label">People Entered : </span>
            <span className="stat-value">{this.state.entrycount}</span>
          </div>
          
          <div className="stat-item exit">
            <span className="stat-label">People Exited : </span>
            <span className="stat-value">{this.state.exitcount}</span>
          </div>
        </div>

        <div className="button-group">
          <button 
            type="button" 
            className="btn btn-login" 
            onClick={this.UpdateEntry}
          >
            Login
          </button>
          
          <button 
            type="button" 
            className="btn btn-exit" 
            onClick={this.UpdateExit}
          >
            Exit
          </button>
        </div>
      </div>
    );
  }
}

export default CountPeople;
