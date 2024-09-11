// ColetaItem.tsx
import React, { useState } from 'react';
import styles from './ColectItem.module.css';
import arrow from '../../assets/images/arrow.svg';
import arrowlong from '../../assets/images/arrow-right-long-solid.svg';

interface Detail {
  id: number;
  tipo: string;
  ponto: string;
  dados: any; // Ajuste o tipo de acordo com os dados que você espera
}

interface ColetaItemProps {
  date: string;
  description: string;
  details: Detail[];
  onOpenDetail: (detail: Detail) => void;
}

const ColetaItem: React.FC<ColetaItemProps> = ({ date, description, details, onOpenDetail }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.coleta} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.title}>
        <p className={styles.date}>{date}</p>
        <div className={styles.separator}></div>
        <p className={styles.description}>{description}</p>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
          <img src={arrow} alt="Arrow" style={{ width: '16px', height: '16px' }} />
        </span>
      </div>

      {isOpen && (
        <div className={styles.details}>
          {details.map(detail => (
            <div key={detail.id} className={styles.detailContainer}>
              <button
                onClick={(e) => { e.stopPropagation(); onOpenDetail(detail); }}
                className={styles.detailButton}
              >
                <span className={styles.label}>{detail.tipo}</span>
                <span className={styles.number}>{detail.ponto}</span>

                <button
                  onClick={(e) => { e.stopPropagation(); onOpenDetail(detail); }}
                  className={styles.viewButton}
                >
                  <pre className={styles.arrow}>Visualizar ⟶</pre>
                </button>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColetaItem;
