import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <p className={styles.letra}>Perfil do usuário</p>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
          <div className={styles.content}>
            <div className={styles.mainContent}>
                <div className={styles.profile}>
                  <div className={styles.avatar}>
                      <img src="#" alt="" />
                  </div>
                  <p className={styles.family_name}>Felipe Ribas (FCM/Ct)</p>
                  <p className={styles.email}>felipinho@rb.bosch.com</p>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Modal;
