// caution: this component means the listing panel on homepage
// not the listing item

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import { listGet, listDetail } from '../../apis';
import ItemPropertyHosted from '../ItemPropertyHosted';

function DashboardListing () {
  // props/globals
  const uemail = localStorage.getItem('userId');
  const promises = [];

  // state
  const [alertToken, setAlertToken] = useState(false);
  const [plist, setPlist] = useState([]);
  const [pDetailList, setPDetailList] = useState([]);
  const [loadComplete, setLoadComplete] = useState(false);

  // stage 1: get all property ids
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listGet();
        const pids = res.listings.map(x => x.id);
        setPlist(pids);
      } catch (error) {
        setAlertToken(true);
      }
    };
    fetchData();
  }, []);

  // stage 2: map property ids to details
  useEffect(() => {
    const fetchData = async () => {
      try {
        for (const p of plist) {
          promises.push(listDetail(p)
            .then((res2) => {
              if (res2.listing.owner !== uemail) return;
              // calc avg rate
              let scoreSum = 0;
              if (res2.listing.reviews) res2.listing.reviews.forEach(x => { scoreSum += x.rate });
              const scoreAvg = scoreSum ? Math.round(scoreSum / res2.listing.reviews.length * 10) / 10 : 0;
              const tmp = pDetailList;
              for (const x of tmp) if (x.id === p) return;
              tmp.push({
                id: p,
                type: res2.listing.metadata.type,
                thumb: res2.listing.thumbnail,
                title: res2.listing.title,
                price: res2.listing.price,
                nbed: res2.listing.metadata.numBed,
                nbath: res2.listing.metadata.numBath,
                rate: scoreAvg,
                reviews: res2.listing.reviews,
                published: res2.listing.published
              })
              setPDetailList(tmp);
              Promise.allSettled(promises).finally(() => setLoadComplete(true));
            }))
        }
      } catch (error) {
        setAlertToken(true);
      }
    };
    fetchData();
  }, [plist]);

  if (!loadComplete) return (<>Nothing to Display...</>)
  console.log(pDetailList);

  const myProps = pDetailList;

  return (
    <Container fluid>
      { alertToken && <Alert variant='danger' onClose={() => setAlertToken(false)} dismissible>Invalid Token</Alert> }
      { myProps && myProps.map((x, idx) =>
        <ItemPropertyHosted key={idx}
          pid={x.id}
          title={x.title}
          ptype={x.type}
          nbed={x.nbed}
          nbath={x.nbath}
          thumb={x.thumb}
          price={x.price}
          reviews={x.reviews}
          published={x.published}
        />
      ) }
    </Container>
  )
}

export default DashboardListing;
