import React from 'react';

import InterfaceHeader from '../InterfaceHeader';
import HomeBody from './HomeBody';

function PageHome (props) {
  // props
  const { uid } = props
  // style

  return (
    <>
      <InterfaceHeader uid={uid} />
      <HomeBody />
    </>
  )
}

export default PageHome;
