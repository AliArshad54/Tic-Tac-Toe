import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Square from './Square';

describe('Square Component', () => {
  test('renders a square with the correct value', () => {
    render(<Square value="X" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('X');
  });

  test('calls onClick when clicked', () => {
    const onClickMock = jest.fn();
    render(<Square value={null} onClick={onClickMock} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
