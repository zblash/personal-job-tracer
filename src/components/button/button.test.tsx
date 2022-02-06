import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UIButton } from '.';

describe('UIButton', () => {
  it('should on click event fires once', () => {
    const handleClickSpy = jest.fn();
    render(<UIButton onClick={handleClickSpy}>Click Test</UIButton>);
    fireEvent.click(screen.getByText(/Click Test/i));
    expect(handleClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should not clickable when button disabled', () => {
    const handleClickSpy = jest.fn();
    render(
      <UIButton disabled onClick={handleClickSpy}>
        Click Test
      </UIButton>,
    );
    fireEvent.click(screen.getByText(/Click Test/i));
    expect(handleClickSpy).toHaveBeenCalledTimes(0);
  });
});
