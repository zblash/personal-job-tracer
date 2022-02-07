import * as React from 'react';
import { GoChevronDown as UIDownChevronIcon, GoChevronUp as UIChevronUpIcon } from 'react-icons/go';
import { useStateFromProp } from '@/utils/hooks';
import { UIButton } from '@/components/button';

/* TableColumnSortComponent Helpers */
type SortType = 'asc' | 'desc';
interface TableColumnSortComponentProps {
  onSortChange: (item: string, sortType: string) => void;
  item: string;
  title: string | React.ReactElement;
  sortType: SortType;
}

/* TableColumnSortComponent Component  */
function TableColumnSortComponent(props: React.PropsWithChildren<TableColumnSortComponentProps>) {
  /* TableColumnSortComponent Variables */
  const [sortType, setSortType] = useStateFromProp(props.sortType);

  /* TableColumnSortComponent Callbacks */
  const onChange = React.useCallback(() => {
    const sort = sortType === 'desc' ? 'asc' : 'desc';
    setSortType(sort);
    props.onSortChange(props.item, sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, props]);

  return (
    <div className="w-100 justify-content-center d-flex">
      <UIButton className="d-flex justify-content-between align-items-center" onClick={onChange}>
        <span className="fw-bold">{props.title}</span>
        {sortType === 'asc' ? <UIChevronUpIcon /> : <UIDownChevronIcon />}
      </UIButton>
    </div>
  );
}
const PureTableColumnSortComponent = React.memo(TableColumnSortComponent);

export { PureTableColumnSortComponent as TableColumnSortComponent };
