// this component is for listing item display on homepage

import React from 'react';

import './ItemPropertyGeneric.css';

function ItemPropertyGeneric (props) {
  // TODO: props
  const { pid, title, thumb, price, reviews } = props;
  // style

  return (
    <div className='item-property-generic'>
      <section className='item-property-generic-thumb' style={{ background: `url('${thumb}')` }}></section>
      <section className='item-property-generic-infoframe'>
        <section className='item-property-generic-pid'>{pid}</section>
        <section className='item-property-generic-title'>{title}</section>
        <section className='item-property-generic-reviews'>{reviews.length} Reviews</section>
        <section className='item-property-generic-price'>${price}</section>
      </section>
    </div>
  )
}

export default ItemPropertyGeneric;
