import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ChavronLeft from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';

import DetailImage from './DetailImage';
import DetailInfo from './DetailInfo';
import ApplicantSection from './ApplicantSection';
import DetailReview from './DetailReview';
import { listDetail } from '../../apis';
import InterfaceHeader from '../InterfaceHeader';

function PagePropertyDetail (props) {
  // props
  const { token, uemail, pid } = props;

  // def: property detail
  function propertyInfo () {
    listDetail(pid)
      .then((res) => {
        return res;
      })
      .catch((res) => {
        // todo
      })
  }

  // preprocess
  const pDetail = propertyInfo();

  return (
    <>
      <InterfaceHeader uemail={uemail} />
      <Container fluid>
        <Row>
          <Col><Button variant='primary'><ChavronLeft color='white' size={42} />Back</Button></Col>
        </Row>
        <Row>
          <Col><DetailImage cover={pDetail.thumbnail} /></Col>
        </Row>
        <Row>
          <Col><DetailInfo
            title={pDetail.title}
            ptype={pDetail.metadate.type}
            addr={pDetail.address}
            nbed={pDetail.metadata.bed}
            nbath={pDetail.metadata.bath}
            nroom={pDetail.metadata.room}
            price={pDetail.price}
          /></Col>
        </Row>
        <Row>
          <Col><ApplicantSection token={token} uemail={uemail} pid={pid} price={pDetail.price} /></Col>
        </Row>
        <Row>
          <Col><DetailReview pid={pid} /></Col>
        </Row>
      </Container>
    </>
  )
}

export default PagePropertyDetail;
