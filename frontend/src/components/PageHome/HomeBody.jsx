import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import HomeSearchGroup from './HomeSearchGroup';
import HomeListing from './HomeListing';

// TODO: HomeBody
function HomeBody () {
  // props

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={0}><HomeSearchGroup /></Col>
      </Row>
      <Row>
        <Col xs={0} md={4}><HomeSearchGroup /></Col>
        <Col><HomeListing /></Col>
      </Row>
    </Container>
  )
}

export default HomeBody;
