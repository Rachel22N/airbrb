import React from 'react';

import 'DetailInfo.css';

function DetailInfo (props) {
  // props
  const { title, ptype, addr, nbed, nbath, nroom, price } = props;

  return (
    <div className='detailinfo-container'>
      <section className='detailinfo-infoframe'>
        <section>
            <section className='detailinfo-title'>{title}</section>
            <section className='detailinfo-type'>{ptype}</section>
        </section>
        <section className='detailinfo-addr'>{addr}</section>
        <section className='detailinfo-facility'>{nbed} Bed {nbath} Bathroom {nroom} Room</section>
      </section>
      <section className='detailinfo-price'>${price}</section>
    </div>
  )
}

export default DetailInfo;
