import React, { useState, useEffect } from 'react';
import styles from './CollectItem.module.css';
import arrow from '../../assets/images/arrow.svg';
import ColetaDetails from './CollectDetails';
import useUtilsStore from '../../store/utils';

interface Detail {
  id: number;
  tipo: string;
  ponto: string;
  dados: any;
}

export interface Content {
  id: number;
  date: string;
  description: string;
  totalElementsIndividual: number;
  details: Detail[];
}

export interface ResponseColeta {
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  content: Content[];
}

export interface ParamsDataInterface {
  startDate: string;
  endDate: string;
  page: number;
  size: number;
}

interface ColetaItemProps {
  paramsData: ParamsDataInterface;
  onOpenDetail: (detail: Detail) => void;
}

const ColetaItem: React.FC<ColetaItemProps> = ({ paramsData, onOpenDetail }) => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const { currentPage, setHistoricContent } = useUtilsStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchDataResult = await setHistoricContent( paramsData );
        console.log("ParamsData CollectItem: " + paramsData);
        setContent(fetchDataResult.content);
  
      } catch (error) {
        setError('Erro ao buscar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const toggleOpen = (id: number) => {
    setIsOpen(isOpen === id ? null : id);
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
              <ColetaDetails
                details={item.details}
                onOpenDetail={onOpenDetail}
                itemsPerPage={paramsData.size}
                totalPages={Math.ceil(item.totalElementsIndividual / paramsData.size)}              
                />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ColetaItem;
