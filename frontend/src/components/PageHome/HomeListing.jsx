// caution: this component means the listing panel on homepage
// not the listing item

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import { listGet, listDetail } from '../../apis';
import ItemPropertyGeneric from '../ItemPropertyGeneric';
import { useSearchContext } from './HomeSearchContext';

// TODO: iteratively check date range
function HomeListing (props) {
  // props/globals
  const { text, nbed, dateStart, dateEnd, priceStart, priceEnd, sortRate } = useSearchContext();

  // state
  const [alertToken, setAlertToken] = useState(false);

  // get my properties
  let myProps;
  listGet()
    .then((res) => {
      let get = res.listings.map(x => {
        let ret;
        listDetail(x.id)
          .then((res2) => {
            // calc avg rate
            let scoreSum = 0;
            res2.reviews.forEach(x => { scoreSum += x.rate });
            const scoreAvg = scoreSum / res2.reviews.length;
            ret = {
              id: x.id,
              thumb: res2.thumbnail,
              title: res2.title,
              price: res2.price,
              dateStart: res2.availability.start,
              dateEnd: res2.availability.end,
              nbed: res2.metadata.numBed,
              rate: scoreAvg,
              reviews: res2.reviews
            }
          })
          .catch((res2) => {
            ret = { id: -1 };
          })
        return ret;
      })
      get = get.filter(x => x.id !== -1);
      if (text) get = get.filter(x => x.includes(text));
      if (nbed) get = get.filter(x => x.nbed === nbed);
      if (dateStart) get = get.filter(x => x.dateStart.getTime() >= dateStart.getTime());
      if (dateEnd) get = get.filter(x => x.dateEnd.getTime() <= dateEnd.getTime());
      if (priceStart) get = get.filter(x => x.price >= priceStart);
      if (priceEnd) get = get.filter(x => x.price <= priceEnd);
      sortRate === 'highest' ? get.sort((a, b) => b.rate - a.rate) : get.sort((a, b) => a.rate - b.rate);
      myProps = get;
    })
    .catch((res) => {
      setAlertToken(true);
    })

  return (
    <Container fluid>
      { alertToken && <Alert variant='danger' onClose={() => setAlertToken(false)} dismissible>Invalid Token</Alert> }
      { myProps && myProps.map((x, idx) =>
        <ItemPropertyGeneric key={idx}
          pid={x.id}
          title={x.title}
          thumb={x.thumb}
          price={x.price}
          reviews={x.reviews}
        />
      ) }
    </Container>
  )
}

export default HomeListing;
