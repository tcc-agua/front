import React, { useState } from 'react';
import styles from './HamburgerMenu.module.css';
import { Link } from 'react-router-dom';

import { useTheme } from '../ThemeContext/ThemeContext';

//black icons
import HomeIMG from '../../assets/images/home.svg';
import MapaIMG from '../../assets/images/mapa.svg';
import MaisIMG from '../../assets/images/mais.svg';
import HistoricoIMG from '../../assets/images/historico.svg';
import ExportarIMG from '../../assets/images/exportar.svg';
import MenuIMG from '../../assets/images/menu.svg';

//blue icons
import HomeBlueIMG from '../../assets/images/home-blue.svg';
import MapaBlueIMG from '../../assets/images/mapa-blue.svg';
import MaisBlueIMG from '../../assets/images/mais-blue.svg';
import HistoricoBlueIMG from '../../assets/images/historico-blue.svg';
import ExportarBlueIMG from '../../assets/images/exportar-blue.svg';

//white icons
import HomeWhite from '../../assets/images/darkmode_icons/home_white.svg';
import MapaWhite from '../../assets/images/darkmode_icons/map_white.svg';
import MaisWhite from '../../assets/images/darkmode_icons/plus_white.svg';
import HistoricoWhite from '../../assets/images/darkmode_icons/historic_white.svg';
import ExportarWhite from '../../assets/images/darkmode_icons/export_white.svg';
import MenuWhite from '../../assets/images/menuWhite.svg';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const getIcon = (defaultIcon: string, blueIcon: string, whiteIcon: string, path: string) => {
    return location.pathname === path ? blueIcon : (isDarkMode ? whiteIcon : defaultIcon);
  };

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
        <img src={isDarkMode ? MenuWhite : MenuIMG}></img>
      </button>

      {/* Overlay Escuro */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}

      <nav
        className={`${styles.menu} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
      >
        <button 
          className={styles.voltar}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={isOpen}>
            <pre>←     Voltar</pre>
        </button>
        <section className={styles.container}>
          <div className={`${styles.options} ${location.pathname === '/inicial' ? styles.active : ''}`}>
            <Link className={styles.content_options} to={"/inicial"}>
              <div className={styles.blue}></div>
              <img
                src={getIcon(HomeIMG, HomeBlueIMG, HomeWhite, '/inicial')}
                alt="home"
                className={styles.imagem}
              />
              <p className={styles.pages}>Página Inicial</p>
            </Link>
          </div>

          <div className={`${styles.options} ${location.pathname === '/inicial/mapa' ? styles.active : ''}`}>
            <Link className={styles.content_options} to={"/inicial/mapa"}>
              <div className={styles.blue}></div>
              <img
                src={getIcon(MapaIMG, MapaBlueIMG, MapaWhite, '/inicial/mapa')}
                alt="map"
              />
              <p className={styles.pages}>Mapa 3D</p>
            </Link>
          </div>

          <div className={`${styles.options} ${location.pathname === '/inicial/coleta_de_dados' ? styles.active : ''}`}>
            <Link className={styles.content_options} to={"/inicial/coleta_de_dados"}>
              <div className={styles.blue}></div>
              <img
                src={getIcon(MaisIMG, MaisBlueIMG, MaisWhite, '/inicial/coleta_de_dados')}
                alt="mais"
              />
              <p className={styles.pages}>Coleta de Dados</p>
            </Link>
          </div>

          <div className={`${styles.options} ${location.pathname === '/inicial/historico' ? styles.active : ''}`}>
            <Link className={styles.content_options} to={"/inicial/historico"}>
              <div className={styles.blue}></div>
              <img
                src={getIcon(HistoricoIMG, HistoricoBlueIMG, HistoricoWhite, '/inicial/historico')}
                alt="historic"
              />
              <p className={styles.pages}>Histórico</p>
            </Link>
          </div>

          <div className={`${styles.options} ${location.pathname === '/inicial/exportar_excel' ? styles.active : ''}`}>
            <Link className={styles.content_options} to={"/inicial/exportar_excel"}>
              <div className={styles.blue}></div>
              <img
                src={getIcon(ExportarIMG, ExportarBlueIMG, ExportarWhite, '/inicial/exportar_excel')}
                alt="export"
              />
              <p className={styles.pages}>Exportar Excel</p>
            </Link>
          </div>
        </section>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
