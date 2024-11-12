import React, { useEffect, useState } from 'react';
import '../App.css';
import './Game.css';
import Board from './Board';
import Header from './Header/Header';
import Modal from './Model'; 

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(null); // Start with null
  const [winner, setWinner] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [rewardX, setRewardX] = useState(0);
  const [rewardY, setRewardY] = useState(0);
  const [countX, setCountX] = useState(0);
  const [countY, setCountY] = useState(0);
  const [playerName,setPlayerName]=useState('');
  // Fetch player names and roles from localStorage
  const players = JSON.parse(localStorage.getItem('playerNamesAndRoles')) || { 
    player1: { name: 'Player 1', role: 'X' }, 
    player2: { name: 'Player 2', role: 'O' } 
  };

  const player1Name = players.player1.name;
  const player2Name = players.player2.name;
  const player1Role = players.player1.role; 
  const player2Role = players.player2.role; 

  // Set the initial current player to player1Role (X)
  useEffect(() => {
    setCurrentPlayer(player1Role);
  }, [player1Role]);

  const handleClick = (index) => {
    if (winner || squares[index]) return; // Prevent action if the game is over or square is already filled
    const newSquares = [...squares];
    newSquares[index] = currentPlayer;
    const pName=currentPlayer===player1Role ? player2Name:player1Name;
    setPlayerName(pName);
    setSquares(newSquares);
    checkWinner(newSquares);
    setIsClicked(true);
    setCurrentPlayer(currentPlayer === player1Role ? player2Role : player1Role);
  };

  const checkWinner = (squares) => {
    const checkingCombination = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];
console.log(checkingCombination);
    for (let combination of checkingCombination) {
      const [a, b, c] = combination;
      console.log(squares[c]);
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        const winnerPlayer = squares[a] === player1Role ? player1Name : player2Name;
        setWinner(winnerPlayer);
        setIsClicked(false);
        // Increment the count and rewards
        if (squares[a] === player1Role) {
          setCountX(countX + 1);
          setRewardX(prevReward => prevReward + 10);
        } else {
          setCountY(countY + 1);
          setRewardY(prevReward => prevReward + 10);
        }
        return;
      }
    }
    if (!squares.includes(null)) {
      setWinner('Tie');
    }
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsClicked(false);
    setCurrentPlayer((prevRole)=>{
      if(winner===player1Name){
      return player2Role;
      }
      else if(winner===player2Name){
      return player1Role;
      }else{
        return prevRole===player1Role?player2Role:player1Role;
      }
    }); 
    setWinner(null);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center p-4 bg-gray-100 min-h-screen ">
        <div className="rounded-lg p-6 ">
          <h1 className="text-2xl font-bold text-center mb-4">Tic Tac Toe</h1>
          <div className="flex justify-between mb-4">
            <h2 className="text-lg">{player1Name} plays as {player1Role}</h2>
            <h2 className="text-lg">{player2Name} plays as {player2Role}</h2>
          </div>
          <h2 className="text-xl mb-4 text-center">{isClicked ? `Next Move: ${playerName}` : 'Play Game'}</h2>
          <Board squares={squares} onClick={handleClick} />
       
          <h2 className="text-xl mt-4 text-center">{winner && (winner === 'Tie' ? 'It\'s a Tie!' : `Winner is: ${winner}`)}</h2>
          <div className='flex justify-between items-center mt-4 w-full max-w-md'>
            <h2 className="text-lg">Win {player1Name}: {rewardX}+</h2>
            <h2 className="text-lg">Win {player2Name}: {rewardY}+</h2>
          </div>
        </div>
        {winner && (
          <Modal winner={winner} onRestart={handleRestart} />
        )}
      </div>
    </>
  );
}

export default Game;
