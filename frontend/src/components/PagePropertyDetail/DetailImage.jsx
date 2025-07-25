import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

function DetailImage (props) {
  // props
  const { cover, imglist, title } = props;

  return (
    <Container fluid>
      <Row>
        <Col>
          <Carousel className='bg-secondary'>
            <Carousel.Item><Image src={cover} height={500} className='w-100 object-fit-contain' alt={`Main image of the property ${title}`} /></Carousel.Item>
            {
              imglist &&
              imglist.map((x, idx) =>
                <Carousel.Item key={idx}><Image src={x} height={500} className='w-100 object-fit-contain' alt={`Image ${idx} of the property ${title}`} /></Carousel.Item>
              )
            }
          </Carousel>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailImage;
