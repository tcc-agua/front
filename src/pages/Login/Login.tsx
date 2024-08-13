import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left_side}>
        <div className={styles.header_left}>
          <img className={styles.logo} src="\public\logo.svg" alt="logo" />
          <p className={styles.title}>WISE</p>
          <div className={styles.vertical_line}></div>
          <p className={styles.subtitle}>Waterground Information and Sampling Engine</p>
        </div>
        <div className={styles.content_left_side}>
          <div className={styles.content_left_side_main}>
            <h1>Seja bem_vindo(a)!</h1>
            <p>Entre e explore nossos recursos de amostragem de água.</p>
            <Link className={styles.login_button} to={'/inicial'}>Entrar</Link>
          </div>
        </div>
        <div className={styles.footer_left}>
          <div className={styles.bosch_logo}>
            <img className={styles.bosch} src="src\assets\images\logo_bosch.svg" alt="logo_bosch" />
          </div>
        </div>
      </div>
      <div className={styles.right_side}>
        <div className={styles.content_right_side}>
            <div className={styles.content_names_sector}>
              <p>Engineering Technical School _ Ca</p>  
            </div>
            <div className={styles.content_img}>
              <img src="src/assets/images/celular.svg" alt="Celular" />
            </div>
            <div className={styles.content_names_sector}>
              <p className={styles.footer_right_side}>Facility Management _ Ct</p>  
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
