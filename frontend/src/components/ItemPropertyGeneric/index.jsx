// this component is for listing item display on homepage

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ItemPropertyGeneric (props) {
  const { pid, title, thumb, price, reviews, status } = props;

  return (
    <Card className='my-2'>
      <Card.Img variant='top' height={200} src={thumb} className='object-fit-cover' alt={`Cover image of property ${title}`} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>#{pid}</Card.Subtitle>
        <Card.Text className='fs-2'>${price}</Card.Text>
        <Card.Text>{reviews.length} Reviews</Card.Text>
        { status === 'accepted'
          ? <Card.Text className='text-success'>ACCEPTED</Card.Text>
          : status === 'pending'
            ? <Card.Text className='text-warning'>PENDING</Card.Text>
            : <></>
        }
        <Link to={`property/${pid}`}><Button variant='primary'>Learn More</Button></Link>
      </Card.Body>
    </Card>
  )
}

export default ItemPropertyGeneric;
