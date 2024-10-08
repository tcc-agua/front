import React from 'react';
import styles from './ModalSuccess.module.css';
import Success from '../../assets/images/success.svg';

interface ModalSuccessProps {
  message: string;
  onClose: () => void;
}

const ModalSuccess: React.FC<ModalSuccessProps> = ({ message, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalTitle}>Sucesso</div>
        <img className={styles.modalImg} src={Success} alt="Success" />
        <div className={styles.modalText}>{message}</div>
      </div>
    </div>
  );
};

export default ModalSuccess;
