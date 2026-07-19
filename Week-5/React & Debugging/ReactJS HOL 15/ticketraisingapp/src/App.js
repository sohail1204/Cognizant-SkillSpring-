import './App.css';
import ComplaintRegister from './components/ComplaintRegister';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ticket Raising Portal</h1>
      </header>
      <main className="App-main">
        <ComplaintRegister />
      </main>
      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} ticketraisingapp. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

