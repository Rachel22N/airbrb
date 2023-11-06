import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PageHome from './components/PageHome';

// TODO: routers
function Airbrb () {
  return (
    <>
      <Routes>
        <Route path='/' element={<PageHome />} />
      </Routes>
    </>
  )
}

export default Airbrb;
