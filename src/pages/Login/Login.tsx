import React from 'react';
import styles from './Login.module.css';

const Login: React.FC = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5173/oauth2/authorization/azure';
  };

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
            <p className={styles.title_welcome}>Seja bem-vindo(a)!</p>
            <p className={styles.subtitle_welcome}>Entre e explore nossos recursos de amostragem de água.</p>
            <button className={styles.login_button} onClick={handleLogin}>Entrar</button>
          </div>
        </div>
        <div className={styles.footer_left}>
          <div className={styles.bosch_logo}>
            <img className={styles.bosch} src="src\assets\images\logo-bosch.svg" alt="logo_bosch" />
          </div>
        </div>
      </div>
      <div className={styles.right_side}>
        <div className={styles.content_right_side}>
            <div className={styles.content_names_sector}>
              <p>Engineering Technical School - Ca</p>  
            </div>
            <div className={styles.content_img}>
              <img src="src/assets/images/celular.svg" alt="Celular" />
            </div>
            <div className={styles.content_names_sector}>
              <p className={styles.footer_right_side}>Facility Management - Ct</p>  
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
