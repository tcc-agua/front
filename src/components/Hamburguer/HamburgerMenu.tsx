import React, { useState } from 'react';
import styles from './HamburgerMenu.module.css';
import { Link } from 'react-router-dom';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.hamburgerMenuContainer}>
      <button className={styles.hamburgerIcon} onClick={toggleMenu}>
        <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
      </button>
      <nav className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.menuList}>
          <li className={styles.options}>
            <Link className={styles.contentOptions} to="/inicial">
              <img src="src/assets/images/home.svg" alt="home" className={styles.imagem} />
              <p>Página Inicial</p>
            </Link>
          </li>
          <li className={styles.options}>
            <Link className={styles.contentOptions} to="/inicial/mapa">
              <img src="src/assets/images/mapa.svg" alt="map" />
              <p>Mapa 3D</p>
            </Link>
          </li>
          <li className={styles.options}>
            <Link className={styles.contentOptions} to="/inicial/coleta_de_dados">
              <img src="src/assets/images/mais.svg" alt="mais" />
              <p>Coleta de Dados</p>
            </Link>
          </li>
          <li className={styles.options}>
            <Link className={styles.contentOptions} to="/inicial/historico">
              <img src="src/assets/images/Group.svg" alt="historic" />
              <p>Histórico</p>
            </Link>
          </li>
          <li className={styles.options}>
            <Link className={styles.contentOptions} to="/inicial/exportar_excel">
              <img src="src/assets/images/export.svg" alt="export" />
              <p>Exportar Excel</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
