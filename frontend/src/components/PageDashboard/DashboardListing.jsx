// caution: this component means the listing panel on homepage
// not the listing item

import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

import { listGet, listDetail } from '../../apis';
import ItemPropertyHosted from '../ItemPropertyHosted';

function DashboardListing (props) {
  // props/globals
  const { uemail } = props;

  // state
  const [alertToken, setAlertToken] = useState(false);

  // private: get property detail
  function pDetail (pid) {
    listDetail(pid)
      .then((res) => {
        return {
          pid: pid,
          title: res.title,
          ptype: res.metadata.type,
          nbed: res.metadata.nbed,
          nbath: res.metadata.nbath,
          thumb: res.thumbnail,
          price: res.price,
          reviews: res.reviews,
          published: res.published
        }
      })
      .catch((res) => {
        return { pid: -1 }
      })
  }

  // get my properties
  let myProps;
  listGet()
    .then((res) => {
      myProps = res.listings.filter(x => x.owner === uemail);
      myProps = myProps.map(x => pDetail(x.id)).filter(x => x.pid !== -1);
    })
    .catch((res) => {
      setAlertToken(true);
    })

  return (
    <>
      { alertToken && <Alert variant='danger' onClose={() => setAlertToken(false)} dismissible>Invalid Token</Alert> }
      { myProps.map((x, idx) =>
        <ItemPropertyHosted key={idx}
          pid={x.pid}
          title={x.title}
          ptype={x.ptype}
          nbed={x.nbed}
          nbath={x.nbath}
          thumb={x.thumb}
          price={x.price}
          reviews={x.reviews}
          published={x.published}
        />
      ) }
    </>
  )
}

export default DashboardListing;
