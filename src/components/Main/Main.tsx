import styles from './Main.module.css'
import React from 'react';

type MainProps = React.PropsWithChildren<{}>;

export function Main({ children }: MainProps) {
    return (
        <div className={styles.container_main}>
            {children}
        </div>
    )
}
