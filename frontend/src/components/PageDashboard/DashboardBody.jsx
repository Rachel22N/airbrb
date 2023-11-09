import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DashboardListing from './DashboardListing';

// TODO: DashboardBody
function DashboardBody () {
  // props
  // style

  return (
    <Container fluid>
      <Row>
        <Col>
          <DashboardListing />
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardBody;
