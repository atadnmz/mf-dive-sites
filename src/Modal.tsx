import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

type AppProps = {
  closeModal: (a: boolean) => void;
};

const modalRoot = document.getElementById('modal')!;

const Modal = ({ closeModal }: AppProps) => {
  return createPortal(
    <div className="ModalContainer">
      <div className="ModalContent">
        <span className="close" onClick={() => closeModal(false)}>
          &times;
        </span>
        <div className="modal-header">
          <h2>Information</h2>
        </div>
        <div className="modal-body">
          <ul className="modal-list">
            <li>These data have been taken from https://www.sg.gov.tr/</li>
            <li>Red areas are prohibited.</li>
          </ul>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
