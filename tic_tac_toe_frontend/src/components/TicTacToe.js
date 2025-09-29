import React, { useMemo, useState } from 'react';

/**
 * Calculates the winner and returns an object with:
 * - winner: 'X' | 'O' | null
 * - line: indices of winning squares or []
 * - draw: boolean
 */
function getWinnerInfo(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6],         // diagonals
  ];
  for (const [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a,b,c], draw: false };
    }
  }
  const filled = squares.every(Boolean);
  return { winner: null, line: [], draw: filled };
}

// PUBLIC_INTERFACE
export default function TicTacToe() {
  /** Local multiplayer: X starts, players alternate clicking empty squares */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line, draw } = useMemo(() => getWinnerInfo(squares), [squares]);
  const currentPlayer = xIsNext ? 'X' : 'O';

  const handleSquareClick = (index) => {
    // Do nothing if square is filled or game over
    if (squares[index] || winner) return;
    const next = squares.slice();
    next[index] = currentPlayer;
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    /** Reset the current game to a fresh board. */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const statusText = winner
    ? `Winner: ${winner}`
    : draw
      ? 'Draw game'
      : `Turn: ${currentPlayer}`;

  const chipClass = winner ? 'chip success' : draw ? 'chip error' : 'chip';

  return (
    <>
      <section className="status" aria-live="polite">
        <div className="status-row">
          <span className={chipClass}>
            {winner ? '🏆' : draw ? '🤝' : currentPlayer === 'X' ? '❌' : '⭕️'}
            <strong>{statusText}</strong>
          </span>
        </div>

        {!winner && !draw && (
          <div className="status-row" role="status">
            <span className={`badge ${currentPlayer.toLowerCase()}`}>
              {currentPlayer === 'X' ? 'Player X' : 'Player O'}
            </span>
            <span className="badge">Local Multiplayer</span>
          </div>
        )}

        {(winner || draw) && (
          <div className="status-row">
            <span className="badge">Game Over</span>
            {winner && <span className={`badge ${winner.toLowerCase()}`}>Congrats {winner}</span>}
          </div>
        )}
      </section>

      <Board
        squares={squares}
        winnerLine={line}
        onSquareClick={handleSquareClick}
      />

      <div className="actions">
        <button
          type="button"
          onClick={resetGame}
          className="btn btn-primary"
          aria-label="Reset the game and start a new match"
        >
          🔄 Reset Game
        </button>
      </div>
    </>
  );
}

function Board({ squares, winnerLine, onSquareClick }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe Board">
      {squares.map((value, idx) => {
        const isWin = winnerLine.includes(idx);
        return (
          <Square
            key={idx}
            index={idx}
            value={value}
            isWin={isWin}
            onClick={() => onSquareClick(idx)}
          />
        );
      })}
    </div>
  );
}

function Square({ index, value, isWin, onClick }) {
  const cls = [
    'square',
    value === 'X' ? 'x' : '',
    value === 'O' ? 'o' : '',
    isWin ? 'win' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={cls}
      aria-label={`Square ${index + 1} ${value ? 'occupied by ' + value : 'empty'}`}
      onClick={onClick}
    >
      {value || ''}
    </button>
  );
}
