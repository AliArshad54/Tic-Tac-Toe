import React from 'react';
import './Square.css'
function Square({ value, onClick }) {
  return (
    <button className="square text-black bg-cyan-500" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
