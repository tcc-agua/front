import React, { useState } from 'react';
import styles from './HamburgerMenu.module.css';
import { Link } from 'react-router-dom';
import homeIcon from '../../assets/images/home.svg'
import mapIcon from '../../assets/images/mapa.svg';
import plusIcon from '../../assets/images/mais.svg';
import historyIcon from '../../assets/images/historico.svg';
import exportIcon from '../../assets/images/exportar.svg';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.hamburgerMenuContainer}>
      <button
        className={styles.hamburgerIcon}
        onClick={toggleMenu}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
      </button>
      <nav
        className={`${styles.menu} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
      >
        <ul className={styles.menuList}>
          <li className={styles.options}>
            <Link className={styles.contentOptions} to="/inicial">
              <img src={homeIcon} alt="Página Inicial" className={styles.imagem} />
              <p>Página Inicial</p>
            </Link>
          </li>
          <li className={styles.options}>
            <Link className={styles.contentOptions} to="/inicial/mapa">
              <img src={mapIcon} alt="Mapa 3D" className={styles.imagem} />
              <p>Mapa 3D</p>
            </Link>
          </li>
          <li className={styles.options}>
            <Link className={styles.contentOptions} to="/inicial/coleta_de_dados">
              <img src={plusIcon} alt="Coleta de Dados" className={styles.imagem} />
              <p>Coleta de Dados</p>
            </Link>
          </li>
          <li className={styles.options}>
            <Link className={styles.contentOptions} to="/inicial/historico">
              <img src={historyIcon} alt="Histórico" className={styles.imagem} />
              <p>Histórico</p>
            </Link>
          </li>
          <li className={styles.options}>
            <Link className={styles.contentOptions} to="/inicial/exportar_excel">
              <img src={exportIcon} alt="Exportar Excel" className={styles.imagem} />
              <p>Exportar Excel</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
