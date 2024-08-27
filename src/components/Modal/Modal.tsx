import React, { useState } from "react";
import styles from "./Modal.module.css";
import perfil from '../../assets/images/perfil.svg'
import acessibilidade from '../../assets/images/acessibilidade.svg'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("perfil");

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <p className={styles.letra}>Configurações</p>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.sidebar}>
            <ul>
              <li
                className={`${styles.menuItem} ${
                  activeTab === "perfil" ? styles.activeItem : ""
                }`}
                onClick={() => setActiveTab("perfil")}
              >
                <div className={styles.blue}></div>
                <img src={perfil} alt="perfil" className={styles.icone}/>
                Perfil
              </li>
              <li
                className={`${styles.menuItem} ${
                  activeTab === "acessibilidade" ? styles.activeItem : ""
                }`}
                onClick={() => setActiveTab("acessibilidade")}
              >
                <div className={styles.blue}></div>
                <img src={acessibilidade} alt="acessibilidade" className={styles.icone} />
                Acessibilidade
              </li>
            </ul>
          </div>
          <div className={styles.content}>
            <div className={styles.mainContent}>
              {activeTab === "perfil" ? (
                <div className={styles.profile}>
                  <div className={styles.avatar}></div>
                  <p>Fulano de tal</p>
                </div>
              ) : (
                <div>
                  <p>Ajuste suas preferências aqui.</p>
                  <button className={styles.saveButton}>Salvar Alterações</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
