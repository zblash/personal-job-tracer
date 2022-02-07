import * as React from 'react';
import { render } from 'react-dom';

import '@/public/app.scss';
import Modal from 'react-modal';
import App from '@/app/index';

const rootEl = document.getElementById('root');
Modal.setAppElement('#modal-root');
render(
  <>
    <App />
  </>,
  rootEl,
);
