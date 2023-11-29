import { useState } from 'react'
import './App.css'

function Square({ value, onSquareClick }) {
  return (
    <button className="w-[35px] h-[35px] bg-slate-300 p-2 border border-black" onClick={onSquareClick}>{value}</button>
  )
}

export default function Board() {
  const [square, setSquare] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true);
  function handleClick(i) {
    const nextSquare = square.slice()
    if (xIsNext) {
      nextSquare[i] = "X"
    } else {
      nextSquare[i] = "O"
    }
    setSquare(nextSquare)
    setXIsNext(!xIsNext)
  }
  return (
    <div className="w-[150px] flex flex-wrap p-5">
      <Square value={square[0]} onSquareClick={() => handleClick(0)} />
      <Square value={square[1]} onSquareClick={() => handleClick(1)} />
      <Square value={square[2]} onSquareClick={() => handleClick(2)} />
      <Square value={square[3]} onSquareClick={() => handleClick(3)} />
      <Square value={square[4]} onSquareClick={() => handleClick(4)} />
      <Square value={square[5]} onSquareClick={() => handleClick(5)} />
      <Square value={square[6]} onSquareClick={() => handleClick(6)} />
      <Square value={square[7]} onSquareClick={() => handleClick(7)} />
      <Square value={square[8]} onSquareClick={() => handleClick(8)} />
    </div>
  )
}
