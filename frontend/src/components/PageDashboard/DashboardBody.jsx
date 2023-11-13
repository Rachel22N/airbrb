import React from 'react';
import { useNavigate as navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-dom/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DashboardListing from './DashboardListing';

function DashboardBody () {
  // todo: your money earned
  return (
    <Container fluid>
      <Row>
        <Col>TODO: See how much money you made</Col>
      </Row>
      <Row>
        <Col><Button variant='primary' size='lg' onClick={() => navigate('/listings/new')}>Create A New Listing</Button></Col>
      </Row>
      <Row>
        <Col className='bg-secondary-subtle p-2'>
          <DashboardListing />
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardBody;
