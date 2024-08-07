import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export function Navbar() {
    return (
        <header className={styles.container_navbar}>
            <section className={styles.welcome}>
                <p>Bem-vindo(a) Felipe Ribas!</p>
            </section>
            <nav className={styles.nav_options}>
                <Link className={styles.nav_content_options} to={'#'}>
                    <img src="src/assets/images/user.svg" alt="user" className={styles.icons} />
                    <p>Perfil</p>
                </Link>

                <Link className={styles.nav_content_options} to={'#'}>
                    <img src="src/assets/images/config.svg" alt="config" className={styles.icons} />
                    <p>Configurações</p>
                </Link>
            </nav>
        </header>
    );
}
