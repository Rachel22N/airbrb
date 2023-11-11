import { React, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

import { bookGet } from '../../apis';

function ApplicantBooking (props) {
  // props
  const { token, uemail } = props;

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
