/* eslint-disable no-shadow */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditJobModalComponent } from '.';

const jobDetail = { jobTitle: 'adaylarla ilgili teknik odev hazirlamam gerekiyor', priority: 'Urgent' };
const priorities = [
  { value: 'Urgent', label: 'Acil' },
  { value: 'Trivial', label: 'Normal' },
  { value: 'Regular', label: 'Az' },
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

describe('UIInput', () => {
  it('should render when opened', () => {
    const onCloseSpy = jest.fn();
    const onSubmitSpy = jest.fn();
    render(
      <EditJobModalComponent
        isOpened
        onSubmit={onSubmitSpy}
        onClose={onCloseSpy}
        jobDetail={jobDetail}
        options={priorities}
      />,
    );
    const dialogElement = screen.getByRole('dialog');
    expect(dialogElement).toBeInTheDocument();
  });

  it('should fire onSubmit callback', async () => {
    const onCloseSpy = jest.fn();
    const onSubmitSpy = jest.fn();
    render(
      <EditJobModalComponent
        isOpened
        onSubmit={onSubmitSpy}
        onClose={onCloseSpy}
        jobDetail={jobDetail}
        options={priorities}
      />,
    );

    const selectElement = screen.getByTestId(/select-item/i);
    const selectOptElement = screen.getByText(priorities[1].label);

    fireEvent.change(selectElement, { target: { value: priorities[1].value } });
    expect(selectOptElement).toBeInTheDocument();
    const saveButtonElement = screen.getByText(/Save/i);
    fireEvent.click(saveButtonElement);

    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenCalledWith({
        jobTitle: 'adaylarla ilgili teknik odev hazirlamam gerekiyor',
        priority: 'Trivial',
      });
    });
  });
  it('should fire onClose callback', async () => {
    const onCloseSpy = jest.fn();
    const onSubmitSpy = jest.fn();
    render(
      <EditJobModalComponent
        isOpened
        onSubmit={onSubmitSpy}
        onClose={onCloseSpy}
        jobDetail={jobDetail}
        options={priorities}
      />,
    );
    const cancelButtonElement = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButtonElement);

    await waitFor(() => {
      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
  });
});
