import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import { listDetail } from '../../apis';

function DetailReview (props) {
  // props
  const { pid } = props;

  // preprocess
  let pReview;
  listDetail(pid)
    .then((res) => {
      pReview = res.reviews;
    })
    .catch((res) => {
      // todo
    })
  let rateSun = 0;
  pReview.forEach(x => { rateSun += x.rate });
  const rateAvg = rateSun / pReview.length;

  return (
    <Container fluid>
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
