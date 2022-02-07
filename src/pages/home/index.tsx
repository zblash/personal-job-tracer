import * as React from 'react';
import { UIButton } from '@/components/button';
import { CreateJobFormComponent } from '@/components/create-job-form';
import { ICreateJobRequest } from '@/utils/api/api-models';
import { UITableComponent } from '@/components/table';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { ArrayUtils } from '@/utils/arrays';
import { UIInput } from '@/components/input';
import { UISelect } from '@/components/select';
import { useJobFilter } from '@/hooks/job-filter';

function HomePage() {
  const options = [
    { value: 'Urgent', label: 'Acil' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Low', label: 'Az' },
  ];

  const [sortType, setSortType] = React.useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = React.useState('');
  const [values, setValues] = React.useState([
    { jobTitle: 'adaylarla ilgili teknik odev hazirlamam gerekiyor', priority: 'Urgent' },
    { jobTitle: 'leblelalsdasd', priority: 'Urgent' },
    { jobTitle: 'yapilan islere ilgili activity kayitlari olusturmak', priority: 'Trivial' },

    { jobTitle: 'waewqqe', priority: 'Trivial' },
    { jobTitle: 'teknik tasklari planlayacagim', priority: 'Regular' },
    { jobTitle: 'zxczxc', priority: 'Regular' },
  ]);

  const { filteredValues, isFiltered, renderFilter } = useJobFilter(values);
  /*
  HomePage Lifecycle
  */
  React.useEffect(() => {
    if (sortType === 'asc') {
      setValues(ArrayUtils.sortAsc(values, sortBy));
    } else {
      setValues(ArrayUtils.sortDesc(values, sortBy));
    }
  }, [sortType, sortBy]);

  /*
  HomePage Functions
  */

  return (
    <>
      <div className="container">
        <div className="col-12">
          <h4>Create New Job</h4>
        </div>
        <CreateJobFormComponent
          options={options}
          onSubmit={(e: ICreateJobRequest) => {
            console.log('Asd');
          }}
        />

        <div className="row">
          <div className="col-12">
            <h4>Job List</h4>
          </div>
          <div className="col-12">{renderFilter()}</div>
          <UITableComponent
            columns={[
              {
                Header: 'Name',
                accessor: 'jobTitle',
                sort: true,
                sortType: sortBy === 'jobTitle' ? sortType : 'desc',
              },
              {
                Header: 'Priority',
                accessor: 'priority',
                sort: true,
                sortType: sortBy === 'priority' ? sortType : 'desc',
              },
              {
                Header: 'Action',
                accessor: 'actions',
                customRenderer: (item: { jobTitle: string; priority: string }) => {
                  return (
                    <>
                      <UIButton className="btn-light">
                        <VscEdit />
                      </UIButton>
                      <UIButton className="btn-light">
                        <VscTrash />
                      </UIButton>
                    </>
                  );
                },
              },
            ]}
            data={isFiltered ? filteredValues : values}
            onSortChange={e => {
              setSortBy(e);
            }}
            onSortTypeChange={e => {
              setSortType(e);
            }}
          />
        </div>
      </div>
    </>
  );
}

const PureHomePage = React.memo(HomePage);

export { PureHomePage as HomePage };
