import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import CardImage from './CardImage';
import AddNewCardModal from './AddNewCardModal';
import CardBreakdown from './CardBreakdown';

import './AllCards.scss';

const AllCards = () => {
  const LOCAL_STORAGE_KEY_DATA = 'giftCardApp.cards';
  const [allCards, setAllCards] = useState([]);
  const [activeViewingCard, setActiveViewingCard] = useState(-1);
  const [newCardModalOpen, setNewCardModalOpen] = useState(false);

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DATA));
    setAllCards(storedCards);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(allCards));
    setActiveViewingCard(-1);
    console.log(allCards, 'all in useEffect')
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

  const addTransaction = (card, entry) => {
    const addToCard = allCards.find(({ number }) => number === card.number);
    if (addToCard) {
      if (addToCard['trans']) {
        addToCard['trans'].push(entry);
      } else {
        addToCard['trans'] = [entry];
      }
    }
    setAllCards([...allCards])
  }

  const deleteTransaction = (card, idToDelete) => {
    const transToRemove = card.trans.find(({ id }) => id === idToDelete);
    const cardToEdit = allCards.find(({ number }) => number === card.number);
    //card and trans-to-delete exist
    if (cardToEdit && transToRemove) {
      const remainTrans = card.trans.filter(({ id }) => id !== idToDelete);
      cardToEdit['trans'] = remainTrans;
      setAllCards([...allCards])
    }
  }

  const removeCard = (card) => {
    const remainCards = allCards.filter(({ number }) => number !== card.number);
    setAllCards([...remainCards]);
  }

  return (
    <div className='AllCards'>
      <button
        className={classnames('generalButton', 'addNewCardButton')}
        type='button'
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
        <div className={"imageColumn"}>
          <button
            className={classnames('generalButton', 'getSummaryButton')}
            onClick={() => setActiveViewingCard(-1)}
          >
            <b>Summary</b>
          </button>
          {allCards.map((card) => {
            return (
              <CardImage
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
            addTransaction={(card, trans) => addTransaction(card, trans)}
            deleteTransaction={(card, id) => deleteTransaction(card, id)}
          />
        </div>
      </div>
    </div>
  );
}

export default AllCards;
