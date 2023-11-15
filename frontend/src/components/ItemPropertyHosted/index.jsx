// this component is for listing item display on dashboard

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import { listPublish, listUnpublish, listDelete } from '../../apis';

function ItemPropertyHosted (props) {
  const token = localStorage.getItem('token');
  const { pid, title, ptype, nbed, nbath, thumb, price, reviews, published } = props;

  // state
  const [publish, setPublish] = useState(published);
  const [removed, setRemoved] = useState(false);
  const [dateShow, setDateShow] = useState(false);
  const [dateInput, setDateInput] = useState([{ start: new Date(0), end: new Date(2099, 12, 31) }]);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  // calculate avg rate
  let rateSun = 0;
  let rateAvg = 0;
  if (reviews.length) {
    reviews.forEach(x => { rateSun += x.rate });
    rateAvg = Math.round(rateSun / reviews.length * 10) / 10;
  }

  // private: add date range
  function popDate (s, e) {
    setDateInput((prevDates) => [...prevDates, { start: s, end: e }]);
  }

  // private: update one of date range
  function updateDateStart (idx, s) {
    setDateInput((prevDates) => {
      const newDates = [...prevDates];
      newDates[idx].start = s;
      return newDates;
    });
  }

  function updateDateEnd (idx, e) {
    setDateInput((prevDates) => {
      const newDates = [...prevDates];
      newDates[idx].end = e;
      return newDates;
    });
  }

  // private: publush
  function pPublish () {
    listPublish(token, pid, dateInput)
      .then((res) => setPublish(true))
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
      })
  }

  // private: unpublish
  function pUnpublish () {
    listUnpublish(token, pid)
      .then((res) => {
        setPublish(false);
        setDateShow(false);
      })
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
      })
  }

  // private: delete
  function pRemove () {
    listDelete(token, pid)
      .then((res) => setRemoved(true))
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
      })
  }

  if (removed) return (<Card>This item has been removed</Card>)

  return (
    <Card className='my-2'>
      { alert && <Alert variant='danger' onClose={() => setAlert(false)} dismissible>{alertMsg}</Alert> }
      <Card.Img variant='top' height={200} src={thumb} className='object-fit-cover' />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>#{pid}</Card.Subtitle>
        <Card.Text>
          {ptype}
          <br />&#10030; {rateAvg}
          <br />{nbed} Bed {nbath} Bathroom
          <br /><b>${price}</b>
          <br />{reviews.length} Reviews
        </Card.Text>
        <Link to={`/property/edit/${pid}`}><Button variant='primary'>Edit</Button></Link>
        <Link to={`/property/manage/${pid}`}><Button variant='primary'>Manage Booking</Button></Link>
        {
          publish
            ? <Button variant='primary' onClick={() => pUnpublish()}>Unpublish</Button>
            : <Button variant='primary' onClick={() => setDateShow(true)}>Publish</Button>
        }
        <Button variant='primary' onClick={() => pRemove()}>Remove</Button>
        { (dateShow && !publish) && <h5>Setup Availabilities</h5> }
        { (dateShow && !publish) && dateInput.map((x, idx) =>
          <Container key={idx}>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm='2'>From</Form.Label>
              <Col sm='10'><Form.Control type='date' className='form-control' onChange={e => updateDateStart(idx, new Date(e.target.value))} defaultValue={`${x.start.getFullYear()}-${x.start.getMonth()}-${x.start.getDate()}`} /></Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm='2'>To</Form.Label>
              <Col sm='10'><Form.Control type='date' className='form-control' onChange={e => updateDateEnd(idx, new Date(e.target.value))} defaultValue={`${x.end.getFullYear()}-${x.end.getMonth()}-${x.end.getDate()}`} /></Col>
            </Form.Group>
          </Container>
        ) }
        { dateShow && !publish && (
          <>
            <Button variant="primary" onClick={() => popDate(new Date(0), new Date(2099, 12, 31))}>
              Add Range
            </Button>
            <Button variant="primary" onClick={() => pPublish()}>
              Submit
            </Button>
          </>
        ) }
      </Card.Body>
    </Card>
  )
}

export default ItemPropertyHosted;
