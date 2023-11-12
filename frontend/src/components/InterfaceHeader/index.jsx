import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Figure from 'react-bootstrap/Figure';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { authLogout } from '../../apis';
import Logo from './logo.png';

function InterfaceHeader () {
  // props
  const token = localStorage.getItem('token');
  const uemail = localStorage.getItem('userId');

  return (
    <Navbar expand='lg' className='p-0'>
      <Container fluid className='bg-danger-subtle'>
        <Navbar.Brand href='/'><Figure.Image src={Logo} alt='AirBrB logo' height={70} /></Navbar.Brand>
        <Nav>
          <Nav.Link href='/'>Home</Nav.Link>
        {
          // depend on if user logined
          uemail
            ? <>
              <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
              <Nav.Link href='/' onClick={() => authLogout(token)}>Logout</Nav.Link>
            </>
            : <Nav.Link href='/login'>Login/Register</Nav.Link>
        }
        </Nav>
      </Container>
    </Navbar>
  )
}

export default InterfaceHeader;
