// this component is for listing item display on homepage

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ItemPropertyGeneric (props) {
  const { pid, title, thumb, price, reviews } = props;

  return (
    <Card>
      <Card.Img variant='top' src={thumb} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>#{pid}</Card.Subtitle>
        <Card.Text className='fs-2'>${price}</Card.Text>
        <Card.Text>{reviews.length} Reviews</Card.Text>
        <Link to={`property/${pid}`}><Button variant='primary'>Learn More</Button></Link>
      </Card.Body>
    </Card>
  )
}

export default ItemPropertyGeneric;
