import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { UIInput } from '@/components/input';
import { UIButton } from '@/components/button';
import { UISelect } from '@/components/select';
import { CreateJobFormComponent } from '@/components/create-job-form';
import { ICreateJobRequest } from '@/utils/api/api-models';
import { UITableComponent } from '@/components/table';
import { VscEdit, VscTrash } from 'react-icons/vsc';
function HomePage() {
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
  const values = [
    { jobTitle: 'Urgent', priority: 'Acil' },
    { jobTitle: 'Urgent', priority: 'Acil' },
    { jobTitle: 'Urgent', priority: 'Acil' },
    { jobTitle: 'Urgent', priority: 'Acil' },
  ];
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
                sortType: 'desc',
              },
              {
                Header: 'Priority',
                accessor: 'priority',
                sort: true,
                sortType: 'desc',
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
              console.log(e);
            }}
            onSortTypeChange={e => {
              console.log(e);
            }}
          />
        </div>
      </div>
    </>
  );
}

const PureHomePage = React.memo(HomePage);

export { PureHomePage as HomePage };
