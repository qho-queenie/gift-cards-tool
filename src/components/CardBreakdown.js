import React, { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';
import './CardBreakdown.scss';

const CardBreakdown = ({ card, addTransaction }) => {
  const { trans } = card;
  const initialState = {
    date: '',
    merchant: '',
    amount: ''
  };

  const [newEntryData, setNewEntryData] = useState(initialState);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (Object.values(newEntryData).some(inputField => inputField.length === 0)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [newEntryData])

  if (!card || card === -1) {
    return (
      <div className={"CardBreakdown"}>
        <h1>Summary</h1>
      </div>
    )
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  const handleInputChange = (e) => {
    setNewEntryData({ ...newEntryData, [e.target.name]: e.target.value });
  };

  const addNewTransEntry = () => {
    newEntryData.id = uuidv4();
    addTransaction(card, newEntryData)
    setNewEntryData(initialState)
  };


  return (
    <div className={"CardBreakdown"}>
      <h1>i am cardbreakdown</h1>
      <table className={"CardBreakdown__transactionTable"}>
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>

          {trans && trans.map((item) => {
            return (
              <tr
                key={item.id}
              >
                <td
                  className={'CardBreakdown__deleteCardButton'}

                >
                  <button>
                    <RiDeleteBin5Line />
                  </button>
                </td>
                <td>{item.date}</td>
                <td>{item.merchant}</td>
                <td>{item.amount}</td>
              </tr>
            )
          })}

        </tbody>
      </table>

      <div className={'CardBreakdown__transactionTable'}>
        <table>
          <tbody>
            <tr>
              <td
                className={'CardBreakdown__addEntryButton'}
              >
                <button
                  onClick={addNewTransEntry}
                  disabled={disabled}
                >
                  <IoIosAddCircleOutline />
                </button>
              </td>
              <td>
                <input
                  type='date'
                  name='date'
                  value={newEntryData.date}
                  onChange={handleInputChange}
                  placeholder={'Transaction Date'}
                >
                </input>
              </td>

              <td>
                <input
                  type='text'
                  name='merchant'
                  value={newEntryData.merchant}
                  onChange={handleInputChange}
                  placeholder={'Merchant'}
                >
                </input>
              </td>

              <td>
                <input
                  type='number'
                  name='amount'
                  value={newEntryData.amount}
                  onChange={handleInputChange}
                  placeholder={'Amount'}
                >
                </input>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default CardBreakdown;