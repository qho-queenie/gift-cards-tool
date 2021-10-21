import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards';
import ReactDom from 'react-dom';
import classnames from 'classnames'
import './AddNewCardModal.scss'

const AddNewCardModal = ({ open, onClose, allCardsNames, addNewCard }) => {
  const initialDataState = {
    cvc: '',
    expiry: '',
    name: '',
    number: '',
    remainBalance: '',
    storeName: ''
  };

  const [data, setData] = useState(initialDataState);

  const [disabled, setDisabled] = useState(false);

  // const cardName = allCardsNames.map((companyName, index) => {
  //   return (
  //     <option
  //       key={`${companyName}${index}`}
  //     >
  //       {companyName}
  //     </option>
  //   )
  // })


  useEffect(() => {
    if (Object.values(data).some(inputField => inputField.length === 0)) {
      setDisabled(true);
    }
    else {
      setDisabled(false);
    }
  }, [data]);


  if (!open) {
    return null
  }

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const closeModal = () => {
    setData({ ...initialDataState })
    onClose();
  }

  const submitNewCard = () => {
    if (!disabled) {
      addNewCard(data);
      setData({ ...initialDataState })
    }
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  return ReactDom.createPortal(
    <React.Fragment>
      <div className='AddNewCardModal__overlay'>
        <div className='AddNewCardModal'>
          <Cards className='AddNewCardModal__liveCardDisplay'
            cvc={data.cvc}
            expiry={data.expiry}
            focus={data.focus}
            name={data.name}
            number={data.number}
            storeName={data.storeName}
          />

          <form className={'AddNewCardModal__form'}>
            <input
              type="number"
              name="number"
              placeholder="Card Number"
              value={data.number}
              onChange={handleInputChange}
            />

            {/* <select>
              <option
                value='none'
                selected="true"
                name="name"
              />
              {cardName}
            </select> */}

            <input
              type='text'
              name='name'
              placeholder='Cardholder Name'
              autoComplete='on'
              value={data.name}
              onChange={handleInputChange}
            />
            <input
              type='text'
              name='storeName'
              placeholder='Store Name'
              autoComplete='on'
              value={data.storeName}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name='cvc'
              placeholder='CVC'
              value={data.cvc}
              min={'100'}
              max={"999"}
              onChange={handleInputChange}
            />
            <input
              type='date'
              name='expiry'
              value={data.expiry}
              placeholder='Expire Date'
              onChange={handleInputChange}
            />
            <input
              className={'currencyInput'}
              type="number"
              name="remainBalance"
              value={data.remainBalance}
              placeholder="Remaining Balance"
              onChange={handleInputChange}
            />
          </form>
          <button
            className={classnames('AddNewCardModal__submitButton')}
            disabled={disabled}
            onClick={submitNewCard}>
            Add Card
        </button>

          <button
            className={'AddNewCardModal__closeButton'}
            onClick={closeModal}
          >
            Close
        </button>
        </div>
      </div>
    </React.Fragment>,
    document.getElementById('portal')
  )
}


export default AddNewCardModal;