import React, { useState } from "react";
import CurrencyConvertor from "./components/CurrencyConvertor";
import "./App.css";

/**
 * App Component
 * 
 * Demonstrates various event handling features in React, including:
 * 1. Simple state management using the useState Hook
 * 2. Invoking multiple methods/updates from a single event handler (Increment)
 * 3. Preventing code duplication (Decrement)
 * 4. Passing custom parameters to event handlers (Say Welcome)
 * 5. Extracting details from Synthetic Events
 * 6. Integrating sub-components (CurrencyConvertor)
 */
function App() {
  // State for the counter application
  const [count, setCount] = useState(0);

  // State to hold the static greeting message ("Hello! Have a Great Day!")
  const [helloMessage, setHelloMessage] = useState("");

  // State to hold the parameterized welcome message ("Welcome")
  const [welcomeMessage, setWelcomeMessage] = useState("");

  // State to hold the description of the synthetic event click
  const [syntheticEventMsg, setSyntheticEventMsg] = useState("");

  /**
   * Action 1: Increments the counter state by 1.
   */
  const incrementCounter = () => {
    setCount((prevCount) => prevCount + 1);
  };

  /**
   * Action 2: Updates the helloMessage state to display greeting.
   */
  const sayHello = () => {
    setHelloMessage("Hello! Have a Great Day!");
  };

  /**
   * Combined handler for the Increment Button.
   * Invokes multiple actions (incrementCounter and sayHello) from a single event trigger.
   */
  const handleIncrementAndGreet = () => {
    incrementCounter();
    sayHello();
  };

  /**
   * Handler for the Decrement Button.
   * Decreases the counter state by 1.
   * Kept simple and modular to avoid unnecessary code duplication.
   */
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  /**
   * Handler for passing arguments to an event.
   * Triggered by "Say Welcome" button.
   * 
   * @param {string} customWord - The custom text passed to the event handler
   */
  const handleSayWelcome = (customWord) => {
    setWelcomeMessage(customWord);
  };

  /**
   * Handler showing React Synthetic Events in action.
   * React wraps native browser events in an instance of SyntheticEvent.
   * 
   * @param {SyntheticEvent} eventObject - React synthetic event object
   */
  const handleSyntheticEvent = (eventObject) => {
    // Access standard properties of the synthetic event
    const eventType = eventObject.type; // "click"
    const targetTag = eventObject.target.tagName; // "BUTTON"
    
    // Display result string including event metadata
    setSyntheticEventMsg(`I was clicked (Synthetic Event Type: "${eventType}", Tag: <${targetTag}>)`);
  };

  return (
    <div className="app-container">
      {/* Header Area */}
      <header className="app-header">
        <h1 className="main-title">ReactJS Events & Event Handling</h1>
        <p className="subtitle">Hands-on Lab 11 - State, Events, Synthetic Events & Custom Components</p>
      </header>

      {/* Main Grid Layout */}
      <main className="grid-container">
        {/* Left Column: Interactive Counter & Events */}
        <section className="column card-grid">
          {/* Card 1: Counter Demonstration */}
          <div className="card">
            <h2 className="section-title">🔢 Counter Application</h2>
            <div className="counter-display">
              <span className="counter-label">Current Counter Value</span>
              <span className="counter-value">{count}</span>
            </div>

            <div className="button-group">
              {/* Increment Button triggers multiple methods: updates count & sets helloMessage */}
              <button onClick={handleIncrementAndGreet} className="btn btn-success">
                ➕ Increment
              </button>
              {/* Decrement Button triggers count reduction */}
              <button onClick={handleDecrement} className="btn btn-danger">
                ➖ Decrement
              </button>
            </div>

            {/* Conditional display of the hello message */}
            {helloMessage && (
              <div className="message-box hello-box animate-fade-in">
                <p className="msg-text">💡 {helloMessage}</p>
              </div>
            )}
          </div>

          {/* Card 2: Passing Parameters & Synthetic Events */}
          <div className="card">
            <h2 className="section-title">⚡ Event Handlers & Arguments</h2>
            <p className="card-desc">
              Demonstrates passing parameters to handlers and capturing React synthetic events.
            </p>

            <div className="button-group-vertical">
              {/* Pass argument "Welcome" in an arrow function wrapper */}
              <button
                onClick={() => handleSayWelcome("Welcome")}
                className="btn btn-secondary"
              >
                Say Welcome
              </button>

              {/* Synthetic event button passes event details to handler */}
              <button onClick={handleSyntheticEvent} className="btn btn-indigo">
                Trigger Synthetic Event
              </button>
            </div>

            {/* Display welcome argument message */}
            {welcomeMessage && (
              <div className="message-box welcome-box animate-fade-in">
                <p className="msg-label">Passed Argument:</p>
                <p className="msg-value">✨ {welcomeMessage}</p>
              </div>
            )}

            {/* Display synthetic event results */}
            {syntheticEventMsg && (
              <div className="message-box synthetic-box animate-fade-in">
                <p className="msg-label">Synthetic Event Log:</p>
                <p className="msg-value">🎯 {syntheticEventMsg}</p>
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Currency Converter Component */}
        <section className="column">
          <CurrencyConvertor />
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer-bar">
        <p>ReactJS Hands-On 11 • Developed using React 18+ & ES6 Specifications</p>
      </footer>
    </div>
  );
}

export default App;
