import React, { useState } from 'react';
import styles from './ColectItem.module.css';
import arrow from '../../assets/images/arrow.svg';
import arrowlong from '../../assets/images/arrow-right-long-solid.svg';

interface Detail {
  id: number;
  label: string;
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
        <h1 className={styles.date}>{date}</h1>
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
                <span className={styles.label}>PM</span>
                <span className={styles.number}>{detail.label.split('-')[1].trim()}</span>

                <button
                  onClick={(e) => { e.stopPropagation(); onOpenDetail(detail); }}
                  className={styles.viewButton}
                >
                  Visualizar
                  <img src={arrowlong} alt="Arrow" style={{ marginLeft: '10%'}} />
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
