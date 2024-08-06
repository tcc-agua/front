import React from 'react';
import '../styles/Login.css';

const Login: React.FC = () => {
  return (
    <div className="container">
      <div className="left-side">
        <div className='topo-left'>
          <img className='logo' src="\public\logo.svg" alt="logo" />
          <p className='escrita-logo'>WISE</p>
          <div className="linha-vertical"></div>
          <p className='frase'>Waterground Information and Sampling Engine</p>
        </div>
        <div className='content-left-side'>
          <h1>Seja bem-vindo(a)!</h1>
          <p>Entre e explore nossos recursos de amostragem de água.</p>
          <button className="login-button">Entrar</button>
          <img className='bosch' src="src\assets\images\logo-bosch.svg" alt="logo-bosch" />
        </div>
      </div>
      <div className="right-side">
        <div className="content-right-side">
            <div className="content-names-sector">
              <p>Engineering Technical School - Ca</p>  
            </div>
            <div className="content-img">
              <img src="src/assets/images/celular.svg" alt="Celular" />
            </div>
            <div className="content-names-sector">
              <p>Facility Management - Ct</p>  
            </div>
        </div>
      </div>
    </div>
  );

}

export default Login;
