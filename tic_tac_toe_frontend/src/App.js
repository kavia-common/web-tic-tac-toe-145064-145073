import React from 'react';
import './App.css';
import './index.css';
import TicTacToe from './components/TicTacToe';

// PUBLIC_INTERFACE
function App() {
  /** Root app renders a centered single-page Tic Tac Toe game following the Ocean Professional theme. */
  return (
    <div className="app-root ocean-bg">
      <main className="card surface" role="main" aria-label="Tic Tac Toe App">
        <header className="header">
          <h1 className="title">Tic Tac Toe</h1>
          <p className="subtitle">Local Multiplayer • Ocean Professional Theme</p>
        </header>

        <TicTacToe />

        <footer className="footer" aria-label="Footer">
          <p className="credits">Built with React • Modern & Minimal</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
