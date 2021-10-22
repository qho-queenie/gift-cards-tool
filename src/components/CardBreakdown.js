import React, { useState } from 'react';
import './CardBreakdown.scss';

const CardBreakdown = ({ card }) => {
  if (card === -1) {
    return (
      <h1>No Card to display</h1>
    )
  }

  console.log(card)
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  return (
    <div className={"CardBreakdown"}>
      <h1>i am cardbreakdown</h1>

    </div>
  )
}

export default CardBreakdown;