import { Link, useLocation } from "react-router-dom";
import styles from './Sidebar.module.css';
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


interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const location = useLocation();

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
                            src={location.pathname === '/inicial' ? HomeBlueIMG : HomeIMG}
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
                            src={location.pathname === '/inicial/mapa' ? MapaBlueIMG : MapaIMG}
                            alt="map"
                        />
                        <p>Mapa 3D</p>
                    </Link>
                </div>

                <div className={`${styles.options} ${location.pathname === '/inicial/coleta_de_dados' ? styles.active : ''}`}>
                    <Link className={styles.content_options} to={"/inicial/coleta_de_dados"}>
                        <div className={styles.blue}></div>
                        <img
                            src={location.pathname === '/inicial/coleta_de_dados' ? MaisBlueIMG : MaisIMG}
                            alt="mais"
                        />
                        <p>Coleta de Dados</p>
                    </Link>
                </div>

                <div className={`${styles.options} ${location.pathname === '/inicial/historico' ? styles.active : ''}`}>
                    <Link className={styles.content_options} to={"/inicial/historico"}>
                        <div className={styles.blue}></div>
                        <img
                            src={location.pathname === '/inicial/historico' ? HistoricoBlueIMG : HistoricoIMG}
                            alt="historic"
                        />
                        <p>Histórico</p>
                    </Link>
                </div>

                <div className={`${styles.options} ${location.pathname === '/inicial/exportar_excel' ? styles.active : ''}`}>
                    <Link className={styles.content_options} to={"/inicial/exportar_excel"}>
                        <div className={styles.blue}></div>
                        <img
                            src={location.pathname === '/inicial/exportar_excel' ? ExportarBlueIMG : ExportarIMG}
                            alt="export"
                        />
                        <p>Exportar Excel</p>
                    </Link>
                </div>
            </section>
        </aside>
    );
}
