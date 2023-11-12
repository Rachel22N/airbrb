import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

import { bookGet } from '../../apis';

function ApplicantBooking (props) {
  // props
  const token = localStorage.getItem('token');
  const uemail = localStorage.getItem('userId');

  // state
  const [alertToken, setAlertToken] = useState(false);

  // get bookings
  function myBookings () {
    bookGet(token)
      .then((res) => {
        return res.bookings.filter((x) => x.owner === uemail);
      })
      .catch((res) => {
        setAlertToken(true);
      })
  }
  const bList = myBookings();

  return (
    <>
      { alertToken && <Alert variant='danger' onClose={() => setAlertToken(false)} dismissible>Invalid Token</Alert> }
      <ListGroup>
        {
          bList &&
          bList.map((x, idx) =>
            <ListGroup.Item key={idx}>From {x.dateRange.start} To {x.dateRange.end}</ListGroup.Item>
          )
        }
      </ListGroup>
    </>
  )
}

export default ApplicantBooking;
