// caution: this component means the listing panel on homepage
// not the listing item

import React from 'react';

import { listGet } from '../../apis';
import ItemPropertyGeneric from '../ItemPropertyGeneric copy';

// TODO: load listings
function HomeListing (props) {
  // props

  // get my properties
  let myProps;
  listGet()
    .then((res) => {
      myProps = res.listings;
    })
    .catch((res) => {
      // TODO
    })

  return (
    <>
      { myProps.map((x, idx) =>
        <ItemPropertyGeneric key={idx}
          pid={x.id}
          title={x.title}
          thumb={x.thumb}
          price={x.price}
          reviews={x.reviews}
        />
      ) }
    </>
  )
}

export default HomeListing;
