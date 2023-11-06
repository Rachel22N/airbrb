import React from 'react';

import './HeaderButton.css';

function HeaderButton (props) {
  // props
  const { innerText, action } = props;
  // style

  return (
    <button
      className='interface-header-btn'
      onClick={action}>
      { innerText }
    </button>
  )
}

export default HeaderButton;
