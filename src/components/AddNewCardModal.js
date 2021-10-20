import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import ReactDom from 'react-dom';
import './AddNewCardModal.scss'

const AddNewCardModal = ({ open, onClose }) => {
  const [data, setData] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
    balance: 0
  });

  const [addButtonDisabled, setAddButtonDisabled] = useState(false);



  if (!open) {
    return null
  }

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

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
          />

          <form className={'AddNewCardModal__form'}>
            <input
              type="number"
              name="number"
              placeholder="Card Number"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="cvc"
              placeholder="CVC"
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="expiry"
              placeholder="Expire Date"
              onChange={handleInputChange}
            />

          </form>

          <button
            className='AddNewCardModal__submitButton'
            onClick={e => handleInputChange(e)}>
            Add Card
        </button>

          <button
            className='AddNewCardModal__closeButton'
            onClick={onClose}>
            Close
        </button>
        </div>
      </div>
    </React.Fragment>,
    document.getElementById('portal')
  )
}


export default AddNewCardModal;