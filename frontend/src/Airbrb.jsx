import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import PageHome from './components/PageHome';
import LoginForm from './components/LoginRegister/LoginForm'
import RegisterForm from './components/LoginRegister/Register'
import PageDashboard from './components/PageDashboard';
import PagePropertyDetail from './components/PagePropertyDetail';
import PagePropertyEdit from './components/PagePropertyEdit';
import PageManage from './components/PageManage';
import PageResponseSuccess from './components/PageResponseSuccess';

// TODO: routers
function Airbrb () {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <>
      <Routes>
        <Route path='/' element={<PageHome />} />
        <Route path='/login' element={<LoginForm setToken={setToken} />}/>
        <Route path='/register' element={<RegisterForm setToken={setToken} />}/>
        <Route path="/dashboard" element={<PageDashboard />} />
        <Route path='/property/new' element={<PagePropertyEdit />} />
        <Route path='/property/:listingId' element={<PagePropertyDetail />} />
        <Route path='/property/edit/:listingId' element={<PagePropertyEdit />} />
        <Route path='/property/manage/:listingId' element={<PageManage />} />
        <Route path='/response/success/:listingId' element={<PageResponseSuccess />} />
      </Routes>
    </>
  )
}

export default Airbrb;
