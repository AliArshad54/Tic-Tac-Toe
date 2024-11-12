import React from 'react';
import Square from './Square';
import './Board.css'
function Board({ squares, onClick }) {
    console.log(squares);
  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square key={index} value={square} onClick={() => onClick(index)} />
      ))}
    </div>
  );
}

export default Board;
