import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UISelect } from '.';

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
    <select value={value} onChange={handleChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});

describe('UISelect', () => {
  it('should render same text in label passed into labelKey', () => {
    render(<UISelect labelKey="Test Select Label" options={options} />);
    const labelElement = screen.getByText(/Test Select Label/i);
    expect(labelElement).toBeInTheDocument();
  });

  it('should render error text', () => {
    render(<UISelect options={options} errorKey="Error" />);
    const errorElement = screen.getByText(/Error/i);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('invalid-feedback');
  });

  it('should option selectable', () => {
    const onSelectChangedSpy = jest.fn();
    render(<UISelect value={options[0]} onChange={onSelectChangedSpy} options={options} />);
    const selectElement = screen.getByDisplayValue(options[0].label);
    const selectOptElement = screen.getByText(options[1].label);
    expect(selectOptElement).toBeInTheDocument();

    fireEvent.change(selectElement, { target: { value: options[1].value } });
    expect(onSelectChangedSpy).toHaveBeenCalledTimes(1);
  });
});
