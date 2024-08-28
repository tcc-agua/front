import React, { useEffect, useState } from 'react';
import styles from './LoadingMap.module.css';

interface LoadingProps {
  duration: number;
}

const Loading: React.FC<LoadingProps> = ({ duration }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Temporizador
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration * 1000);

    // Limpa o temporizador
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingBox}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default Loading;
