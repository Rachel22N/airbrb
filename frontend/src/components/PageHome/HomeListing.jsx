// caution: this component means the listing panel on homepage
// not the listing item

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import { listGet, listDetail } from '../../apis';
import ItemPropertyGeneric from '../ItemPropertyGeneric';
import { useSearchContext } from './HomeSearchContext';

// TODO: iteratively check date range
function HomeListing (props) {
  // props/globals
  const { text, nBed, dateStart, dateEnd, priceStart, priceEnd, sortRate } = useSearchContext().searchConditions;
  console.log('[INFO][Filter]', text, nBed, dateStart, dateEnd, priceStart, priceEnd, sortRate);
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
  }, [text]);

  // stage 2: map property ids to details
  useEffect(() => {
    const fetchData = async () => {
      try {
        for (const p of plist) {
          promises.push(listDetail(p)
            .then((res2) => {
              if (!res2.listing.published) return;
              // calc avg rate
              let scoreSum = 0;
              if (res2.listing.reviews) res2.listing.reviews.forEach(x => { scoreSum += x.rate });
              const scoreAvg = scoreSum ? scoreSum / res2.reviews.length : 0;
              const tmp = pDetailList;
              for (const x of tmp) if (x.id === p) return;
              tmp.push({
                id: p,
                thumb: res2.listing.thumbnail,
                title: res2.listing.title,
                price: res2.listing.price,
                availability: res2.listing.availability,
                nbed: res2.listing.metadata.numBed,
                rate: scoreAvg,
                reviews: res2.listing.reviews
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

  // private: check date start
  function filterDateStart (iter, givenDate) {
    for (const x of iter.availability) if (new Date(x.start).getTime() >= givenDate.getTime()) return true;
    return false;
  }

  // private: check date end
  function filterDateEnd (iter, givenDate) {
    for (const x of iter.availability) if (new Date(x.end).getTime() <= givenDate.getTime()) return true;
    return false;
  }

  // private: check date start && end
  function filterDateStartEnd (iter, givenStart, givenEnd) {
    for (const x of iter.availability) if (new Date(x.start).getTime() >= givenStart.getTime() && new Date(x.end).getTime() <= givenEnd.getTime()) return true;
    return false;
  }

  if (!loadComplete) return (<>Nothing to Display...</>)
  console.log(pDetailList);

  let get = pDetailList.filter(x => x.id !== -1);
  if (text) get = get.filter(x => x.title.includes(text));
  if (nBed) get = get.filter(x => x.nbed === nBed);
  if (dateStart && dateEnd) get = get.filter(x => filterDateStartEnd(x, dateStart, dateEnd));
  if (dateStart) get = get.filter(x => filterDateStart(x, dateStart));
  if (dateEnd) get = get.filter(x => filterDateEnd(x, dateEnd));
  if (priceStart) get = get.filter(x => x.price >= priceStart);
  if (priceEnd) get = get.filter(x => x.price <= priceEnd);
  sortRate === 'Highest' ? get.sort((a, b) => b.rate - a.rate) : get.sort((a, b) => a.rate - b.rate);
  const myProps = get;

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
