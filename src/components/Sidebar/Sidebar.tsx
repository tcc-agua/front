import { Link, useLocation } from "react-router-dom";
import styles from './Sidebar.module.css';
import { useTheme } from '../ThemeContext/ThemeContext'; // Importa o contexto
import HomeIMG from '../../assets/images/home.svg';
import HomeBlueIMG from '../../assets/images/home-blue.svg';
import MapaIMG from '../../assets/images/mapa.svg';
import MapaBlueIMG from '../../assets/images/mapa-blue.svg';
import MaisIMG from '../../assets/images/mais.svg';
import MaisBlueIMG from '../../assets/images/mais-blue.svg';
import HistoricoIMG from '../../assets/images/historico.svg';
import HistoricoBlueIMG from '../../assets/images/historico-blue.svg';
import ExportarIMG from '../../assets/images/exportar.svg';
import ExportarBlueIMG from '../../assets/images/exportar-blue.svg';

//dark mode icons
import HomeWhite from '../../assets/images/darkmode_icons/home_white.svg';
import MapaWhite from '../../assets/images/darkmode_icons/map_white.svg';
import MaisWhite from '../../assets/images/darkmode_icons/plus_white.svg';
import HistoricoWhite from '../../assets/images/darkmode_icons/historic_white.svg';
import ExportarWhite from '../../assets/images/darkmode_icons/export_white.svg';

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const location = useLocation();
    const { isDarkMode } = useTheme(); // Consome o contexto

    const getIcon = (defaultIcon: string, blueIcon: string, whiteIcon: string, path: string) => {
        return location.pathname === path ? blueIcon : (isDarkMode ? whiteIcon : defaultIcon);
    };

    const handleLogout = () => {
        window.location.href = 'http://localhost:5173/logout';
      };

    return (
        <aside className={`${styles.container} ${className}`}>
            <header className={styles.header_container}>
                <img src="/logo.svg" alt="logo" className={styles.logo} />
                <p className={styles.title_side}>WISE</p>
            </header>
            <section>
                <div className={`${styles.options} ${location.pathname === '/inicial' ? styles.active : ''}`}>
                    <Link className={styles.content_options} to={"/inicial"}>
                        <div className={styles.blue}></div>
                        <img
                            src={getIcon(HomeIMG, HomeBlueIMG, HomeWhite, '/inicial')}
                            alt="home"
                            className={styles.imagem}
                        />
                        <p>Página Inicial</p>
                    </Link>
                </div>

                <div className={`${styles.options} ${location.pathname === '/inicial/mapa' ? styles.active : ''}`}>
                    <Link className={styles.content_options} to={"/inicial/mapa"}>
                        <div className={styles.blue}></div>
                        <img
                            src={getIcon(MapaIMG, MapaBlueIMG, MapaWhite, '/inicial/mapa')}
                            alt="map"
                        />
                        <p>Mapa 3D</p>
                    </Link>
                </div>

                <div className={`${styles.options} ${location.pathname === '/inicial/coleta_de_dados' ? styles.active : ''}`}>
                    <Link className={styles.content_options} to={"/inicial/coleta_de_dados"}>
                        <div className={styles.blue}></div>
                        <img
                            src={getIcon(MaisIMG, MaisBlueIMG, MaisWhite, '/inicial/coleta_de_dados')}
                            alt="mais"
                        />
                        <p>Coleta de Dados</p>
                    </Link>
                </div>

                <div className={`${styles.options} ${location.pathname === '/inicial/historico' ? styles.active : ''}`}>
                    <Link className={styles.content_options} to={"/inicial/historico"}>
                        <div className={styles.blue}></div>
                        <img
                            src={getIcon(HistoricoIMG, HistoricoBlueIMG, HistoricoWhite, '/inicial/historico')}
                            alt="historic"
                        />
                        <p>Histórico</p>
                    </Link>
                </div>

                <div className={`${styles.options} ${location.pathname === '/inicial/exportar_excel' ? styles.active : ''}`}>
                    <Link className={styles.content_options} to={"/inicial/exportar_excel"}>
                        <div className={styles.blue}></div>
                        <img
                            src={getIcon(ExportarIMG, ExportarBlueIMG, ExportarWhite, '/inicial/exportar_excel')}
                            alt="export"
                        />
                        <p>Exportar Excel</p>
                    </Link>
                </div>
                <div>
                    <button onClick={handleLogout}> SAIR </button>
                </div>
            </section>
        </aside>
    );
}
