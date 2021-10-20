import React from 'react';
import ReactDom from 'react-dom';

import './AddNewCardModal.scss'

const AddNewCardModal = ({ open, children, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(

    <React.Fragment>
      <div className='AddNewCardModal__overlay'>
      </div>


      <div className={'AddNewCardModal__content'}>
        aksjhfjasndfkasdhfaskd
        <button onClick={onClose}>
          Close Modal
        </button>
      </div>
    </React.Fragment>,
    document.getElementById('portal')
  )
}

export default AddNewCardModal;