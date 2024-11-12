import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';
import { MemoryRouter } from 'react-router-dom';

describe('Game Component', () => {
  it('renders the Game component', () => {
    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
    expect(screen.getByText('Tic Tac Toe')).toBeInTheDocument();
  });

  it('displays player names and roles', () => {
    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
    expect(screen.getByText(/Player 1 plays as X/i)).toBeInTheDocument();
    expect(screen.getByText(/Player 2 plays as O/i)).toBeInTheDocument();
  });

  it('shows the next move after a player makes a move', () => {
    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
    const squares = screen.getAllByTestId(/square-/); // Targeting squares using data-testid

    fireEvent.click(squares[0]); // Player 1 makes a move
    expect(screen.getByText(/Next Move:/)).toBeInTheDocument();
  });

  it('updates the winner message when a player wins', () => {
    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
    const squares = screen.getAllByTestId(/square-/); // Targeting squares using data-testid

    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X

    expect(screen.getByText(/Winner is:/)).toHaveTextContent('Winner is: Player 1');
  });

  test('handles a tie situation', () => {
    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
    const squares = screen.getAllByTestId(/square-/); // Targeting squares using data-testid
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[2]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[3]); // X
    fireEvent.click(squares[5]); // O
    fireEvent.click(squares[7]); // X
    fireEvent.click(squares[6]); // O
    fireEvent.click(squares[8]); // X

    const tieMessage = screen.getByTestId('tie-message');
    expect(tieMessage).toHaveTextContent("It's a Tie!");
  });
});
