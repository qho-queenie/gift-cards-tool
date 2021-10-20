import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import CardPreview from './CardPreview'
import AddNewCardModal from './AddNewCardModal'
import './AllCards.scss';

const AllCards = () => {
  const [allCardsNames, setAllCardsNames] = useState(['costcoCards', 'masterCards', 'BBBCards', 'containerStoreCards']);


  const [costcoCards, setCostCoCards] = useState([
    { store: 'Costco', cardNumber: 6179923830148194, remainBalance: 100.28 }
  ]);

  const [masterCards, setVisaCards] = useState([
    { store: 'masterCard', cardNumber: 5113320254120251, expDate: '01/30', cvc: '666' }
  ]);

  const [BBBCards, setBBBCards] = useState([
    { store: 'BBB', cardNumber: 6191139158252970, remainBalance: 21.3 },
    { store: 'BBB', cardNumber: 6191139158252977, remainBalance: 121.3 }
  ]);

  const [containerStoreCards, setContainerStoreCards] = useState([
    { store: 'Container Store', cardNumber: 6006491645022580921, remainBalance: 186.41 }
  ]);

  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className='AllCards'>
      <div className='AllCards__summary'>
        <h3><b>Number of Cards: Total Remaining Balance: </b></h3>
        <button
          type='button'
          className='AllCards__addNewCard'
          onClick={() => setIsOpen(true)}
        >
          Add a New Card
        </button>

        <AddNewCardModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />

      </div>
      <div className={"cardRow"}>
        <div className={'AllCards__cardColumn'}>
          <div className={'storeName'}>
            {costcoCards.length > 0 ? <label><b>Costco</b></label> : null}
          </div>
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
          <div className={'storeName'}>
            {masterCards.length > 0 ? <label><b>MasterCard</b></label> : null}
          </div>
          {masterCards.map(card => {
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
          <div className={'storeName'}>
            {BBBCards.length > 0 ? <label><b>BBB</b></label> : null}
          </div>
          {BBBCards.map(card => {
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
          <div className={'storeName'}>
            {containerStoreCards.length > 0 ? <label><b>Container Store</b></label> : null}
          </div>
          {containerStoreCards.map(card => {
            return (
              <CardPreview
                key={`{${card.store}${card.cardNumber}}`}
                card={card}
              />
            )
          })}
        </div >
      </div>

    </div>
  );
}

export default AllCards;
