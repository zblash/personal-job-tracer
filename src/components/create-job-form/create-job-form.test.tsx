/* eslint-disable no-shadow */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateJobFormComponent } from '.';

const options = [
  { value: 'Urgent', label: 'Acil' },
  { value: 'Normal', label: 'Normal' },
  { value: 'Low', label: 'Az' },
];

jest.mock('react-select', () => ({ options, value, onChange }) => {
  function handleChange(e) {
    const option = options.find(option => option.value === e.currentTarget.value);
    onChange(option);
  }

  return (
    <select data-testid="select-item" value={value} onChange={handleChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});

describe('CreateJobFormComponent', () => {
  it('should render errors on empty case', async () => {
    const onSubmitSpy = jest.fn();

    render(<CreateJobFormComponent options={options} onSubmit={onSubmitSpy} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getAllByText('This field is required.')).toHaveLength(2);
    });
  });

  it('should return values on submit', async () => {
    const onSubmitSpy = jest.fn();

    render(<CreateJobFormComponent options={options} onSubmit={onSubmitSpy} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(/Job Name/i) as HTMLInputElement;

    const selectElement = screen.getByTestId(/select-item/i);
    const selectOptElement = screen.getByText('Normal');
    expect(selectOptElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: 'Testing' } });
    fireEvent.change(selectElement, { target: { value: 'Normal' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenCalledWith({ jobTitle: 'Testing', priority: 'Normal' });
    });
  });
});
