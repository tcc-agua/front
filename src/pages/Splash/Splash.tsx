import React, { useEffect, useState } from 'react';
import styles from './Splash.module.css';

const SplashPage: React.FC = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 4000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.splashContainer} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.dropContainer}>
        <div className={styles.drop}></div>
      </div>
    </div>
  );
};

export default SplashPage;
