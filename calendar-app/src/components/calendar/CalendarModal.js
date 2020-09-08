import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const initialState = true;
    const [isOpen, setIsOpen] = useState(initialState);

    const closeModal = () => {
        console.log('Closing...');
        setIsOpen(false);
    };

    return (
        <Modal
          isOpen={ isOpen }
          //onAfterOpen={afterOpenModal}
          onRequestClose={ closeModal }
          style={customStyles}
          closeTimeoutMS={ 200 }
          className="modal"
          overlayClassName="modal-fondo"
        >
            <h1>Hola Modal</h1>
            <hr/>
            <span>Hola de nuevo...</span>
        </Modal>
    );
};
