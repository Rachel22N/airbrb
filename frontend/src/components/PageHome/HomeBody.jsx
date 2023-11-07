import React from 'react';

import HomeSearchGroup from './HomeSearchGroup';
import HomeListing from './HomeListing';

// TODO: HomeBody
function HomeBody () {
  // props
  // style

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <HomeSearchGroup />
      <HomeListing />
    </div>
  )
}

export default HomeBody;
