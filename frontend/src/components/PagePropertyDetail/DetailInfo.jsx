import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function DetailInfo (props) {
  // props
  const { title, ptype, addr, nbed, nbath, nroom, price } = props;

  return (
    <Container fluid>
      <Row>
        <Col>
          <section className='fs-2'>{title}</section>
          <b>{ptype}</b>
          <section>{addr.street} {addr.city}, {addr.state} {addr.postcode}, {addr.country}</section>
          <section>{nbed} Bed {nbath} Bathroom {nroom} Room</section>
        </Col>
        <Col xs={0} md={3} className='fs-1 text-end'>${price}</Col>
      </Row>
    </Container>
  )
}

export default DetailInfo;
