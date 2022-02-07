import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditJobModalComponent } from '.';

const jobDetail = { jobTitle: 'adaylarla ilgili teknik odev hazirlamam gerekiyor', priority: 'Urgent' };
const priorities = [
  { value: 'Urgent', label: 'Acil' },
  { value: 'Trivial', label: 'Normal' },
  { value: 'Regular', label: 'Az' },
];

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
    const saveButtonElement = screen.getByText(/Save/i);
    fireEvent.click(saveButtonElement);

    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenCalledWith({
        jobTitle: 'adaylarla ilgili teknik odev hazirlamam gerekiyor',
        priority: 'Urgent',
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
