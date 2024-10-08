import React from 'react';
import styles from './ModalError.module.css';
import Erro from '../../assets/images/error.svg';

interface ModalErrorProps {
  message: string;
  onClose: () => void;
}

const ModalError: React.FC<ModalErrorProps> = ({ message, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalTitle}>Erro</div>
        <img className={styles.modalImg} src={Erro} alt="Error" />
        <div className={styles.modalText}>{message}</div>
      </div>
    </div>
  );
};

export default ModalError;
