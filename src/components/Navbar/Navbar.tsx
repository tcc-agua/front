import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Sidebar } from '../Sidebar/Sidebar';
import logo from "../../../public/logo.svg"
import user from '../../assets/images/user.svg'
import config from "../../assets/images/config.svg"
import HamburgerMenu from '../Hamburguer/HamburgerMenu';

export function Navbar() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <>
            <header className={styles.container_navbar}>
                <div className={styles.menu_icon} onClick={toggleSidebar}>
                    <HamburgerMenu />
                </div>
                <div className={styles.logo_container}>
                    <img src={logo} alt="logo" />
                </div>
                <nav className={styles.nav_options}>
                    <Link className={styles.nav_content_options} to={'/perfil'}>
                        <img src={user} alt="user" className={styles.icons} />
                        <p className={styles.text_options}>Perfil</p>
                    </Link>
                    <Link className={styles.nav_content_options} to={'/configuracoes'}>
                        <img src={config} alt="config" className={styles.icons} />
                        <p className={styles.text_options}>Configurações</p>
                    </Link>
                </nav>
            </header>
            <Sidebar className={sidebarVisible ? styles.showSidebar : styles.hideSidebar} />
        </>
    );
}
