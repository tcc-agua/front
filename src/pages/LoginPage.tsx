import React from 'react';
import '../styles/Login.css';

const Login: React.FC = () => {
  return (
    <div className="container">
      <div className="left-side">
        <div className='content-left-side'>
          <h1>Seja bem-vindo(a)!</h1>
          <p>Entre e explore nossos recursos de amostragem de água.</p>
          <button className="login-button">Entrar</button>
        </div>
      </div>
      <div className="right-side">
        <div className="content">
            <div className="content-names-sector">
              <p>Engineering Technical School - Ca</p>  
            </div>
            <div className="content-img">
              <img src="src/assets/images/celular.svg" alt="Celular" />
            </div>
        </div>

      </div>
    </div>
  );

}

export default Login;
