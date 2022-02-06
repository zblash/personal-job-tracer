import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UIButton } from '.';
import userEvent from '@testing-library/user-event';

describe('UIButton', () => {
  it('should on click event fires once', () => {
    const handleClick = jest.fn();
    render(<UIButton onClick={handleClick}>Click Test</UIButton>);
    fireEvent.click(screen.getByText(/Click Test/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not clickable when button disabled', () => {
    const handleClick = jest.fn();
    render(
      <UIButton disabled onClick={handleClick}>
        Click Test
      </UIButton>,
    );
    fireEvent.click(screen.getByText(/Click Test/i));
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
