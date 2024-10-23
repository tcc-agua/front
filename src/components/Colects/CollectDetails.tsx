import React from 'react';
import styles from './CollectItem.module.css';

interface Detail {
  id: number;
  tipo: string;
  ponto: string;
  dados: any;
}

interface ColetaDetailsProps {
  details: Detail[];
  onOpenDetail: (detail: Detail) => void;
}

const ColetaDetails: React.FC<ColetaDetailsProps> = ({ details, onOpenDetail }) => {
  return (
    <div className={styles.details}>
      {details.map((detail) => (
        <div key={detail.id} className={styles.detailContainer}>
          <div
            className={styles.detailButton}
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(detail);
            }}
          >
            <div className={styles.texts}>
              <span className={styles.label}>{detail.tipo}</span>
              <pre>–</pre>
              <span className={styles.number}>{detail.ponto}</span>
            </div>
            <span className={styles.viewButton}>
              <p className={styles.viewP}>visualizar</p>
              <pre className={styles.arrow}>⟶</pre>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColetaDetails;

