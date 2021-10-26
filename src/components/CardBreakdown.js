import React, { useState } from 'react';
import './CardBreakdown.scss';

const CardBreakdown = ({ card }) => {
  if (!card || card === -1) {
    return (
      <div className={"CardBreakdown"}>
        <h1>Summary</h1>
      </div>
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
      <table className={"CardBreakdown__transactionTable"}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Placeholder 01/23/2021</td>
            <td>Placeholder Starbucks</td>
            <td>Placeholder $20</td>
            <td>Placeholder $80</td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default CardBreakdown;