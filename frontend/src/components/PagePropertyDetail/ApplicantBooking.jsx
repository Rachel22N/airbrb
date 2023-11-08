import React from 'react';

import { bookGet } from '../../apis';

import './ApplicantSection.css';

function ApplicantBooking (props) {
  // props
  const { token, uemail } = props;

  // get bookings
  function myBookings () {
    bookGet(token)
      .then((res) => {
        const bookings = res.bookings.filter((x) => x.owner === uemail);
        return bookings.map((x) => <section className='booking-iem' key={x.id}>From {x.dateRange.start} To {x.dateRange.end}</section>);
      })
      .catch((res) => {
        // todo: error popup
        alert(res);
      })
  }

  return (
    <div className='booking-container'>
      {myBookings()}
    </div>
  )
}

export default ApplicantBooking;
