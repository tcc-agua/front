import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Splash.module.css';
import drop from '../../assets/images/drop.png'

const SplashPage: React.FC = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 4000);

    const redirectTimer = setTimeout(() => {
      navigate('/login');
    }, 5000); 

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className={`${styles.splashContainer} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.imageContainer}>
        <img src={drop} alt="Splash Image" className={styles.image} />
      </div>
    </div>
  );
};

export default SplashPage;
