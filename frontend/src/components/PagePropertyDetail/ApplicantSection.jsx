import React, { useState, useEffect } from 'react';
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
  const [lastAccepted, setLastAccepted] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [loadComplete, setLoadComplete] = useState(false);

  const navigate = useNavigate();

  // private: make a book
  function MakeBooking () {
    const days = ((dateEnd - dateStart) / 86400000) > 0 ? Math.round((dateEnd - dateStart) / 86400000) : 1;
    bookCreate(token, pid, { start: dateStart, end: dateEnd }, days * price)
      .then((res) => navigate(`/response/success/${pid}`))
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
      })
  }

  // def: return last accepted booking id of this property
  useEffect(() => {
    Promise.allSettled(bookGet(token)
      .then((res) => {
        const bookings = res.bookings.filter((x) => x.owner === uemail && x.listingId === pid && x.status === 'accepted');
        if (bookings.length) setLastAccepted(bookings[0].id);
      })
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
        return -1;
      })).finally(() => setLoadComplete(true))
  }, [token])

  if (!loadComplete) return (<>Please Wait...</>)

  if (!token || !uemail) {
    return (
      <Container fluid className='bg-body-secondary'>
        <Row className='mb-5 py-2'>
          <Col>
            <h5>Login to Make A Booking</h5>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container fluid className='bg-body-secondary'>
      <Row className='mb-5 py-2'><Col>
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
        <Row className='align-items-center'>
          <Col sm='6' className='d-grid'><Button variant='outline-primary' onClick={() => MakeBooking()}>Book</Button></Col>
          <Col sm='6'>Total Payment: <section className='fs-2'>${
            dateStart.getTime() === new Date(0).getTime() && dateEnd.getTime() === new Date(2099, 12, 31).getTime()
              ? 0
              : Math.round((dateEnd - dateStart) / 86400000) > 0
                ? Math.round((dateEnd - dateStart) / 86400000) * price
                : price
          }</section></Col>
        </Row>
      </Col></Row>
      <Row className='mb-5'>
        <ApplicantBooking pid={pid} />
      </Row>
      <Row>
        <ApplicantReview pid={pid} bid={lastAccepted} />
      </Row>
    </Container>
  )
}

export default ApplicantSection;
