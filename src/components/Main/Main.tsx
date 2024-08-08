import styles from './Main.module.css'
import React from 'react';

const Main: React.FC = ({ children }) => {
    return (
        <div className={styles.container_main}>
            {children}
        </div>
    )
}

export default Main;
