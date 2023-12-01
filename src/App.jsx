import { useState, useEffect } from 'react'
import './App.css'

function Square({ value, onSquareClick }) {
  return (
    <button className="w-[35px] h-[35px] bg-slate-300 p-2 border border-black" onClick={onSquareClick}>{value}</button>
  )
}

function Board({xIsNext, squares, onPlay}) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares)
  }
  return (
    <>
      <p className='mt-5 ml-5'>{status}</p>
      <div className="w-[150px] p-5">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export default function Game() {
  
  const [currentMove, setCurrentMove] = useState(0)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const currentSquares = history[currentMove]
  const xIsNext = currentMove % 2 === 0


  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
    const nextHistory = [...history.slice(0, nextMove + 1)];
    setHistory(nextHistory);
  }
  

  const moves = history.map((squares, move) => {
    let description
    if(move > 0) {
      description = 'Go to move #' + move;
      } else  {
        description = 'Go to game start'
      } 
    return (
      <li key={move}>
      <button className="bg-slate-300 p-2 mb-2 rounded" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })
  
  
  return (
      <div className="flex">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <ol className="p-5">{moves}</ol>
      </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}