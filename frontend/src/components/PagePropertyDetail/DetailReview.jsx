import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

function DetailReview (props) {
  // props
  const { reviews } = props;
  const r5 = reviews.filter(x => x.rate === 5);
  const r4 = reviews.filter(x => x.rate === 4);
  const r3 = reviews.filter(x => x.rate === 3);
  const r2 = reviews.filter(x => x.rate === 2);
  const r1 = reviews.filter(x => x.rate === 1);

  // state
  const [show, setShow] = useState(false);
  const [showWhat, setShowWhat] = useState([]);

  function handleClose () {
    setShowWhat([]);
    setShow(false);
  }
  function handleShow (target) {
    setShowWhat(target);
    setShow(true);
  }

  let rateSun = 0;
  let rateAvg = 0;
  if (reviews.length) {
    reviews.forEach(x => { rateSun += x.rate });
    rateAvg = rateSun / reviews.length;
  }

  return (
    <Container fluid>
      <Row>
        <h5>Reviews</h5>
        <Col>
          <section className='d-inline ms-3 me-5'>Scored</section>
          <section className='d-inline text-warning fs-1 me-2' onMouseOver={() => setShow(true)}>&#10030;</section>
          <section className='d-inline fs-2'>{rateAvg}</section>
        </Col>
      </Row>
      <Row>
        <Col><ListGroup variant='flush'>
          { reviews && reviews.map((x, idx) =>
            <ListGroup.Item key={idx}>
              <b>{x.user}</b>
              <section>&#10030; {x.rate}</section>
              <section>{x.review}</section>
            </ListGroup.Item>
          ) }
        </ListGroup></Col>
      </Row>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Rating Specific</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container fluid className='mb-5'>
            <Row className='align-items-center'>
              <Col><Button onClick={() => handleShow(r5)}>&#10030;5</Button></Col>
              <Col>{Math.round(r5.length / reviews.length * 100)}%</Col>
              <Col>{r5.length}</Col>
            </Row>
            <Row className='align-items-center'>
              <Col><Button onClick={() => handleShow(r4)}>&#10030;4</Button></Col>
              <Col>{Math.round(r4.length / reviews.length * 100)}%</Col>
              <Col>{r4.length}</Col>
            </Row>
            <Row className='align-items-center'>
              <Col><Button onClick={() => handleShow(r3)}>&#10030;3</Button></Col>
              <Col>{Math.round(r3.length / reviews.length * 100)}%</Col>
              <Col>{r3.length}</Col>
            </Row>
            <Row className='align-items-center'>
              <Col><Button onClick={() => handleShow(r2)}>&#10030;2</Button></Col>
              <Col>{Math.round(r2.length / reviews.length * 100)}%</Col>
              <Col>{r2.length}</Col>
            </Row>
            <Row className='align-items-center'>
              <Col><Button onClick={() => handleShow(r1)}>&#10030;1</Button></Col>
              <Col>{Math.round(r1.length / reviews.length * 100)}%</Col>
              <Col>{r1.length}</Col>
            </Row>
          </Container>
          <ListGroup variant='flush'>
            { showWhat.length && showWhat.map((x, idx) =>
              <ListGroup.Item key={idx}>
                <b>{x.user}</b>
                <section>&#10030; {x.rate}</section>
                <section>{x.review}</section>
              </ListGroup.Item>
            ) }
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}

export default DetailReview;
