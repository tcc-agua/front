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
                  <div className={styles.avatar}>
                      <img src="#" alt="" />
                  </div>
                  <p className={styles.family_name}>Felipe Ribas (FCM/Ct)</p>
                  <p className={styles.email}>felipinho@rb.bosch.com</p>
                </div>
              ) : (
                <div className={styles.content_accessibility}>
                  <p className={styles.subtitle}>Ajuste suas preferências aqui.</p>
                  <div className={styles.dark_mode}>
                    <p>Modo escuro</p>
                    <p>-------</p>
                  </div>
                  <div className={styles.libras}>
                    <p>Tradução em libras</p>
                    <p>-------</p>
                  </div>
                  <div className={styles.narration}>
                    <p>Narração das páginas</p>
                    <p>-------</p>
                  </div>
                  <div className={styles.button_content}>
                    <button className={styles.saveButton}>Salvar Alterações</button>
                  </div>
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
