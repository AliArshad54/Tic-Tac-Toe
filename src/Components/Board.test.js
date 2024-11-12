import React from 'react';
import { render, screen } from '@testing-library/react';
import Board from './Board';

describe('Board Component', () => {
  test('renders all 9 squares', () => {
    const squares = Array(9).fill(null);
    render(<Board squares={squares} onClick={() => {}} />);
    
    const renderedSquares = screen.getAllByRole('button');
    expect(renderedSquares.length).toBe(9);
  });
});
