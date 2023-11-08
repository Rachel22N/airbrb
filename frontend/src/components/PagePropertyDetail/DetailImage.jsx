import React from 'react';

import 'DetailImage.css';

function DetailImage (props) {
  // props
  const { cover, imglist } = props;

  return (
    <div className='detailimg-container'>
      <section className='detailimg-cover' style={{ background: `url("${cover}")` }}></section>
      <section className='detailimg-list'>
        { imglist.map((x, idx) => <section className='detailimg-list-item' key={idx} style={{ background: `url("${x}")` }}></section>) }
      </section>
    </div>
  )
}

export default DetailImage;
