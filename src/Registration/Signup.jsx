import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const [players, setPlayers] = useState([
    { name: '', email: '', password: '', role: '' },
    { name: '', email: '', password: '', role: '' }
  ]);
  const [error, setError] = useState('');
  const [firstPlayerMessage, setFirstPlayerMessage] = useState('');
  const [secondPlayerMessage, setSecondPlayerMessage] = useState('');
  const [player1Registered, setPlayer1Registered] = useState(false);
  const [player2Registered, setPlayer2Registered] = useState(false);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPlayers = [...players];
    updatedPlayers[index][name] = value;
    setPlayers(updatedPlayers);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 20;
    return password.length >= minLength && password.length <= maxLength;
  };
  const handleSubmit = (index) => {
    const player = players[index];
    const missingField = !player.name || !player.email || !player.password || !player.role;
    if (missingField) {
      setError(`All fields are required for Player ${index + 1}`);
      return;
    }
    if (!validateEmail(player.email)) {
      setError(`Please enter a valid email for Player ${index + 1}`);
      return;
    }
    if (!validatePassword(player.password)) {
      setError(`Password must be between 8 and 20 characters for Player ${index + 1}`);
      return;
    }
    const playerNamesAndRoles = {
      player1: { name: players[0].name, role: players[0].role },
      player2: { name: players[1].name, role: players[1].role }
    };

    if (index === 0) {
      localStorage.setItem('playerNamesAndRoles', JSON.stringify(playerNamesAndRoles));
      setSecondPlayerMessage('Please wait until the second player registers.');
      setPlayer1Registered(true);
    } else {
      localStorage.setItem('playerNamesAndRoles', JSON.stringify(playerNamesAndRoles));
      setFirstPlayerMessage('Please wait until the first player registers.');
      setPlayer2Registered(true);
    }
  };

  const availableRoles = (index) => {
    const allRoles = ['X', 'O','+','&'];
    if (index === 0 && players[1].role) {
      return allRoles.filter((role) => players[1].role !== role);
    }
    if (index === 1 && players[0].role) {
      return allRoles.filter((role) => players[0].role !== role);
    }
    return allRoles;
  };

  if (player1Registered && player2Registered) {
    return <Navigate to={'/game'} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
      {error && <h2 className="text-red-600 mb-4">{error}</h2>}
      {firstPlayerMessage && <h2 className="text-blue-600 mb-4">{firstPlayerMessage}</h2>}
      {secondPlayerMessage && <h2 className="text-blue-600 mb-4">{secondPlayerMessage}</h2>}

      <div className="flex flex-col sm:flex-row sm:space-x-4 w-full max-w-4xl">
        {/* Player 1 Form */}
        <form className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full sm:w-1/2">
          <h3 className="text-lg font-semibold mb-4">Player 1</h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="player1Name" className="text-sm font-medium">Name:</label>
              <input
                data-testid="player1-name"
                type="text"
                name="name"
                value={players[0].name}
                onChange={(e) => handleChange(e, 0)}
                id="player1Name"
                placeholder="Enter Your Name"
                className="border border-gray-300 rounded p-2"
                required
              />
              <label htmlFor="player1Email" className="text-sm font-medium mt-2">Email:</label>
              <input
                data-testid="player1-email"
                type="email"
                name="email"
                value={players[0].email}
                onChange={(e) => handleChange(e, 0)}
                id="player1Email"
                placeholder="Enter Your Valid Email"
                className="border border-gray-300 rounded p-2"
                required
              />
              <label htmlFor="player1Password" className="text-sm font-medium mt-2">Password:</label>
              <input
                data-testid="player1-password"
                type="password"
                name="password"
                value={players[0].password}
                onChange={(e) => handleChange(e, 0)}
                id="player1Password"
                placeholder="Enter Your Password"
                className="border border-gray-300 rounded p-2"
                required
              />
              <label htmlFor="player1Role" className="text-sm font-medium mt-2">Play As a:</label>
              <select
                data-testid="player1-role"
                name="role"
                value={players[0].role}
                onChange={(e) => handleChange(e, 0)}
                id="player1Role"
                className="border border-gray-300 rounded p-2"
                required
              >
                <option value="">Select Role</option>
                {availableRoles(0).map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleSubmit(0)}
                className="mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                required
              >
                Register Player 1
              </button>
            </div>
          </div>
        </form>

        {/* Player 2 Form */}
        <form className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full sm:w-1/2">
          <h3 className="text-lg font-semibold mb-4">Player 2</h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="player2Name" className="text-sm font-medium">Name:</label>
              <input
                data-testid="player2-name"
                type="text"
                name="name"
                value={players[1].name}
                id="player2Name"
                onChange={(e) => handleChange(e, 1)}
                placeholder="Enter Your Name"
                className="border border-gray-300 rounded p-2"
                required
              />
              <label htmlFor="player2Email" className="text-sm font-medium mt-2">Email:</label>
              <input
                data-testid="player2-email"
                type="email"
                name="email"
                value={players[1].email}
                onChange={(e) => handleChange(e, 1)}
                id="player2Email"
                placeholder="Enter Your Valid Email"
                className="border border-gray-300 rounded p-2"
                required
              />
              <label htmlFor="player2Password" className="text-sm font-medium mt-2">Password:</label>
              <input
                data-testid="player2-password"
                type="password"
                name="password"
                value={players[1].password}
                onChange={(e) => handleChange(e, 1)}
                id="player2Password"
                placeholder="Enter Your Password"
                className="border border-gray-300 rounded p-2"
                required
              />
              <label htmlFor="player2Role" className="text-sm font-medium mt-2">Play As a:</label>
              <select
                data-testid="player2-role"
                name="role"
                value={players[1].role}
                onChange={(e) => handleChange(e, 1)}
                id="player2Role"
                className="border border-gray-300 rounded p-2"
                required
              >
                <option value="">Select Role</option>
                {availableRoles(1).map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleSubmit(1)}
                className="mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Register Player 2
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
