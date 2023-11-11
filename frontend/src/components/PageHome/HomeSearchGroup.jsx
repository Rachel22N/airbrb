import React, { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// filter global state
const [text, setText] = useState('');
const [nBed, setNbed] = useState(0);
const [dateStart, setDateStart] = useState(new Date(0));
const [dateEnd, setDateEnd] = useState(new Date(2099, 12, 31));
const [priceStart, setPriceStart] = useState(0);
const [priceEnd, setPriceEnd] = useState(Infinity);
const [sortRate, setSortRate] = useState('highest');

// TODO: further actions
function HomeSearchGroup () {
  // props

  return (
    <Container id='home-searchgroup'>
      <Form.Group as={Row} className='mb-3' controlId='home-searchgroup-general'>
        <Col sm='8'><Form.Control type='text' placeholder='Seach' onChange={e => setText(e.target.value)} /></Col>
        <Col sm='2'><Button variant='primary'>Search</Button></Col>
      </Form.Group>
      <br />
      <h5>Facility</h5>
      <Form.Group as={Row} className='mb-3' controlId='home-searchgroup-nbed'>
        <Form.Label column sm='2'>Beds</Form.Label>
        <Col sm='10'><Form.Select onChange={e => setNbed(parseInt(e.target.value))}>
          <option selected>1</option>
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
        <Col sm='10'><Form.Select className='form-select' onChange={e => setSortRate(e.target.value.toLowerCase())}>
          <option selected>Highest</option>
          <option>Lowest</option>
        </Form.Select></Col>
      </Form.Group>
      <br />
      <Button variant='primary'>Filter</Button>
    </Container>
  )
}

// filter context
export const FilterContext = createContext(null);

export function FilterProvider ({ children }) {
  const filters = {
    text, nBed, dateStart, dateEnd, priceStart, priceEnd, sortRate
  }
  return (
    <HomeSearchGroup.Provider value={filters}>{children}</HomeSearchGroup.Provider>
  )
}

export default HomeSearchGroup;
