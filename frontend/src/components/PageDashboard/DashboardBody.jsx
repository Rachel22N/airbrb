import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DashboardListing from './DashboardListing';

// TODO: income view?
function DashboardBody () {
  // props
  // style

  return (
    <Container fluid>
      <Row>
        <Col>TODO: See how much money you made</Col>
      </Row>
      <Row>
        <Col>
          <DashboardListing />
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardBody;
