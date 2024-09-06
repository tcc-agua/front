import React from "react";
import styles from './ThemeButton.module.css';
import lua from '../../assets/images/lua.svg';
import sol from '../../assets/images/darkmode_icons/sol.svg';
import { useTheme } from '../ThemeContext/ThemeContext'; // Importa o contexto

const ThemeButton: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme(); // Consome o contexto

    return (
        <div className={styles.dark_mode}>
            <button 
                className={styles.theme_button}
                onClick={toggleTheme}
            >
                <img
                    src={isDarkMode ? sol : lua}
                    alt={isDarkMode ? 'Ícone do sol' : 'Ícone da lua'}
                    className={isDarkMode ? styles.icon_sol : styles.icon_lua}
                />
                <span>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
            </button>
        </div>
    );
};

export default ThemeButton;
