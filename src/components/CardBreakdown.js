import React from 'react';
import './CardBreakdown.scss';

const CardBreakdown = ({ card }) => {
  console.log(card)
  return (
    <div className={"CardBreakdown"}>
      <h1>i am cardbreakdown</h1>
      {/* <h3>{card[0].name}</h3> */}
    </div>
  )
}

export default CardBreakdown;