import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

function DetailImage (props) {
  // props
  const { cover, imglist } = props;

  return (
    <Container fluid>
      <Row>
        <Col>
          <Carousel>
            <Carousel.Item><Image src={cover} /></Carousel.Item>
            {
              imglist &&
              imglist.map((x, idx) =>
                <Carousel.Item key={idx}><Image src={x} /></Carousel.Item>
              )
            }
          </Carousel>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailImage;
