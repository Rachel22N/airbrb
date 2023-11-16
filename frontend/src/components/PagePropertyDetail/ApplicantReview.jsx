import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { listReview } from '../../apis';

function ApplicantReview (props) {
  // state
  const [prate, setRate] = React.useState(5);
  const [comment, setComment] = React.useState('');
  const [alertToken, setAlertToken] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  // props
  const token = localStorage.getItem('token');
  const uemail = localStorage.getItem('userId');
  const { pid, bid } = props;

  // post a new review
  function fetchPostReview () {
    listReview(token, pid, bid, { user: uemail, rate: prate, review: comment })
      .catch((res) => {
        setAlertToken(true);
        setAlertMsg(res);
      })
  }

  return (
    <Container fluid>
      <h5>Leave A Review</h5>
      { alertToken && <Alert variant='danger' onClose={() => setAlertToken(false)} dismissible>{alertMsg}</Alert> }
      <Row>
        <Col>
          <Form.Group className='mb-3' controlId='applicant-review-text'>
            <Form.Label>Comment</Form.Label>
            { bid ? <Form.Control as='textarea' rows={2} onChange={e => setComment(e.target.value)} /> : <Form.Control as='textarea' rows={2} disabled /> }
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group as={Row} className='mb-3' controlId='applicant-review-rate'>
            <Form.Label column sm='1'>Rate</Form.Label>
            <Col sm='2'><Form.Select onChange={e => setRate(parseInt(e.target.value))} defaultValue='5'>
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </Form.Select></Col>
            <Col sm='9' className='d-grid'>
              { bid ? <Button variant='outline-primary' onClick={() => fetchPostReview()}>Publish</Button> : <Button variant='outline-secondary' disabled>You Haven&apos;t Tried This</Button> }
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  )
}

export default ApplicantReview;
