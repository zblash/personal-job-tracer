import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UITableComponent } from '.';

const options = [
  { value: 'Urgent', label: 'Acil' },
  { value: 'Normal', label: 'Normal' },
  { value: 'Low', label: 'Az' },
];

describe('UITableComponent', () => {
  it('should render correctly', () => {
    const { container } = render(
      <UITableComponent
        columns={[
          {
            Header: 'Label',
            accessor: 'label',
          },
          {
            Header: 'Value',
            accessor: 'value',
          },
        ]}
        data={options}
        onSortChange={() => {}}
        onSortTypeChange={() => {}}
      />,
    );
    const labelHeaderElement = screen.queryByText(/Label/i);
    const valueHeaderElement = screen.queryByText(/Value/i);

    const trElements = container.querySelectorAll('tbody>tr');
    const tdElements = trElements[0].querySelectorAll('td');
    expect(labelHeaderElement).toBeInTheDocument();
    expect(valueHeaderElement).toBeInTheDocument();
    expect(trElements.length).toBe(3);
    expect(tdElements.length).toBe(2);
  });

  it('should render correctly with custom renderer', () => {
    render(
      <UITableComponent
        columns={[
          {
            Header: 'Label',
            accessor: 'label',
            customRenderer: (item: { value: 'Low'; label: 'Az' }) => `${item.value} - ${item.label}`,
          },
          {
            Header: 'Value',
            accessor: 'value',
          },
        ]}
        data={options}
        onSortChange={() => {}}
        onSortTypeChange={() => {}}
      />,
    );

    const customRenderedElement = screen.getByText(`${options[0].value} - ${options[0].label}`);
    expect(customRenderedElement).toBeInTheDocument();
  });

  it('should changeable sort type', async () => {
    const onSortChangeSpy = jest.fn();
    const onSortTypeChangeSpy = jest.fn();
    render(
      <UITableComponent
        columns={[
          {
            Header: 'Label',
            accessor: 'label',
            sort: true,
            sortType: 'asc',
          },
          {
            Header: 'Value',
            accessor: 'value',
          },
        ]}
        data={options}
        onSortChange={onSortChangeSpy}
        onSortTypeChange={onSortTypeChangeSpy}
      />,
    );
    const sortChangeButton = screen.getByRole('button');
    fireEvent.click(sortChangeButton);
    await waitFor(() => {
      expect(onSortChangeSpy).toHaveBeenCalledWith('label');
      expect(onSortTypeChangeSpy).toHaveBeenCalledWith('desc');
    });
  });
});
