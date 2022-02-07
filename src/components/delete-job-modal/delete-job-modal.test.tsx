import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeleteJobModalComponent } from '.';

const jobDetail = { jobTitle: 'adaylarla ilgili teknik odev hazirlamam gerekiyor', priority: 'Urgent' };

describe('DeleteJobModalComponent', () => {
  it('should render when opened', () => {
    const onCloseSpy = jest.fn();
    const onSubmitSpy = jest.fn();
    render(<DeleteJobModalComponent isOpened onApprove={onSubmitSpy} onClose={onCloseSpy} jobDetail={jobDetail} />);
    const dialogElement = screen.getByRole('dialog');
    expect(dialogElement).toBeInTheDocument();
  });

  it('should fire onApprove callback', async () => {
    const onCloseSpy = jest.fn();
    const onApproveSpy = jest.fn();
    render(<DeleteJobModalComponent isOpened onApprove={onApproveSpy} onClose={onCloseSpy} jobDetail={jobDetail} />);
    const approveButtonElement = screen.getByText(/Approve/i);
    fireEvent.click(approveButtonElement);

    await waitFor(() => {
      expect(onApproveSpy).toHaveBeenCalledWith({
        jobTitle: 'adaylarla ilgili teknik odev hazirlamam gerekiyor',
        priority: 'Urgent',
      });
    });
  });
  it('should fire onClose callback', async () => {
    const onCloseSpy = jest.fn();
    const onApproveSpy = jest.fn();
    render(<DeleteJobModalComponent isOpened onApprove={onApproveSpy} onClose={onCloseSpy} jobDetail={jobDetail} />);
    const cancelButtonElement = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButtonElement);

    await waitFor(() => {
      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
  });
});
