import React from 'react';
import './style.css';

function Discount({discount}) {
  return (
    <div className='box-list center'><h4>Discount : {discount}%</h4></div>
  )
}

export default Discount