import React from 'react';
import { useStateFromProp } from '@/utils/hooks';
import { UIInput } from '@/components/input';
import { UISelect } from '@/components/select';
import { ArrayUtils } from '@/utils/arrays';

export function useJobFilter(values: { jobTitle: string; priority: string }[]) {
  const filterOptions = [
    { value: 'All', label: 'Priority (All)' },
    { value: 'Urgent', label: 'Acil' },
    { value: 'Trivial', label: 'Normal' },
    { value: 'Regular', label: 'Az' },
  ];
  const [selectedFilterOption, setSelectedFilterOption] = React.useState<{ value: string; label: string }>(
    filterOptions[0],
  );

  const [filterTitle, setFilterTitle] = React.useState<string>('');
  const [filteredValues, setFilteredValues] = useStateFromProp(values);
  const [isFiltered, setIsFiltered] = React.useState<boolean>(false);

  const onFilterChanged = React.useCallback(
    (keyword: string, e: { value: string; label: string }) => {
      let vals = values;
      let isTitleFiltered = false;
      let isPriorityFiltered = false;
      if (keyword.length > 2) {
        vals = ArrayUtils.filterByField(vals, 'jobTitle', keyword);
        isTitleFiltered = true;
      }
      if (e.value !== 'All') {
        // eslint-disable-next-line testing-library/await-async-query
        vals = ArrayUtils.findByField(vals, 'priority', e.value);
        isPriorityFiltered = true;
      }
      setFilteredValues(vals);
      setIsFiltered(isTitleFiltered || isPriorityFiltered);
    },
    [setFilteredValues, values],
  );

  const renderFilter = React.useCallback(() => {
    return (
      <div className="row">
        <div className="col-8">
          <UIInput
            labelClassName="font-weight-bold"
            type="text"
            placeholderKey="Job Name"
            name="name-filter"
            onType={(e: string) => {
              setFilterTitle(e);
              onFilterChanged(e, selectedFilterOption);
            }}
          />
        </div>
        <div className="col-4">
          <UISelect
            labelClassName="font-weight-bold"
            options={filterOptions}
            placeholderKey="Choose"
            value={selectedFilterOption}
            onChange={(e: { value: string; label: string }) => {
              setSelectedFilterOption(e);
              onFilterChanged(filterTitle, e);
            }}
          />
        </div>
      </div>
    );
  }, [filterOptions, filterTitle, onFilterChanged, selectedFilterOption]);

  return { filteredValues, isFiltered, renderFilter };
}
