// caution: this component means the listing panel on homepage
// not the listing item

import React from 'react';

// TODO: load listings
function DashboardListing (props) {
  // props
  // style
  const container = {
    backgroundColor: 'gray',
    padding: '5px',
    flex: '1'
  }

  return (
    <section id='dashboard-listing' style={container}></section>
  )
}

export default DashboardListing;
