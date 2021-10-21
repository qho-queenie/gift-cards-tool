import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import CardPreview from './CardPreview'
import AddNewCardModal from './AddNewCardModal'
import './AllCards.scss';

const AllCards = () => {
  const LOCAL_STORAGE_KEY_DATA = 'giftCardApp.cards';

  const [allCards, setAllCards] = useState([]);

  // does the array of card names need to be in a useEffect too?
  // const retrieveCardNamesOnly = (arrayOfCardObjects) => {
  //   const result = [];
  //   arrayOfCardObjects.forEach(card => result.push(card.storeName));
  // }

  // const [allCardsNames, setAllCardsNames] = useState(retrieveCardNamesOnly(allCards));

  const [costcoCards, setCostCoCards] = useState([
    { store: 'costcoCards', cardNumber: 6179923830148194, remainBalance: 100.28 }
  ]);

  const [visaCards, setVisaCards] = useState([
    { store: 'visaCards', cardNumber: 5113320254120251, expDate: '01/30', cvc: '666' }
  ]);

  const [BBBCards, setBBBCards] = useState([
    { store: 'BBBCards', cardNumber: 6191139158252970, remainBalance: 21.3 },
    { store: 'BBBCards', cardNumber: 6191139158252977, remainBalance: 121.3 }
  ]);

  const [containerStoreCards, setContainerStoreCards] = useState([
    { store: 'containerStoreCards', cardNumber: 6006491645022580921, remainBalance: 186.41 }
  ]);

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DATA));
    setAllCards(storedCards);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(allCards))
  }, [allCards]);

  const [isOpen, setIsOpen] = useState(false);

  const addNewCard = (newCardInfo) => {
    if (allCards.length > 0) {
      const checkExisting = allCards.filter(card => card.number === newCardInfo.number)
      if (checkExisting.length > 0) {
        console.log('it exists, display error')
      }
      else {
        setAllCards([...allCards, ...[newCardInfo]]);
      }
    }
    else {
      setAllCards([newCardInfo]);
    }
  }

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
          addNewCard={addNewCard}
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
            {visaCards.length > 0 ? <label><b>VisaCards</b></label> : null}
          </div>
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



    </div >
  );
}

export default AllCards;
