// this component is for listing item display on homepage

import React from 'react';
import Card from 'react-bootstrap/Card';

function ItemPropertyGeneric (props) {
  // TODO: props
  const { pid, title, thumb, price, reviews } = props;

  return (
    <Card>
      <Card.Img variant='top' src={thumb} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>#{pid}</Card.Subtitle>
        <Card.Text><h2>${price}</h2>{reviews.length} Reviews</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ItemPropertyGeneric;
