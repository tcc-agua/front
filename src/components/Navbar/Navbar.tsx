import { useState } from 'react';
import styles from './Navbar.module.css';
import { Sidebar } from '../Sidebar/Sidebar';
import logo from "../../../public/logo.svg"
import config from "../../assets/images/config.svg"
import HamburgerMenu from '../Hamburguer/HamburgerMenu';
import Modal from '../Modal/Modal';

export function Navbar() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                        <img src={config} alt="config" className={styles.icons} />
                    </button>
                    <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
                </nav>
            </header>
            <Sidebar className={sidebarVisible ? styles.showSidebar : styles.hideSidebar} />
        </>
    );
}
