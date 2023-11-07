import React from 'react';
import { useNavigate as navigate } from 'react-router-dom';

import HeaderButton from './HeaderButton';

function InterfaceHeader (props) {
  // props
  const { uid } = props
  // style
  const cssHeaderContainer = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'navy',
    margin: '0',
    padding: '0 10px',
    height: '40px'
  }
  const cssHeaderButton = {
    height: '100%',
    padding: '0 10px'
  }

  return (
    <div style={cssHeaderContainer}>
      <img src='/assets/logo.png' alt='AirBrB logo' style={{ height: '70%' }} />
      <section style={{ flex: '1' }}></section>
      {
        // depend on if user logined
        uid
          ? <>
            <section style={cssHeaderButton}>
              <HeaderButton innerText='Dashboard' action={navigate('/dashboard')} />
            </section>
            <section style={cssHeaderButton}>
              <HeaderButton innerText='Logout' action={
                navigate('/')
              } />
            </section>
          </>
          : <section style={cssHeaderButton}>
            <HeaderButton innerText='Login/Sign Up' action={navigate('/login')} />
          </section>
      }
    </div>
  )
}

export default InterfaceHeader;
