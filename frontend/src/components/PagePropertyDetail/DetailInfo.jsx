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
      <Row><Col><h3>${price}</h3></Col></Row>
      <Row>
        <Col>
          <section className='detailinfo-infoframe'>
            <section>
              <section className='detailinfo-title'>{title}</section>
              <section className='detailinfo-type'>{ptype}</section>
            </section>
            <section className='detailinfo-addr'>{addr}</section>
            <section className='detailinfo-facility'>{nbed} Bed {nbath} Bathroom {nroom} Room</section>
          </section>
        </Col>
        <Col xs={0} md={3}><h3>${price}</h3></Col>
      </Row>
    </Container>
  )
}

export default DetailInfo;
