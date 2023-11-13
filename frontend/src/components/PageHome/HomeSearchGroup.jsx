import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useSearchContext } from './HomeSearchContext';

// TODO: further actions
export function HomeSearchGroup () {
  // filter global state
  const [text, setText] = useState('');
  const [nBed, setNbed] = useState(0);
  const [dateStart, setDateStart] = useState(new Date(0));
  const [dateEnd, setDateEnd] = useState(new Date(2099, 12, 31));
  const [priceStart, setPriceStart] = useState(0);
  const [priceEnd, setPriceEnd] = useState(Infinity);
  const [sortRate, setSortRate] = useState('highest');
  const { searchConditions, setSearchConditions } = useSearchContext();

  console.log(searchConditions);

  // update search conditions
  function updateSearch () {
    setSearchConditions({ text, nBed, dateStart, dateEnd, priceStart, priceEnd, sortRate })
  }

  // useEffect(() => {
  //   updateSearch()
  // }, [text, nBed, dateStart, dateEnd, priceStart, priceEnd, sortRate])

  return (
    <Container fluid id='home-searchgroup'>
      <Form.Group as={Row} className='mb-3' controlId='home-searchgroup-general'>
      <Form.Label column sm='3'>Keyword</Form.Label>
        <Col sm='9'><Form.Control type='text' placeholder='Search' onChange={e => setText(e.target.value)} /></Col>
      </Form.Group>
      <br />
      <h5>Facility</h5>
      <Form.Group as={Row} className='mb-3' controlId='home-searchgroup-nbed'>
        <Form.Label column sm='2'>Beds</Form.Label>
        <Col sm='10'><Form.Select onChange={e => setNbed(parseInt(e.target.value))} defaultValue='1'>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </Form.Select></Col>
      </Form.Group>
      <br />
      <h5>Available Range</h5>
      <Form.Group as={Row} className='mb-3'>
        <Form.Label column sm='2' htmlFor='home-searchgroup-date-start'>From</Form.Label>
        <Col sm='10'><Form.Control type='date' id='home-searchgroup-date-start' className='form-control' onChange={e => setDateStart(new Date(e.target.value))} /></Col>
      </Form.Group>
      <Form.Group as={Row} className='mb-3'>
        <Form.Label column sm='2' htmlFor='home-searchgroup-date-end'>To</Form.Label>
        <Col sm='10'><Form.Control type='date' id='home-searchgroup-date-end' className='form-control' onChange={e => setDateEnd(new Date(e.target.value))} /></Col>
      </Form.Group>
      <br />
      <h5>Price Range</h5>
      <Form.Group as={Row} className='mb-3'>
        <Form.Label column sm='2' htmlFor='home-searchgroup-price-start'>From</Form.Label>
        <Col sm='4'><Form.Control type='text' id='home-searchgroup-price-start' className='form-control' onChange={e => setPriceStart(parseInt(e.target.value))} /></Col>
        <Form.Label column sm='2' htmlFor='home-searchgroup-price-end'>To</Form.Label>
        <Col sm='4'><Form.Control type='text' id='home-searchgroup-price-end' className='form-control' onChange={e => setPriceEnd(parseInt(e.target.value))} /></Col>
      </Form.Group>
      <br />
      <h5>Rating</h5>
      <Form.Group as={Row} className='mb-3' controlId='home-searchgroup-sortrate'>
        <Form.Label column sm='2'>SortBy</Form.Label>
        <Col sm='10'><Form.Select className='form-select' onChange={e => setSortRate(e.target.value.toLowerCase())} defaultValue='Highest'>
          <option>Highest</option>
          <option>Lowest</option>
        </Form.Select></Col>
      </Form.Group>
      <br />
      <Row><Col className='d-grid'><Button variant='primary' onClick={() => updateSearch()}>Filter</Button></Col></Row>
    </Container>
  )
}

export default HomeSearchGroup;
