import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames'
import Cards from 'react-credit-cards';
import './AddNewCardModal.scss'

const AddNewCardModal = ({ open, onCloseModal, addNewCard }) => {
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

  useEffect(() => {
    if (Object.values(data).some(inputField => inputField.length === 0)) {
      setDisabled(true);
    }
    else {
      setDisabled(false);
    }
  }, [data]);

  // all hooks must be declared before this !open condition, since hooks cant be called conditionally
  if (!open) {
    return null
  }

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const closeModal = () => {
    setData({ ...initialDataState })
    onCloseModal();
  }

  const submitNewCard = () => {
    addNewCard(data);
    setData({ ...initialDataState })
    onCloseModal();
  }

  return ReactDom.createPortal(
    <React.Fragment>
      <div className='AddNewCardModal__overlay'>
        <div className='AddNewCardModal'>
          <Cards className='AddNewCardModal__liveCardDisplay'
            cvc={data.cvc}
            expiry={data.expiry}
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

            <div className={'currencyInput'}>
              <span>$</span>
              <input
                type="number"
                name="remainBalance"
                value={data.remainBalance}
                placeholder="Remaining Balance"
                onChange={handleInputChange}
              />
            </div>
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
