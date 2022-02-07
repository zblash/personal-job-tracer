import * as React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
import App from '@/app/index';

import i18n from '@/i18n';

const rootEl = document.getElementById('root');
Modal.setAppElement('#modal-root');
render(
  <>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </>,
  rootEl,
);
