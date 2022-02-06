import React from 'react';
import { useTable } from 'react-table';
import { TableColumnSortComponent } from './sort';

/* TableColumnSortComponent Helpers */
export type UITableSortTypes = 'asc' | 'desc';
export type UITableCustomRendererTypes = React.ReactElement | string | number;
interface UITableColumnProps<T> {
  Header: string;
  accessor: string;
  sortName?: string;
  sort?: boolean;
  sortType?: UITableSortTypes;
  customRenderer?: (item: T) => UITableCustomRendererTypes;
}

function useTableRowNormalizator<T>(items: UITableColumnProps<T>[]) {
  return items.map(item => {
    if (item.customRenderer && typeof item.customRenderer === 'function') {
      const Cell = (i: any) => {
        return item.customRenderer(i.row.original);
      };

      return { Cell, ...item };
    }

    return item;
  });
}

interface UITableProps<T> {
  data: T[];
  columns: UITableColumnProps<T>[];
  onSortChange?: (e) => void;
  onSortTypeChange?: (value) => void;
}

/* TableColumnSortComponent Component  */
function UITableComponent<T>(props: UITableProps<T>) {
  /* TableColumnSortComponent Variables */
  const [columns] = React.useState(useTableRowNormalizator(props.columns));
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: props.data,
  });

  return (
    <div>
      <table className="table table-hover" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th className="text-center align-middle" {...column.getHeaderProps()}>
                  {column.sort && (
                    <TableColumnSortComponent
                      item={column.sortName || props.columns[index].accessor}
                      title={column.Header}
                      sortType={column.sortType || 'desc'}
                      onSortChange={(item, sortType) => {
                        props.onSortChange(item);
                        props.onSortTypeChange(sortType);
                      }}
                    />
                  )}
                  {!column.sort && <span>{column.render('Header')}</span>}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);

            return (
              <tr className="text-center" {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const PureUITableComponent = React.memo(UITableComponent);

export { PureUITableComponent as UITableComponent };
