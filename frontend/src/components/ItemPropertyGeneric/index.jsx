// this component is for listing item display on homepage

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate as navigate } from 'react-router-dom';

function ItemPropertyGeneric (props) {
  const { pid, title, thumb, price, reviews } = props;

  return (
    <Card>
      <Card.Img variant='top' src={thumb} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>#{pid}</Card.Subtitle>
        <Card.Text><h2>${price}</h2>{reviews.length} Reviews</Card.Text>
        <Button variant='primary' onClick={navigate(`listings/${pid}`)}>Learn More</Button>
      </Card.Body>
    </Card>
  )
}

export default ItemPropertyGeneric;
