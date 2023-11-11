import { React, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import { listDetail } from '../../apis';

function DetailReview (props) {
  // props
  const { pid } = props;

  // state
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  // preprocess
  let pReview;
  listDetail(pid)
    .then((res) => {
      pReview = res.reviews;
    })
    .catch((res) => {
      setAlert(true);
      setAlertMsg(res);
    })
  let rateSun = 0;
  pReview.forEach(x => { rateSun += x.rate });
  const rateAvg = rateSun / pReview.length;

  return (
    <Container fluid>
      { alert && <Alert variant='danger' onClose={() => setAlert(false)} dismissible>{alertMsg}</Alert> }
      <Row>
        <Col>Rating: {rateAvg} &#xF586;</Col>
      </Row>
      <Row>
        <Col><ListGroup>
          { pReview.map((x, idx) =>
            <ListGroup.Item key={idx}>
              <h6>{x.user}</h6>
              <section>&#xF586; {x.rate}</section>
              <p>{x.review}</p>
            </ListGroup.Item>
          ) }
        </ListGroup></Col>
      </Row>
    </Container>
  )
}

export default DetailReview;
