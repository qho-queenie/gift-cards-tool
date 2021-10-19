import React, { useState } from 'react'
import CardPreview from './CardPreview'

import './AllCards.scss';

const AllCards = () => {
  const [costcoCards, setCostCoCards] = useState([
    { store: 'costco', cardNumber: 1234, expDate: '01/2022' },
    { store: 'costco', cardNumber: 2345, expDate: '01/2023' },
    { store: 'costco', cardNumber: 3456, expDate: '11/2022' },
  ]);

  const [targetCards, setTargetCards] = useState([
    { store: 'target', cardNumber: 4567, expDate: '03/22' },
    { store: 'target', cardNumber: 5678, expDate: '03/21' },
    { store: 'target', cardNumber: 6789, expDate: '09/22' },
    { store: 'target', cardNumber: 7890, expDate: '11/20' }
  ]);

  const [visaCards, setVisaCards] = useState([
    { store: 'visa', cardNumber: 1234, expDate: '09/21' },
    { store: 'visa', cardNumber: 2345, expDate: '09/19' },
    { store: 'visa', cardNumber: 3456, expDate: '11/21' }
  ]);

  const [homeDepotCards, sethomeDepotCards] = useState([
    { store: 'homeDepot', cardNumber: 1234, expDate: '09/21' },
    { store: 'homeDepot', cardNumber: 2345, expDate: '09/19' },
    { store: 'homeDepot', cardNumber: 3456, expDate: '11/21' }
  ]);

  return (
    <div className='AllCards'>

      <div className={"cardRow"}>
        <div className={'AllCards__cardColumn'}>
          {costcoCards.map(card => {
            return (
              <CardPreview
                key={`{${card.store}${card.cardNumber}}`}
                card={card}
              />
            )
          })}
        </div>
      </div>

      <div className={"cardRow"}>
        <div className={'AllCards__cardColumn'}>
          {targetCards.map(card => {
            return (
              <CardPreview
                key={`{${card.store}${card.cardNumber}}`}
                card={card}
              />
            )
          })}
        </div>
      </div>

      <div className={"cardRow"}>
        <div className={'AllCards__cardColumn'}>
          {visaCards.map(card => {
            return (
              <CardPreview
                key={`{${card.store}${card.cardNumber}}`}
                card={card}
              />
            )
          })}
        </div >
      </div>

      <div className={"cardRow"}>
        <div className={'AllCards__cardColumn'}>
          {homeDepotCards.map(card => {
            return (
              <CardPreview
                key={`{${card.store}${card.cardNumber}}`}
                card={card}
              />
            )
          })}
        </div >
      </div>

    </div >
  );
}

export default AllCards;
