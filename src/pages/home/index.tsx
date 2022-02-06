import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { UIInput } from '@/components/input';
import { UIButton } from '@/components/button';
import { UISelect } from '@/components/select';
import { CreateJobFormComponent } from '@/components/create-job-form';
import { ICreateJobRequest } from '@/utils/api/api-models';

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
      </div>
    </>
  );
}

const PureHomePage = React.memo(HomePage);

export { PureHomePage as HomePage };
