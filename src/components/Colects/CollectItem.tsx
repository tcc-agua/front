import React, { useState, useEffect } from 'react';
import styles from './CollectItem.module.css';
import arrow from '../../assets/images/arrow.svg';
import { fetchColetasByData } from '../../api/api';
import ColetaDetails from './CollectDetails';

interface Detail {
  id: number;
  tipo: string;
  ponto: string;
  dados: any;
}

interface Content {
  id: number;
  date: string;
  description: string;
  details: Detail[];
}

interface ColetaItemProps {
  paramsData: { page: number; size: number; startDate: string; endDate: string; };
  onOpenDetail: (detail: Detail) => void;
}

const ColetaItem: React.FC<ColetaItemProps> = ({ paramsData, onOpenDetail }) => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState<number | null>(null); // Expande uma coleta de cada vez

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchColetasByData({
          startDate: paramsData.startDate,
          endDate: paramsData.endDate,
          page: paramsData.page,
          size: paramsData.size,
        });
        setContent(response.content);
      } catch (e) {
        setError('Erro ao buscar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paramsData]);

  const toggleOpen = (id: number) => {
    setIsOpen(isOpen === id ? null : id); // Expande ou recolhe com base no ID da coleta
  };


  return (
    <div className={styles.coletaList}>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        content.map((item) => (
          <div key={item.id} className={styles.coleta}>
            <div className={styles.title} onClick={() => toggleOpen(item.id)}>
              <p className={styles.date}>{item.date}</p>
              <div className={styles.separator}></div>
              <p className={styles.description}>{item.description}</p>
              <span
                className={styles.rotateArrow}
                style={{ transform: isOpen === item.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <img src={arrow} alt="Arrow" style={{ width: '16px', height: '16px' }} />
              </span>
            </div>

            {isOpen === item.id && (
              <ColetaDetails details={item.details} onOpenDetail={onOpenDetail} />
            )}
          </div>
        ))
      )}
    </div>
    
  );
};

export default ColetaItem;