// caution: this component means the listing panel on homepage
// not the listing item

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import { listGet, listDetail, bookGet } from '../../apis';
import ItemPropertyGeneric from '../ItemPropertyGeneric';
import { useSearchContext } from './HomeSearchContext';

function HomeListing () {
  // props/globals
  const { text, nBed, dateStart, dateEnd, priceStart, priceEnd, sortRate } = useSearchContext().searchConditions;
  const token = localStorage.getItem('token');
  const uemail = localStorage.getItem('userId');
  const promises = [];

  // state
  // const [text] = useState(searchConditions.text);
  // const [nBed] = useState(searchConditions.nBed);
  // const [dateStart] = useState(searchConditions.dateStart);
  // const [dateEnd] = useState(searchConditions.dateEnd);
  // const [priceStart] = useState(searchConditions.priceStart);
  // const [priceEnd] = useState(searchConditions.priceEnd);
  // const [sortRate] = useState(searchConditions.sortRate);

  const [alertToken, setAlertToken] = useState(false);
  const [plist, setPlist] = useState([]);
  const [blist, setBlist] = useState([]);
  const [pDetailList, setPDetailList] = useState([]);
  const [loadComplete, setLoadComplete] = useState(false);

  console.log('[INFO][Filter]', text, nBed, dateStart, dateEnd, priceStart, priceEnd, sortRate);

  // private: check listing my status
  function pStatus (pid) {
    const tmp = blist.filter(x => parseInt(x.listingId) === pid)
    if (!tmp.length) return 'none';
    for (const x of tmp) if (x.status === 'accepted') return 'accepted';
    for (const x of tmp) if (x.status === 'pending') return 'pending';
    return 'none';
  }

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
    const fetchBook = async () => {
      try {
        const res = await bookGet(token);
        if (uemail) setBlist(res.bookings.filter(x => x.owner === uemail && (x.status === 'pending' || x.status === 'accepted')))
      } catch (error) {
        setAlertToken(true);
      }
    }
    if (token) fetchBook();
    fetchData();
  }, [token]);

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
              const scoreAvg = scoreSum ? Math.round(scoreSum / res2.listing.reviews.length * 10) / 10 : 0;
              const tmp = pDetailList;
              for (const x of tmp) if (x.id === p) return;
              const item = {
                id: p,
                thumb: res2.listing.thumbnail,
                title: res2.listing.title,
                price: res2.listing.price,
                availability: res2.listing.availability,
                nbed: res2.listing.metadata.numBed,
                rate: scoreAvg,
                reviews: res2.listing.reviews,
                status: pStatus(p)
              }
              if (item.status === 'none') tmp.push(item); else tmp.unshift(item);
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
    for (const x of iter.availability) if (new Date(x.start).getTime() <= givenDate.getTime()) return true;
    return false;
  }

  // private: check date end
  function filterDateEnd (iter, givenDate) {
    for (const x of iter.availability) if (new Date(x.end).getTime() >= givenDate.getTime()) return true;
    return false;
  }

  // private: check date start && end
  function filterDateStartEnd (iter, givenStart, givenEnd) {
    for (const x of iter.availability) if (new Date(x.start).getTime() <= givenStart.getTime() && new Date(x.end).getTime() >= givenEnd.getTime()) return true;
    return false;
  }

  if (!loadComplete) return (<>Nothing to Display...</>)

  let get = pDetailList.filter(x => x.id !== -1);
  if (text) get = get.filter(x => x.title.includes(text));
  if (nBed) get = get.filter(x => x.nbed === nBed);
  if (dateStart && dateEnd) get = get.filter(x => filterDateStartEnd(x, dateStart, dateEnd));
  if (dateStart) get = get.filter(x => filterDateStart(x, dateStart));
  if (dateEnd) get = get.filter(x => filterDateEnd(x, dateEnd));
  if (priceStart) get = get.filter(x => x.price >= priceStart);
  if (priceEnd) get = get.filter(x => x.price <= priceEnd);
  sortRate === 'highest' ? get.sort((a, b) => b.rate - a.rate) : get.sort((a, b) => a.rate - b.rate);
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
          status={x.status}
        />
      ) }
    </Container>
  )
}

export default HomeListing;
