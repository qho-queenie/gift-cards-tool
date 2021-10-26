import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import CardPreview from './CardPreview';
import AddNewCardModal from './AddNewCardModal';
import CardBreakdown from './CardBreakdown';

import './AllCards.scss';

const AllCards = () => {
  const LOCAL_STORAGE_KEY_DATA = 'giftCardApp.cards';
  const [allCards, setAllCards] = useState([]);
  const [activeViewingCard, setActiveViewingCard] = useState(-1);
  const [newCardModalOpen, setNewCardModalOpen] = useState(false);

  // does the array of card names need to be in a useEffect too?
  const retrieveCardNamesOnly = (arrayOfCardObjects) => {
    const result = [];
    arrayOfCardObjects.forEach(card => result.push(card.storeName));
  }

  const [allCardsNames, setAllCardsNames] = useState(retrieveCardNamesOnly(allCards));

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DATA));
    setAllCards(storedCards);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(allCards));
    setActiveViewingCard(-1);
  }, [allCards]);



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
      setAllCards([newCardInfo]);
    }
  }

  const removeCard = (card) => {
    const remainCards = allCards.filter(({ number }) => number !== card.number);
    setAllCards([...remainCards]);
  }

  return (
    <div className='AllCards'>
      <button
        type='button'
        className='AllCards__addNewCard'
        onClick={() => setNewCardModalOpen(true)}
      >
        Add a New Card
      </button>

      <AddNewCardModal
        open={newCardModalOpen}
        onCloseModal={() => setNewCardModalOpen(false)}
        addNewCard={addNewCard}
      />


      <div className='AllCards__content'>
        <div className={"cardColumn"}>
          <div className={'cardsSummary'}>
            <button
              className={'cardColumn__getSummaryButton'}
              onClick={() => setActiveViewingCard(-1)}
            >
              Summary
            </button>
          </div>

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
