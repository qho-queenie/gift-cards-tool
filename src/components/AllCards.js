import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import CardPreview from './CardPreview';
import AddNewCardModal from './AddNewCardModal';
import CardBreakdown from './CardBreakdown';
import './AllCards.scss';

const AllCards = () => {
  const LOCAL_STORAGE_KEY_DATA = 'giftCardApp.cards';

  const [allCards, setAllCards] = useState([]);

  const [activeViewingCard, setActiveViewingCard] = useState();

  // does the array of card names need to be in a useEffect too?
  const retrieveCardNamesOnly = (arrayOfCardObjects) => {
    const result = [];
    arrayOfCardObjects.forEach(card => result.push(card.storeName));
  }

  const [allCardsNames, setAllCardsNames] = useState(retrieveCardNamesOnly(allCards));

  const [BBBCards, setBBBCards] = useState([
    { store: 'BBBCards', cardNumber: 6191139158252970, remainBalance: 21.3 },
    { store: 'BBBCards', cardNumber: 6191139158252977, remainBalance: 121.3 }
  ]);

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DATA));
    setAllCards(storedCards);
    if (storedCards.length > 0) {
      setActiveViewingCard(storedCards[0]);
    } else {
      setActiveViewingCard(-1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(allCards));
    if (allCards.length > 0) {
      setActiveViewingCard(allCards[0]);
    } else {
      setActiveViewingCard(-1);
    }
  }, [allCards]);

  const [isOpen, setIsOpen] = useState(false);

  const addNewCard = (newCardInfo) => {
    if (allCards.length > 0) {
      const checkExisting = allCards.filter(card => card.number === newCardInfo.number)
      if (checkExisting.length > 0) {
      }
      else {
        setAllCards([...allCards, ...[newCardInfo]]);
      }
    }
    else {
      // console.log([newCardInfo], 'no cards yet,',)
      setAllCards([newCardInfo]);
    }
  }

  const removeCard = (card) => {
    const remainCards = allCards.filter(({ number }) => number !== card.number);
    // console.log('why didnt hav eit separate 1 card left to iterate?')
    setAllCards([...remainCards]);
  }
  return (
    <div className='AllCards'>
      <div className='AllCards__summary'>
        <h3><b>Number of Cards: { } </b></h3>
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

      <div className='AllCards__content'>
        <div className={"cardColumn"}>
          {allCards.map((card) => {
            return (
              <CardPreview
                key={`${card.number}`}
                card={card}
                selectCard={(selectedCard) => setActiveViewingCard(selectedCard)}
                deleteCard={() => removeCard(card)}
              />
            )
          })}
        </div>

        <div className='breakdownColumn'>
          <CardBreakdown
            card={activeViewingCard}
          />
        </div>
      </div>
    </div>
  );
}

export default AllCards;
