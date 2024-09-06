import { useState } from 'react';
import styles from './Navbar.module.css';

import { Sidebar } from '../Sidebar/Sidebar';
import { useTheme } from '../ThemeContext/ThemeContext';
import Modal from '../Modal/Modal';
import DarkMode from '../ThemeButton/ThemeButton';

//icons
import logo from "../../../public/logo.svg";
import user from "../../assets/images/user.svg";
import userWhite from '../../assets/images/darkmode_icons/perfilWhite.svg';
import HamburgerMenu from '../Hamburguer/HamburgerMenu';

export function Navbar() {
    const { isDarkMode } = useTheme();

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                    <button className={styles.nav_content_options} onClick={handleOpenModal}>
                        <img
                            src={isDarkMode ? userWhite : user}
                            alt="user"
                            className={styles.icons}
                        />
                        <span>Perfil</span>
                    </button>
                    <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
                    <DarkMode />
                </nav>
            </header>
            <Sidebar className={sidebarVisible ? styles.showSidebar : styles.hideSidebar} />
        </>
    );
}
