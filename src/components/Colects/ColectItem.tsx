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

  return (
    <div className={styles.coleta} onClick={toggleOpen}>
      <div className={styles.title}>
        <p className={styles.date}>{date}</p>
        <div className={styles.separator}></div>
        <p className={styles.description}>{description}</p>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 1s' }}>
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
                  <span className={styles.label}>{detail.tipo}</span>
                  <span className={styles.number}>{detail.ponto}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onOpenDetail(detail); }}
                  className={styles.viewButton}
                >
                  <pre className={styles.arrow}>Visualizar   ⟶</pre>
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
