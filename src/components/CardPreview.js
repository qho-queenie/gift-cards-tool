import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';

import './CardPreview.scss';

const CardPreview = (cardInfo) => {
  const { store, cardNumber, expDate, cvc, remainBalance } = cardInfo.card;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  return (
    // generate a lil card
    <div className={'CardPreview'}>
      <Cards
        number={cardNumber}
        expiry={expDate ? expDate : '01/99'}
        name={store}
        cvc={cvc ? cvc : '111'}
      />
      {remainBalance ?
        <div className={'CardPreview__cardInfo'}>
          <p>Remaining Balance {formatter.format(remainBalance)}</p>
        </div>
        : null
      }
    </div>
  )


}

export default CardPreview;
