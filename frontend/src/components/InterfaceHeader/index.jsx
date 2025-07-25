import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  // private: logout
  function go () {
    authLogout(token);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  }

  return (
    <Navbar expand="lg" bg="light" className="p-0">
      <Container fluid className="bg-danger-subtle">
        <Navbar.Brand href="/">
          <Figure.Image src={Logo} alt="AirBrB logo" height={70} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {
              uemail && token
                ? (
                <>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/" onClick={() => go()}>
                    Logout
                  </Nav.Link>
                </>
                  )
                : (
                <Nav.Link href="/login">Login/Register</Nav.Link>
                  )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default InterfaceHeader;
