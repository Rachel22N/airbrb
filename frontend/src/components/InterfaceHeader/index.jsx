import React from 'react';
// import { useNavigate as navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Logo from './logo.png';

function InterfaceHeader (props) {
  // props
  const { uemail } = props

  return (
    <Navbar expand='lg'>
      <Container>
        <Navbar.Brand href='/'><img src={Logo} alt='AirBrB logo' style={{ height: '70%' }} /></Navbar.Brand>
        <Nav>
        {
          // depend on if user logined
          uemail
            ? <>
              <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
              <Nav.Link href='/'>Logout</Nav.Link>
            </>
            : <Nav.Link href='/login'>Login/Register</Nav.Link>
        }
        </Nav>
      </Container>
    </Navbar>
  )
}

export default InterfaceHeader;
