import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// TODO: further actions
function HomeSearchGroup () {
  // props
  // style
  const container = {
    padding: '20px 10px',
    width: '200px'
  }

  return (
    <section id='home-searchgroup' style={container}>
      <Form>
        <Form.Group className='mb-3' controlId='home-searchgroup-general'>
          <Form.Control type='text' placeholder='Seach' />
        </Form.Group>
        <Button variant='primary'>Search</Button>
        <br />
        <Form.Group className='mb-3' controlId='home-searchgroup-nbed'>
          <Form.Label>Beds</Form.Label>
          <Form.Select>
            <option selected>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </Form.Select>
        </Form.Group>
        <br />
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='home-searchgroup-date-start'>Available From</Form.Label>
          <Form.Control type='date' id='home-searchgroup-date-start' className='form-control' />
          <Form.Label htmlFor='home-searchgroup-date-end'>To</Form.Label>
          <Form.Control type='date' id='home-searchgroup-date-end' className='form-control' />
        </Form.Group>
        <br />
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='home-searchgroup-price-start'>Price From</Form.Label>
          <Form.Control type='text' id='home-searchgroup-price-start' className='form-control' />
          <Form.Label htmlFor='home-searchgroup-price-end'>To</Form.Label>
          <Form.Control type='text' id='home-searchgroup-price-end' className='form-control' />
        </Form.Group>
        <br />
        <Form.Group className='mb-3' controlId='home-searchgroup-sortrate'>
          <Form.Label>Sort bt Rate</Form.Label>
          <Form.Select className='form-select'>
            <option selected>Highest</option>
            <option>Lowest</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </section>
  )
}

export default HomeSearchGroup;
