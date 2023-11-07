// this component is for listing item display on homepage

import React from 'react';

import './ItemPropertyHosted.css';

function ItemPropertyHosted (props) {
  // TODO: props
  const { pid, title, ptype, nbed, nbath, thumb, price, reviews, published } = props;
  // style

  return (
    <div className='item-property-hosted'>
      <section className='item-property-hosted-thumb' style={{ background: `url('${thumb}')` }}></section>
      <section className='item-property-hosted-infoframe'>
        <section className='item-property-hosted-pid'>{pid}</section>
        <section>
          <section className='item-property-hosted-title'>{title}</section>
          <section className='item-property-hosted-type'>{ptype}</section>
        </section>
        <section className='item-property-hosted-rate'></section>
        <section className='item-property-hosted-facility'>{nbed} Bedroom {nbath} Bathroom</section>
        <section className='item-property-hosted-reviews'>{reviews.length} Reviews</section>
        <section className='item-property-hosted-price'>${price}</section>
        <section className='item-property-hosted-actiongroup'>
          <button className='item-property-hosted-actiongroup-btn'>Edit</button>
          <button className='item-property-hosted-actiongroup-btn'>Manage Booking</button>
          { published ? <button className='item-property-hosted-actiongroup-btn'>Unpublish</button> : <button className='item-property-hosted-actiongroup-btn'>Publish</button> }
          <button className='item-property-hosted-actiongroup-btn'>Remove</button>
        </section>
      </section>
    </div>
  )
}

export default ItemPropertyHosted;
