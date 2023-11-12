import { React, useState } from 'react';
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
  const { token, uemail, pid, bid } = props;

  // post a new review
  function fetchPostReview () {
    listReview(token, pid, bid, {
      user: uemail,
      rate: prate,
      review: comment
    })
      .catch((res) => {
        setAlertToken(true);
        setAlertMsg(res);
      })
  }

  return (
    <Container>
      { alertToken && <Alert variant='danger' onClose={() => setAlertToken(false)} dismissible>{alertMsg}</Alert> }
      <Row>
        <Col><Form.Group className='mb-3' controlId='applicant-review-text'>
          { bid ? <Form.Control as='textarea' rows={2} onChange={e => setComment(e.target.value)} /> : <Form.Control as='textarea' rows={2} disabled /> }
        </Form.Group></Col>
      </Row>
      <Row>
        <Col>
          <Form.Group as={Row} className='mb-3' controlId='applicant-review-rate'>
            <Form.Label column sm='2'>Rate</Form.Label>
            <Col sm='10'><Form.Select onChange={e => setRate(parseInt(e.target.value))} defaultValue='5'>
              <option>5</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Form.Select></Col>
          </Form.Group>
          { bid ? <Button variant='primary' onClick={fetchPostReview}>Publish</Button> : <Button variant='primary' disabled>Publish</Button> }
        </Col>
      </Row>
    </Container>
  )
}

export default ApplicantReview;
