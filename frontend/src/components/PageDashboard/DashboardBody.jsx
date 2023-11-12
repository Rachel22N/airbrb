import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <Col className='bg-secondary-subtle p-2'>
          <DashboardListing />
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardBody;
