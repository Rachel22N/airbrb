import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PageHome from './components/PageHome';
import PageDashboard from './components/PageDashboard';
import PagePropertyDetail from './components/PagePropertyDetail';
import PagePropertyEdit from './components/PagePropertyEdit';

// TODO: routers
function Airbrb () {
  return (
    <>
      <Routes>
        <Route path='/' element={<PageHome />} />
        <Route path="/dashboard" element={<PageDashboard />} />
        <Route path='/property/new' element={<PagePropertyEdit />} />
        <Route path='/property/:listingId' element={<PagePropertyDetail />} />
        <Route path='/property/edit/:listingId' element={<PagePropertyEdit />} />
      </Routes>
    </>
  )
}

export default Airbrb;
