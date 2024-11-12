import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [player, setPlayer] = useState({ email: '', password: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sendData = await axios.post('http://localhost:3000/api/auth/login', player);
      console.log("Successfully sent data", sendData);
      setIsSubmitted(true);
      setPlayer({ email: '', password: '' }); // Clear the input fields
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prevState) => ({ ...prevState, [name]: value }));
  };

  if (isSubmitted) {
    return <Navigate to={'/game'} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login Here</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={player.email}
              onChange={handleChange}
              placeholder="Enter Your Valid Email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={player.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <NavLink to={'/register'} className="text-blue-500 hover:text-blue-700">
            Have no account?
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
