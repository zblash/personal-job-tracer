import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TableColumnSortComponent } from './sort';

describe('TableColumnSortComponent', () => {
  it('should render correctly and fire callback', async () => {
    const onSortChangeSpy = jest.fn();
    render(<TableColumnSortComponent item="label" title="Label" sortType="asc" onSortChange={onSortChangeSpy} />);
    const sortChangeButton = screen.getByRole('button');
    fireEvent.click(sortChangeButton);
    await waitFor(() => {
      expect(onSortChangeSpy).toHaveBeenCalledWith('label', 'desc');
    });
  });
});
