import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '@/pages';
import { FooterComponent } from '@/components/footer';
import { HeaderComponent } from '@/components/header';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes />
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
