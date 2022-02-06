import * as React from 'react';
import { useTranslation } from 'react-i18next';

function HomePage() {
  /*
  HomePage Lifecycle
  */

  /*
  HomePage Functions
  */

  return <h1>HELLO</h1>;
}

const PureHomePage = React.memo(HomePage);

export { PureHomePage as HomePage };
