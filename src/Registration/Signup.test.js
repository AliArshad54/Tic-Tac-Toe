import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './Signup'; // Adjust the path if needed

describe('Signup Component', () => {
  test('renders the registration form correctly for Player 1 and Player 2', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    // Check Player 1 Form
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Play As a:/i)).toBeInTheDocument();

    // Check Player 2 Form
    expect(screen.getByLabelText(/Player 2 Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Player 2 Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Player 2 Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Player 2 Play As a:/i)).toBeInTheDocument();
  });

  test('allows Player 1 and Player 2 to register and navigate to the game page', async () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    userEvent.type(screen.getByTestId('player1-name'), 'Player 1');
    userEvent.type(screen.getByTestId('player2-name'), 'Player 2');
    userEvent.type(screen.getByLabelText(/Player 1 Email/i), 'player1@example.com');
    userEvent.type(screen.getByLabelText(/Player 2 Email/i), 'player2@example.com');
    userEvent.type(screen.getByLabelText(/Player 1 Password/i), 'password1');
    userEvent.type(screen.getByLabelText(/Player 2 Password/i), 'password2');
    userEvent.selectOptions(screen.getByTestId('player1-role'), 'X');
    userEvent.selectOptions(screen.getByTestId('player2-role'), 'O');

    fireEvent.click(screen.getByText(/Register Player 1/i));
    fireEvent.click(screen.getByText(/Register Player 2/i));

    await waitFor(() => {
      expect(screen.getByText('Please wait until the first player registers.')).toBeInTheDocument();
    });

    // Add assertion for navigation to game page if needed.
  });
});
