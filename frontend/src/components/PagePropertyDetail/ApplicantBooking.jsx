import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import { bookGet } from '../../apis';

function ApplicantBooking (props) {
  // props
  const { token, uemail } = props;

  // get bookings
  function myBookings () {
    bookGet(token)
      .then((res) => {
        return res.bookings.filter((x) => x.owner === uemail);
      })
      .catch((res) => {
        // todo: error popup
        alert(res);
      })
  }
  const bList = myBookings();

  return (
    <ListGroup>
      {
        bList &&
        bList.map((x, idx) =>
          <ListGroup.Item key={idx}>From {x.dateRange.start} To {x.dateRange.end}</ListGroup.Item>
        )
      }
    </ListGroup>
  )
}

export default ApplicantBooking;
