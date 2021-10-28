import React, { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import './CardBreakdown.scss';

const CardBreakdown = ({ card, addTransaction, deleteTransaction }) => {
  const { trans } = card;
  const initialState = {
    date: '',
    merchant: '',
    amount: ''
  };

  const [newEntryData, setNewEntryData] = useState(initialState);

  const [disabled, setDisabled] = useState(true);

  // const [currentBalance, setCurrentBalance] = useState(getCurrentBalance);

  useEffect(() => {
    if (Object.values(newEntryData).some(inputField => inputField.length === 0)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [newEntryData]);

  if (!card || card === -1) {
    return (
      <div className={"CardBreakdown__summary"}>
        <h1>Summary</h1>
        <h2>Total Number of Cards: </h2>
        <h2>Total amount unused: </h2>
        <h2>Spent: </h2>
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

  const getCurrentBalance = () => {
    // local storage can only store string, and leaving card intact
    const allTransactions = []
    if (trans) {
      trans.forEach(num => allTransactions.push(parseInt(num.amount)));
      let total = allTransactions.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      )
      return parseInt(card.remainBalance) - total;
    } else {
      return parseInt(card.remainBalance);
    }
  }


  return (
    <div className={"CardBreakdown"}>
      <div className={'CardBreakdown_overview'}>
        <h1>{card.number}</h1>
      </div>

      <table className={"CardBreakdown__transactionTable"}>
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Balance<sup>{formatter.format(parseInt(card.remainBalance))}</sup></th>
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
                  <button
                  >
                    <RiDeleteBin5Line
                      id={item.id}
                      onClick={(e) => deleteTransaction(card, e.target.id)}
                    />
                  </button>
                </td>
                <td>{item.date}</td>
                <td>{item.merchant}</td>
                <td>{formatter.format(parseInt(item.amount))}</td>
              </tr>
            )
          })}
        </tbody>

        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>{formatter.format(getCurrentBalance())}</th>
          </tr>

        </tfoot>
      </table>

      <form className={'CardBreakdown__transForm'}>
        <button
          className={'CardBreakdown__addEntryButton'}
          onClick={addNewTransEntry}
          disabled={disabled}
        >
          <IoIosAddCircleOutline />
        </button>

        <input
          type='date'
          name='date'
          value={newEntryData.date}
          onChange={handleInputChange}
          placeholder={'Transaction Date'}
        >
        </input>

        <input
          type='text'
          name='merchant'
          value={newEntryData.merchant}
          onChange={handleInputChange}
          placeholder={'Merchant'}
        >
        </input>

        <input
          type='number'
          name='amount'
          value={newEntryData.amount}
          onChange={handleInputChange}
          placeholder={'Amount'}
        >
        </input>
      </form>

    </div>
  )
}

export default CardBreakdown;
