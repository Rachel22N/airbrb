// this component is for listing item display on homepage

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ItemPropertyHosted (props) {
  // TODO: props
  const { pid, title, ptype, nbed, nbath, thumb, price, reviews, published } = props;

  // calculate avg rate
  let rateSun = 0;
  reviews.forEach(x => { rateSun += x.rate });
  const rateAvg = rateSun / reviews.length;

  return (
    <Card>
      <Card.Img variant='top' src={thumb} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>#{pid}</Card.Subtitle>
        <Card.Text>
          <h6>{ptype}</h6>
          <br />&#xF586; {rateAvg}
          <br />{nbed} Bedroom {nbath} Bathroom
          <h2>${price}</h2>
          {reviews.length} Reviews
        </Card.Text>
        <Button variant='primary'>Edit</Button>
        <Button variant='primary'>Manage Booking</Button>
        {
          published
            ? <Button variant='primary'>Unpublish</Button>
            : <Button variant='primary'>Publish</Button>
        }
        <Button variant='primary'>Remove</Button>
      </Card.Body>
    </Card>
  )
}

export default ItemPropertyHosted;
