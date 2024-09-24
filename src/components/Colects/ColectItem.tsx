// ColetaItem.tsx
import React, { useState, useRef } from 'react';
import styles from './ColectItem.module.css';
import arrow from '../../assets/images/arrow.svg';

interface Detail {
  id: number;
  tipo: string;
  ponto: string;
  dados: any; 
}

interface ColetaItemProps {
  date: string;
  description: string;
  details: Detail[];
  onOpenDetail: (detail: Detail) => void;
}

const ColetaItem: React.FC<ColetaItemProps> = ({ date, description, details, onOpenDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const filterLetters = (text: string) => {
    return text.replace(/[^a-zA-Z]/g, '');
  };

  const filterNumbers = (text: string) => {
    return text.replace(/[^0-9]/g, '');
  };

  return (
    <div className={styles.coleta} onClick={toggleOpen}>
      <div className={styles.title}>
        <p className={styles.date}>{date}</p>
        <div className={styles.separator}></div>
        <p className={styles.description}>{description}</p>
        <span
          className={styles.rotateArrow}
          onClick={(e) => {
            e.stopPropagation();
            toggleOpen();
          }}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <img src={arrow} alt="Arrow" style={{ width: '16px', height: '16px' }} />
        </span>
      </div>

      <div
        ref={detailsRef}
        className={`${styles.detailsWrapper} ${isOpen ? styles.open : ''}`}
        style={{ height: isOpen ? `${detailsRef.current?.scrollHeight}px` : '0' }}
      >
        <div className={styles.details}>
          {details.map(detail => (
            <div key={detail.id} className={styles.detailContainer}>
              <button
                onClick={(e) => { e.stopPropagation(); onOpenDetail(detail); }}
                className={styles.detailButton}
              >
                <div className={styles.texts}>
                  <span className={styles.label}>{filterLetters(detail.tipo)}</span>
                  <pre>–</pre>
                  <span className={styles.number}>{filterNumbers(detail.ponto)}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onOpenDetail(detail); }}
                  className={styles.viewButton}
                >
                  <pre className={styles.arrow}>⟶</pre>
                </button>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColetaItem;
