import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import { bookGet } from '../../apis';

function ApplicantBooking (props) {
  // props
  const { pid } = props;
  const token = localStorage.getItem('token');
  const uemail = localStorage.getItem('userId');

  // state
  const [alertToken, setAlertToken] = useState(false);
  const [blist, setBlist] = useState([]);
  const [loadComplete, setLoadComplete] = useState(false);

  // get bookings
  useEffect(() => {
    Promise.allSettled(bookGet(token)
      .then((res) => {
        setBlist(res.bookings.filter((x) => x.owner === uemail && x.listingId === pid));
      })
      .catch((res) => {
        setAlertToken(true);
      })).finally(() => setLoadComplete(true))
  }, [token])

  if (!loadComplete) return (<>Nothing to Display...</>)

  return (
    <Container fluid>
      <Row><Col>
        <h5>My Bookings</h5>
        { alertToken && <Alert variant='danger' onClose={() => setAlertToken(false)} dismissible>Invalid Token</Alert> }
        <ListGroup>
          {
            blist &&
            blist.map((x, idx) =>
              x.status === 'accepted'
                ? <ListGroup.Item key={idx} className='bg-success-subtle'>{new Date(x.dateRange.start).toDateString()} -- {new Date(x.dateRange.end).toDateString()}</ListGroup.Item>
                : x.status === 'pending'
                  ? <ListGroup.Item key={idx} className='bg-warning-subtle'>{new Date(x.dateRange.start).toDateString()} -- {new Date(x.dateRange.end).toDateString()}</ListGroup.Item>
                  : <ListGroup.Item key={idx} className='bg-danger-subtle'>{new Date(x.dateRange.start).toDateString()} -- {new Date(x.dateRange.end).toDateString()}</ListGroup.Item>
            )
          }
        </ListGroup>
      </Col></Row>
    </Container>
  )
}

export default ApplicantBooking;
