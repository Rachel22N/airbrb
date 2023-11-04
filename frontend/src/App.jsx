import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Airbrb from './Airbrb'

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
