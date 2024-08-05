import React from 'react';
import '../styles/Login.css';

const Login: React.FC = () => {
  return (
    <div className="container">
      <div className="left-side">
        <h1>Bem-vindo(a)!</h1>
        <p>Entre e explore nossos recursos de amostragem de água.</p>
        <button className="login-button">Entrar</button>
      </div>
      <div className="right-side">
        <img src="src/assets/images/celular.svg" alt="Celular" />
        <p>COM PONTOS DE</p>
        <p>COLETA <span>ATUALIZADOS</span></p>
      </div>
    </div>
  );

}

export default Login;
