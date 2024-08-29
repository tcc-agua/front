import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';


const API_BASE_URL = "http://localhost:5173";

interface UserAttributes {
  [key: string]: string;
}

const Login: React.FC = () => {

  const handleLogin = () => {
    window.location.href = 'http://localhost:5173/oauth2/authorization/azure';
  };

  interface UserInfo {
    id_token: string;
    access_token: string;
    user_attributes: UserAttributes;
  }

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/userinfo`);
        const userData: UserInfo = response.data;

        setUserInfo(userData);
        localStorage.setItem("id_token", userData.id_token);
        
        console.log(localStorage.getItem("id_token"))
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
        setError("Erro ao buscar informações do usuário.");
      }
    };

    fetchUserInfo();
  }, []);

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

            <button className={styles.login_button} onClick={handleLogin} >Entrar</button>

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