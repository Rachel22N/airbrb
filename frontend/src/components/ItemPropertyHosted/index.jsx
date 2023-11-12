// this component is for listing item display on homepage

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate as navigate } from 'react-router-dom';

import { listPublish, listUnpublish, listDelete } from '../../apis';

function ItemPropertyHosted (props) {
  const token = localStorage.getItem('token');
  const { pid, title, ptype, nbed, nbath, thumb, price, reviews, published } = props;

  // state
  const [dateShow, setDateShow] = useState(false);
  const [dateInput, setDateInput] = useState([{ start: new Date(0), end: new Date(2099, 12, 31) }]);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  // calculate avg rate
  let rateSun = 0;
  reviews.forEach(x => { rateSun += x.rate });
  const rateAvg = rateSun / reviews.length;

  // private: add date range
  function popDate (s, e) {
    const tmp = dateInput;
    tmp.push({ start: s, end: e });
    setDateInput(tmp);
  }

  // private: update one of date range
  function updateDateStart (idx, s) {
    const tmp = dateInput;
    tmp[idx].start = s;
    setDateInput(tmp);
  }

  function updateDateEnd (idx, e) {
    const tmp = dateInput;
    tmp[idx].end = e;
    setDateInput(tmp);
  }

  // private: publush
  function pPublish () {
    listPublish(token, pid, dateInput)
      .then((res) => navigate('/dashboard'))
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
      })
  }

  // private: unpublish
  function pUnpublish () {
    listUnpublish(token, pid)
      .then((res) => navigate('/dashboard'))
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
      })
  }

  // private: delete
  function pRemove () {
    listDelete(token, pid)
      .then((res) => navigate('/dashboard'))
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
      })
  }

  // private: multi-dateinput
  function generateInputGroup () {
    dateInput.map((x, idx) =>
      <>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>From</Form.Label>
          <Col sm='10'><Form.Control type='date' className='form-control' onChange={e => updateDateStart(idx, new Date(e.target.value))} value={x.start} /></Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>To</Form.Label>
          <Col sm='10'><Form.Control type='date' className='form-control' onChange={e => updateDateEnd(idx, new Date(e.target.value))} value={x.end} /></Col>
        </Form.Group>
      </>
    )
  }

  return (
    <Card>
      { alert && <Alert variant='danger' onClose={() => setAlert(false)} dismissible>{alertMsg}</Alert> }
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
            ? <Button variant='primary' onClick={() => pUnpublish()}>Unpublish</Button>
            : <Button variant='primary' onClick={() => setDateShow(true)}>Publish</Button>
        }
        <Button variant='primary' onClick={() => pRemove()}>Remove</Button>
        { dateShow && <h5>Book A Session</h5> }
        { dateShow && generateInputGroup() }
        { dateShow && <Button variant='primary' onClick={() => popDate(new Date(0), new Date(2099, 12, 31))}>Add Range</Button> }
        { dateShow && <Button variant='primary' onClick={() => pPublish()}>Submit</Button> }
      </Card.Body>
    </Card>
  )
}

export default ItemPropertyHosted;
