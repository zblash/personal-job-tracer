import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UIInput } from '.';

describe('UIInput', () => {
  it('should render same text in label passed into labelKey', () => {
    render(<UIInput name="test" labelKey="Test Label" />);
    const labelElement = screen.getByText(/Test Label/i);
    expect(labelElement).toBeInTheDocument();
  });

  it('should render error text', () => {
    render(<UIInput name="test" placeholderKey="Test Input" errorKey="Error" />);
    const errorElement = screen.getByText(/Error/i);
    const inputElement = screen.getByPlaceholderText(/Test Input/i);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('invalid-feedback');
    expect(inputElement).toHaveAttribute('aria-invalid', 'true');
  });

  it('checks value changes', async () => {
    const onType = jest.fn();
    render(<UIInput name="test" value="Test" onType={onType} type="text" placeholderKey="Test Input" />);
    const inputElement = screen.getByPlaceholderText(/Test Input/i) as HTMLInputElement;
    expect(inputElement.value).toBe('Test');
    fireEvent.change(inputElement, { target: { value: 'Testing' } });

    expect(onType).toHaveBeenCalled();
  });
});
