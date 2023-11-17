import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InterfaceHeader from '../InterfaceHeader';
import { listDetail, bookGet, bookAccept, bookDecline } from '../../apis';
import 'bootstrap/dist/css/bootstrap.min.css';

function PageManage () {
  const { listingId } = useParams();
  const [listingDetails, setListingDetails] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();
  const userToken = localStorage.getItem('token');
  useEffect(() => {
    listDetail(listingId)
      .then(data => {
        console.log(data);
        console.log(data.postedOn);
        setListingDetails(data);
      })
      .catch(err => console.error('Error fetching listing details: ', err));

    bookGet(userToken)
      .then(data => {
        console.log(data);
        setBookingDetails(data);
      })
      .catch(err => console.error('Error fetching booking data: ', err));
  }, [listingId]);

  // calculate the number of the date from posted
  const calculateDaysSinceLaunch = () => {
    if (listingDetails && listingDetails.listing && listingDetails.listing.postedOn) {
      const launchDate = new Date(listingDetails.listing.postedOn);
      const today = new Date();
      return Math.floor((today - launchDate) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotalBookedDaysThisYear = () => {
    const currentYear = new Date().getFullYear();
    let totalDays = 0;

    if (bookingDetails && bookingDetails.bookings) {
      bookingDetails.bookings.forEach(booking => {
        const startDate = new Date(booking.dateRange.start);
        const endDate = new Date(booking.dateRange.end);

        // current year
        if (startDate.getFullYear() === currentYear || endDate.getFullYear() === currentYear) {
          const start = startDate.getFullYear() === currentYear ? startDate : new Date(currentYear, 0, 1);
          const end = endDate.getFullYear() === currentYear ? endDate : new Date(currentYear, 11, 31);

          // calculate the number of the date (include the end date)
          const days = (end - start) / (1000 * 60 * 60 * 24) + 1;
          totalDays += days;
        }
      });
    }

    return totalDays;
  };

  const handleAccept = async (bookingId) => {
    try {
      const response = await bookAccept(userToken, bookingId);
      console.log('accept success', response);
      // alert('accept success');
      const updatedBookingDetails = await bookGet(userToken);
      setBookingDetails(updatedBookingDetails);
    } catch (error) {
      console.error('Error accepting booking:', error);
      alert('Error accepting booking:', error);
    }
  };

  const handleDecline = async (bookingId) => {
    try {
      const response = await bookDecline(userToken, bookingId);
      console.log('decline success', response);
      alert('decline success');
      const updatedBookingDetails = await bookGet(userToken);
      setBookingDetails(updatedBookingDetails);
    } catch (error) {
      console.error('Error declining booking:', error);
      alert('Error declining booking:', error);
    }
  };
  const isThisBooking = (booking) => { return booking.listingId === listingId }
  const pendingBookings =
    bookingDetails?.bookings.filter(
      (booking) =>
        booking.status !== 'accepted' &&
        booking.status !== 'declined' &&
        isThisBooking(booking)
    ) || [];
  const processedBookings =
    bookingDetails?.bookings.filter(
      (booking) =>
        (booking.status === 'accepted' || booking.status === 'declined') &&
        isThisBooking(booking)
    ) || [];

  return (
    <div>
      <InterfaceHeader />
      <button onClick={() => navigate('/dashboard')} className='btn btn-outline-danger m-3'>
        Back
      </button>
      <div className='container'>
        <h1 className='my-3 font-weight-bold'>{listingDetails ? listingDetails.listing.title : 'Loading...'}</h1>
        <p className='my-3'>Address: {listingDetails
          ? `${listingDetails.listing.address.street}, ${listingDetails.listing.address.city}, ${listingDetails.listing.address.state}, ${listingDetails.listing.address.postcode}, ${listingDetails.listing.address.country}`
          : 'Loading...'}</p>
        <p className='mb-3'>This property has been up online for {calculateDaysSinceLaunch()} days</p>
        <p className='mb-3'>This year the property has been booked for: {calculateTotalBookedDaysThisYear()} days</p>
        <div>
          <h2 className='my-3'>Booking Details</h2>
          {pendingBookings.length > 0
            ? (
                pendingBookings.map(booking => (
                  <div key={booking.id} className='card mb-3'>
                    <div className='card-body'>
                      <p className='card-text'>Booking id: {booking.id}</p>
                      <p className='card-text'>Date between: {new Date(booking.dateRange.start).toLocaleDateString()} to {new Date(booking.dateRange.end).toLocaleDateString()}</p>
                      <p className='card-text'>Total price: ${booking.totalPrice}</p>
                      <p className='card-text'>Status: {booking.status}</p>
                      <div>
                        <button onClick={() => handleAccept(booking.id)} className='btn btn-outline-success m-1'>Accept</button>
                        <button onClick={() => handleDecline(booking.id)} className='btn btn-outline-danger m-1'>Decline</button>
                      </div>
                    </div>
                  </div>
                ))
              )
            : (
              <p>No booking message</p>
              )}
        <div>
          <h2 className='my-3'>Booking History</h2>
          {processedBookings.length > 0
            ? (
                processedBookings.map(booking => (
                  <div key={booking.id} className='card mb-3'>
                    <div className='card-body'>
                      <p className='card-text'>Booking id: {booking.id}</p>
                      <p className='card-text'>Date between: {new Date(booking.dateRange.start).toLocaleDateString()} to {new Date(booking.dateRange.end).toLocaleDateString()}</p>
                      <p className='card-text'>Total price: ${booking.totalPrice}</p>
                      <p className='card-text'>Booking has been {booking.status}</p>
                    </div>
                  </div>
                ))
              )
            : (
              <p>No history booking messages</p>
              )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default PageManage;
