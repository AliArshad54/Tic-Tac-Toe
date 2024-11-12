import React from 'react';

const Modal = ({ winner, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
   
        <h2 className="text-2xl font-bold mb-4"> {winner === 'Tie' ? 'Tie' : `${winner} wins!`}</h2>
        <button
          onClick={onRestart}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default Modal;
