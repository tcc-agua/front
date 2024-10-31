import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Sidebar } from '../Sidebar/Sidebar';
import { useTheme } from '../ThemeContext/ThemeContext';
import DarkMode from '../ThemeButton/ThemeButton';
import logo from "../../../public/logo.svg";
import user from "../../assets/images/user.svg";
import userWhite from '../../assets/images/darkmode_icons/perfilWhite.svg';
import HamburgerMenu from '../Hamburguer/HamburgerMenu';
import { fetchUserInfo } from '../../api/api';
import { UserModal } from '../UserModal/UserModal'; // Importando o modal

interface UserProfile {
    name: string;
    email: string;
}

export function Navbar() {
    const [dataProfile, setDataProfile] = useState<UserProfile | null>(null);
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar o modal

    useEffect(() => { 
        async function fetchProfile() {
            const response = await fetchUserInfo();
            setDataProfile(response);
        }
        fetchProfile();
    }, []);
    
    const { isDarkMode } = useTheme();
    const [sidebarVisible, setSidebarVisible] = useState(false);
 
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleIconClick = () => {
        if (window.innerWidth <= 680) {
            setModalVisible(true); // Abre o modal se a tela for pequena
        }
    };

    const closeModal = () => {
        setModalVisible(false); // Fecha o modal
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
                    <button className={styles.nav_content_options} onClick={handleIconClick}>
                        <img
                            src={isDarkMode ? userWhite : user}
                            alt="user"
                            className={styles.icons}
                        />
                        {/* Para telas grandes, mostra o nome do usuário */}
                        {window.innerWidth > 690 && <span>{dataProfile?.name}</span>}
                    </button>
                    <DarkMode />
                </nav>
            </header>
            <Sidebar className={sidebarVisible ? styles.showSidebar : styles.hideSidebar} />
            {modalVisible && <UserModal name={dataProfile?.name} onClose={closeModal} />} {/* Renderiza o modal apenas em telas pequenas */}
        </>
    );
}
