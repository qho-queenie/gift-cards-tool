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
          {BBBCards.map((card) => {
            return (
              <CardPreview
                key={`${card.number}`}
                card={card}
              />
            )
          })}
        </div>

        <div className='breakdownColumn'>
          <CardBreakdown />
        </div>


      </div>

    </div>
  );
}

export default AllCards;
