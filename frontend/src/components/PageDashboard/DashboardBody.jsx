import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DashboardListing from './DashboardListing';

function DashboardBody () {
  return (
    <Container fluid>
      <Row className='p-5'>
        <Link to='/property/new'><Col className='d-grid'><Button variant='primary'>Create A New Listing</Button></Col></Link>
      </Row>
      <Row className='min-vh-100'>
        <Col className='bg-secondary-subtle p-2'>
          <DashboardListing />
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardBody;
