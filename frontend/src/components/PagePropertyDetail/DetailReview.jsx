import React from 'react';

import { listDetail } from '../../apis';
import './DetailReview.css';

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
    <div className='detailreview-container'>
      <section>Rating: {rateAvg} &#xF586;</section>
      <section className='detailreview-reviewcontainer'>
        { pReview.map((x, idx) =>
          <section className='detailreview-item' key={idx}>
            <section>{x.user}</section>
            <section>&#xF586; {rateAvg}</section>
            <p>{x.review}</p>
          </section>
        ) }
      </section>
    </div>
  )
}

export default DetailReview;
