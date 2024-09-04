import React from "react";
import styles from './ThemButton.module.css';

const DarkMode: React.FC = () => {
    const setDarkMode = () => {
        document.querySelector("body")?.setAttribute('data-theme', 'dark')
        localStorage.setItem("selectedTheme", "dark")
    }

    const setLightMode = () => {
        document.querySelector("body")?.setAttribute('data-theme', 'light')
        localStorage.setItem("selectedTheme", "light")
    }

    const selectedTheme = localStorage.getItem("selectedTheme")
    if(selectedTheme === "dark"){
        setDarkMode()
    }

    const ToggleTheme = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.checked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    };

    return (
        <div className={styles.dark_mode}>
            <input
                className={styles.dark_mode_input}
                type='checkbox'
                id='darkmode-toggle'
                onChange={ToggleTheme}
                defaultChecked={selectedTheme === "dark"}
            />
            <label className={styles.dark_mode_label} htmlFor='darkmode-toggle'>
            </label>
        </div>
    );
};

export default DarkMode;
