import React from 'react';
import Cards from 'react-credit-cards';
import { RiDeleteBin5Line } from "react-icons/ri";
import 'react-credit-cards/lib/styles.scss';
import './CardImage.scss';

const CardImage = ({ card, selectCard, deleteCard }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  return (
    <React.Fragment>
      <div className={'CardImage'}
        onClick={() => selectCard(card)}
      >
        <Cards
          number={card.number}
          expiry={card.expiry}
          name={card.name}
          cvc={card.cvc}
        />

      </div>
      <div>
        <button
          className={'CardImage__deleteCardButton'}
          onClick={() => deleteCard(card)}
        >
          <RiDeleteBin5Line />
        </button>
        <p
          className={'CardImage__remainBalance'}
        >
          Balance: {formatter.format(card.remainBalance)}
        </p>
      </div>
    </React.Fragment>
  )
}

export default CardImage;
