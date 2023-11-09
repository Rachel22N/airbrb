import React from 'react';

import InterfaceHeader from '../InterfaceHeader';
import DashboardBody from './DashboardBody';

function PageDashboard (props) {
  // props
  const { uid } = props

  return (
    <>
      <InterfaceHeader uid={uid} />
      <DashboardBody />
    </>
  )
}

export default PageDashboard;
