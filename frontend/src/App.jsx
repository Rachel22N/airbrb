import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Airbrb from './Airbrb';

import './App.css';

function App () {
  return (
    <>
      <BrowserRouter>
        <Airbrb />
      </BrowserRouter>
    </>
  );
}

export default App;
