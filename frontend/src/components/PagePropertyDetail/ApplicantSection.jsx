import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

import ApplicantBooking from './ApplicantBooking';
import ApplicantReview from './ApplicantReview';
import { bookGet, bookCreate } from '../../apis';

function ApplicantSection (props) {
  // props
  const token = localStorage.getItem('token');
  const uemail = localStorage.getItem('userId');
  const { pid, price } = props;

  // state
  const [dateStart, setDateStart] = useState(new Date(0));
  const [dateEnd, setDateEnd] = useState(new Date(2099, 12, 31));
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const navigate = useNavigate();

  // private: make a book
  function MakeBooking () {
    const days = (dateEnd.getTime() - dateStart.getTime()) / 86400000;
    bookCreate(token, pid, { start: dateStart, end: dateEnd }, days * price)
      .then((res) => navigate('/'))
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
      })
  }

  // def: return last accepted booking id of this property
  function whichBooking () {
    bookGet(token)
      .then((res) => {
        const bookings = res.bookings.filter((x) => x.owner === uemail && x.listingId === pid && x.status === 'accepted');
        if (bookings.length) return bookings[0].id; else return -1;
      })
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
        return -1;
      })
  }

  return (
    <Container>
      <h5>Book A Session</h5>
      { alert && <Alert variant='danger' onClose={() => setAlert(false)} dismissible>{alertMsg}</Alert> }
      <Form.Group as={Row} className='mb-3'>
        <Form.Label column sm='2'>From</Form.Label>
        <Col sm='10'><Form.Control type='date' className='form-control' onChange={e => setDateStart(new Date(e.target.value))} /></Col>
      </Form.Group>
      <Form.Group as={Row} className='mb-3'>
        <Form.Label column sm='2'>To</Form.Label>
        <Col sm='10'><Form.Control type='date' className='form-control' onChange={e => setDateEnd(new Date(e.target.value))} /></Col>
      </Form.Group>
      <Button variant='primary' onClick={() => MakeBooking()}>Book</Button>
      <br />
      <h5>My Bookings</h5>
      <ApplicantBooking />
      <h5>Leave A Review</h5>
      <ApplicantReview token={token} uemail={uemail} pid={pid} bid={whichBooking()} />
    </Container>
  )
}

export default ApplicantSection;
