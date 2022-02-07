import * as React from 'react';
import { UIButton } from '@/components/button';
import { CreateJobFormComponent } from '@/components/create-job-form';
import { ICreateJobRequest } from '@/utils/api/api-models';
import { UITableComponent } from '@/components/table';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { ArrayUtils } from '@/utils/arrays';

function HomePage() {
  const [sortType, setSortType] = React.useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = React.useState('');
  const [values, setValues] = React.useState([
    { jobTitle: 'adaylarla ilgili teknik odev hazirlamam gerekiyor', priority: 'Urgent' },
    { jobTitle: 'yapilan islere ilgili activity kayitlari olusturmak', priority: 'Trivial' },
    { jobTitle: 'teknik tasklari planlayacagim', priority: 'Regular' },
  ]);
  /*
  HomePage Lifecycle
  */

  /*
  HomePage Functions
  */
  const options = [
    { value: 'Urgent', label: 'Acil' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Low', label: 'Az' },
  ];

  React.useEffect(() => {
    if (sortType === 'asc') {
      setValues(ArrayUtils.sortAsc(values, sortBy));
    } else {
      setValues(ArrayUtils.sortDesc(values, sortBy));
    }
  }, [sortType, sortBy]);

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
                      <UIButton>
                        <VscEdit />
                      </UIButton>
                      <UIButton>
                        <VscTrash />
                      </UIButton>
                    </>
                  );
                },
              },
            ]}
            data={values}
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
