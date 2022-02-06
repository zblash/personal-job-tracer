import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { UIInput } from '@/components/input';
import { UIButton } from '@/components/button';
import { UISelect } from '@/components/select';

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
      <UISelect labelKey="Test Select Label" options={options} />
      <UIButton onClick={() => {}} className="btn btn-primary">
        Create
      </UIButton>
    </>
  );
}

const PureHomePage = React.memo(HomePage);

export { PureHomePage as HomePage };
