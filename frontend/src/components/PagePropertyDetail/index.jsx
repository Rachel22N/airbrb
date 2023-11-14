import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import DetailImage from './DetailImage';
import DetailInfo from './DetailInfo';
import ApplicantSection from './ApplicantSection';
import DetailReview from './DetailReview';
import { listDetail } from '../../apis';
import InterfaceHeader from '../InterfaceHeader';

function PagePropertyDetail () {
  // props
  const token = localStorage.getItem('token');
  const uemail = localStorage.getItem('userId');
  const pid = useParams().listingId;
  console.log(`[INFO] PropertyDetail: ${pid}`);

  // state
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [pDetail, setPDetail] = useState(null);

  // property detail
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listDetail(pid);
        setPDetail(res.listing);
      } catch (error) {
        setAlert(true);
        setAlertMsg(error);
      }
    };

    fetchData();
  }, [pid]);

  // preprocess
  console.log(pDetail);

  if (!pDetail) return (<>Please wait...</>)

  return (
    <>
      <InterfaceHeader />
      { alert && <Alert variant='danger' onClose={() => setAlert(false)} dismissible>{alertMsg}</Alert> }
      <Container fluid>
        <Row className='my-5'>
          <Col><Link to='/' className='fs-5 link-underline link-underline-opacity-0'>&#8617; Back</Link></Col>
        </Row>
        <Row>
          <DetailImage cover={pDetail.thumbnail} imglist={pDetail.metadata.imgList} />
        </Row>
        <Row className='mb-5'>
          <Col><DetailInfo
            title={pDetail.title}
            ptype={pDetail.metadata.type}
            addr={pDetail.address}
            nbed={pDetail.metadata.numBed}
            nbath={pDetail.metadata.numBath}
            nroom={pDetail.metadata.numRoom}
            price={pDetail.price}
          /></Col>
        </Row>
        <Row className='mb-5'>
          <Col><ApplicantSection token={token} uemail={uemail} pid={pid} price={pDetail.price} /></Col>
        </Row>
        <Row>
          <Col><DetailReview reviews={pDetail.reviews} /></Col>
        </Row>
      </Container>
    </>
  )
}

export default PagePropertyDetail;
