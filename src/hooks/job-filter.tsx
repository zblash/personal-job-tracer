import React from 'react';
import { useStateFromProp } from '@/utils/hooks';
import { UIInput } from '@/components/input';
import { UISelect } from '@/components/select';
import { ArrayUtils } from '@/utils/arrays';
import { ICreateJobRequest, IPrioritySelectRequest } from '@/utils/api/api-models';

export function useJobFilter(values: ICreateJobRequest[], options: IPrioritySelectRequest[] = []) {
  const filterOptions = React.useMemo(() => {
    const placeholder = [{ value: 'All', label: 'Priority (All)' }];

    return placeholder.concat(options);
  }, [options]);

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
        <div className="col-12 col-md-8 col-lg-8 col-xl-8 mb-3">
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
        <div className="col-12 col-md-4 col-lg-4 col-xl-4">
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
