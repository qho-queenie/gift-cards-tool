import React from 'react'

import './CardPreview.scss';

const CardPreview = (cardInfo) => {
  const { store, cardNumber, expDate } = cardInfo.card;
  return (

    // generate a lil card
    <div className={'CardPreview'} >
      <div className={'CardPreview__container'}>
        <h4><b>{store}</b></h4>
        <p>{cardNumber}</p>
        <p>{expDate}</p>
      </div>
    </div >
  )


}

export default CardPreview;
