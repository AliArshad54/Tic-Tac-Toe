import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  function handleExit(){
    localStorage.clear('player')
  }
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Game</h1>
        <nav>
          <NavLink
          onClick={handleExit}
            to="/"
            className="text-white hover:text-gray-200 transition duration-300"
          >
            Exit
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
