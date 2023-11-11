import React from 'react';

import InterfaceHeader from '../InterfaceHeader';
import DashboardBody from './DashboardBody';

function PageDashboard (props) {
  // props
  const { token, uemail } = props

  return (
    <>
      <InterfaceHeader />
      <DashboardBody />
    </>
  )
}

export default PageDashboard;
