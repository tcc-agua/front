import React, { useState } from 'react';
import styles from './ColectItem.module.css';

interface ColetaItemProps {
  date: string;
  description: string;
  details: string;
}

const ColetaItem: React.FC<ColetaItemProps> = ({ date, description, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.coleta} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.title}>
        <h1 className={styles.date}>{date}</h1>
        <div className={styles.separator}></div>
        <p className={styles.description}>{description}</p>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
      </div>

      {isOpen && (
        <div className={styles.details}>
          <p>{details}</p>
        </div>
      )}
    </div>
  );
};

export default ColetaItem;
