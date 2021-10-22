import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';

import './CardPreview.scss';

const CardPreview = ({ card, selectCard }) => {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  return (
    <React.Fragment>
      <div className={'CardPreview'}
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
        <p>Balance: {card.remainBalance ? formatter.format(card.remainBalance) : null}</p>
      </div>
    </React.Fragment>
  )
}

export default CardPreview;
