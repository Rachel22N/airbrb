import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import ApplicantBooking from './ApplicantBooking';
import ApplicantReview from './ApplicantReview';
import { bookGet } from '../../apis';

function ApplicantSection (props) {
  // props
  const { token, uemail, pid } = props;

  // def: return last accepted booking id of this property
  function whichBooking () {
    bookGet(token)
      .then((res) => {
        const bookings = res.bookings.filter((x) => x.owner === uemail && x.listingId === pid && x.status === 'accepted');
        if (bookings.length) return bookings[0].id; else return -1;
      })
      .catch((res) => {
        // todo: error popup
        alert(res);
      })
  }

  return (
    <Container>
      <h5>Book A Session</h5>
      <Form.Group as={Row} className='mb-3'>
        <Form.Label column sm='2'>From</Form.Label>
        <Col sm='10'><Form.Control type='date' className='form-control' /></Col>
      </Form.Group>
      <Form.Group as={Row} className='mb-3'>
        <Form.Label column sm='2'>To</Form.Label>
        <Col sm='10'><Form.Control type='date' className='form-control' /></Col>
      </Form.Group>
      <Button variant='primary'>Book</Button>
      <br />
      <h5>My Bookings</h5>
      <ApplicantBooking token={token} uemail={uemail} />
      <h5>Leave A Review</h5>
      <ApplicantReview token={token} uemail={uemail} pid={pid} bid={whichBooking()} />
    </Container>
  )
}

export default ApplicantSection;
