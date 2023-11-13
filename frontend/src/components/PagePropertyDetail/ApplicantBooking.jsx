import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

import { bookGet } from '../../apis';

function ApplicantBooking () {
  // props
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
        setBlist(res.bookings.filter((x) => x.owner === uemail));
      })
      .catch((res) => {
        setAlertToken(true);
      })).finally(() => setLoadComplete(true))
  }, [token])

  if (!loadComplete) return (<>Nothing to Display...</>)

  return (
    <>
      { alertToken && <Alert variant='danger' onClose={() => setAlertToken(false)} dismissible>Invalid Token</Alert> }
      <ListGroup>
        {
          blist &&
          blist.map((x, idx) =>
            <ListGroup.Item key={idx}>{new Date(x.dateRange.start).toDateString()} -- {new Date(x.dateRange.end).toDateString()}</ListGroup.Item>
          )
        }
      </ListGroup>
    </>
  )
}

export default ApplicantBooking;
