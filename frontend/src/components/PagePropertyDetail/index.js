import React from 'react';
import Button from 'react-bootstrap/Button';
import ChavronLeft from 'react-bootstrap-icons';

import DetailImage from './DetailImage';
import DetailInfo from './DetailInfo';
import ApplicantSection from './ApplicantSection';
import DetailReview from './DetailReview';
import { listDetail } from '../../apis';

import './screen.css';

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
    <div className='screen'><div className='screen-frame'><div className='popup-box'>
      <Button variant='primary'><ChavronLeft color='white' size={42} />Back</Button>
      <DetailImage cover={pDetail.thumbnail} />
      <DetailInfo
        title={pDetail.title}
        ptype='Apartment'
        addr={pDetail.address}
        nbed={pDetail.metadata.bed}
        nbath={pDetail.metadata.bath}
        nroom={pDetail.metadata.room}
        price={pDetail.price}
      />
      <ApplicantSection token={token} uemail={uemail} pid={pid} />
      <DetailReview pid={pid} />
    </div></div></div>
  )
}

export default PagePropertyDetail;
