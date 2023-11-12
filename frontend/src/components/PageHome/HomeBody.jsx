import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { HomeSearchGroup } from './HomeSearchGroup';
import { HomeSearchProvider } from './HomeSearchContext';
import HomeListing from './HomeListing';

// TODO: HomeBody
function HomeBody () {
  // props

  return (
    <HomeSearchProvider>
      <Container fluid>
        <Row className='min-vh-100'>
          <Col xs={0} md={4} className='border-end py-5'><HomeSearchGroup /></Col>
          <Col className='bg-secondary-subtle p-2'><HomeListing /></Col>
        </Row>
      </Container>
    </HomeSearchProvider>
  )
}

export default HomeBody;
