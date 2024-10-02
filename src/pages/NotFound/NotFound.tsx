// src/pages/NotFound/NotFound.tsx
import React from 'react';
import notfound from '../../assets/images/404.svg';
import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';
import bsc from '../../assets/images/logo-bosch.svg';
import { useAuth } from '../../hooks/useAuth';

const NotFound: React.FC = () => {
    const { isAuthenticated } = useAuth(); 

    if (isAuthenticated) {
        return (
            <div className={styles.pagetotal}>
                <div className={styles.image}>
                    <img src={notfound} alt="Not Found" />
                </div>
                <div className={styles.outrolado}>
                    <div className={styles.nav}>
                        <p>Engineering Technical School - Ca</p>
                    </div>

                    <div className={styles.cont}>
                        <p className={styles.erro}>ERRO 404</p>
                        <p className={styles.ops}>Oops!</p>
                        <p className={styles.not}>Não encontramos a página que você estava procurando.</p>
                    </div>

                    <div className={styles.cont_button}>
                        <Link to={'/inicial'} className={styles.buttonHome}>
                            Voltar para página inicial
                        </Link>
                    </div>

                    <div className={styles.logo_bsc}>
                        <img src={bsc} alt="logo-Bosch" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pagetotal}>
            <div className={styles.image}>
                <img src={notfound} alt="Not Found" />
            </div>
            <div className={styles.outrolado}>
                <div className={styles.nav}>
                    <p>Engineering Technical School - Ca</p>
                </div>

                <div className={styles.cont}>
                    <p className={styles.erro}>ERRO 404</p>
                    <p className={styles.ops}>Oops!</p>
                    <p className={styles.not}>Não encontramos a página que você estava procurando.</p>
                </div>

                <div className={styles.cont_button}>
                    <Link to={'/login'} className={styles.buttonHome}>
                        Voltar para Login
                    </Link>
                </div>

                <div className={styles.logo_bsc}>
                    <img src={bsc} alt="logo-Bosch" />
                </div>
            </div>
        </div>
    );
};

export default NotFound;
