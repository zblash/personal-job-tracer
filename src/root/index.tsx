import * as React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import App from '@/app/index';

import i18n from '@/i18n';

const rootEl = document.getElementById('root');

render(
  <>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </>,
  rootEl,
);
