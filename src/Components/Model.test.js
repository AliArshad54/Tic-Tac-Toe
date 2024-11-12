import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Model';

describe('Modal Component', () => {
  test('renders the winner message correctly', () => {
    render(<Modal winner="Player 1" onRestart={() => {}} />);
    expect(screen.getByText(/Player 1 wins!/i)).toBeInTheDocument();
  });

  test('calls onRestart when the Restart Game button is clicked', () => {
    const onRestartMock = jest.fn();
    render(<Modal winner="Player 1" onRestart={onRestartMock} />);

    const restartButton = screen.getByRole('button', { name: /Restart Game/i });
    fireEvent.click(restartButton);
    expect(onRestartMock).toHaveBeenCalledTimes(1);
  });
});
