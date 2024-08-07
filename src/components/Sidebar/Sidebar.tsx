import { Link } from "react-router-dom"
import styles from './Sidebar.module.css'

export function Sidebar(){
    return(
        <>
        <aside className={styles.container}>
            <header className={styles.header_container}>
                <img src="/logo.svg" alt="logo" className={styles.logo}/>
                <p className={styles.title_side}>WISE</p>
            </header>
            <section>
                <div className={styles.options}>
                    <Link className={styles.content_options} to={"/inicial"}>
                        <img src="src\assets\images\home.svg" alt="home" className={styles.imagem}/>
                        <p>Página Inicial</p>
                    </Link>
                </div>

                <div className={styles.options}>
                    <Link className={styles.content_options} to={"/inicial/mapa"}>
                        <img src="src\assets\images\mapa.svg" alt="map" />
                        <p>Mapa 3D</p>
                    </Link>
                </div>

                <div className={styles.options}>
                    <Link className={styles.content_options} to={"/inicial/coleta_de_dados"}>
                        <img src="src\assets\images\mais.svg" alt="mais" />
                        <p>Coleta de Dados</p>
                    </Link>
                </div>

                <div className={styles.options}>
                    <Link className={styles.content_options} to={"/inicial/historico"}>
                        <img src="src\assets\images\Group.svg" alt="historic" />
                        <p>Histórico</p>
                    </Link>
                </div>
                
                <div className={styles.options}>
                    <Link className={styles.content_options} to={"/inicial/exportar_excel"}>
                        <img src="src\assets\images\export.svg" alt="export" />
                        <p>Exportar Excel</p>
                    </Link>
                </div>
            </section>
        </aside>
        </>
    )
}