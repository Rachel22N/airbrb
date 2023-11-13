import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

function DetailReview (props) {
  // props
  const { reviews } = props;

  // state

  let rateSun = 0;
  let rateAvg = 0;
  if (reviews.length) {
    reviews.forEach(x => { rateSun += x.rate });
    rateAvg = rateSun / reviews.length;
  }

  return (
    <Container fluid>
      <Row>
        <Col>Rating: {rateAvg} &#10030;</Col>
      </Row>
      <Row>
        <Col><ListGroup>
          { reviews && reviews.map((x, idx) =>
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
