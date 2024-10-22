import React, { useEffect, useState } from 'react';
import styles from './CollectItem.module.css';
import arrow from '../../assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';
import { fetchColetasByData } from '../../api/api';

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
  paramsData: { page: number; size: number; content: string };
  onOpenDetail: (detail: Detail) => void;
}

const ColetaItem: React.FC<ColetaItemProps> = ({
  date,
  description,
  paramsData,
  onOpenDetail,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(paramsData?.page || 0);
  const [details, setDetails] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching data with:", {
          startDate: date,
          endDate: date,
          page: currentPage,
          size: paramsData?.size || 6,
          // details: paramsData?.details,
        });
  
        const response = await fetchColetasByData({
          startDate: date,
          endDate: date,
          page: currentPage,
          size: paramsData?.size || 6,
        });
        console.log('testezinho:' + response)
  
        if (response.content) {
          setDetails(response.content);
        } else {
          setError('Nenhum dado retornado.');
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error('Error fetching data:', e.message);
          setError('Erro ao buscar dados: ' + e.message);
        } else {
          setError('Erro ao buscar dados: Erro desconhecido.');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [date, currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setCurrentPage(0);
    }
  };

  const filterLetters = (text: string) => text.match(/[a-zA-Z]+/g)?.join('') || '';
  const filterNumbers = (text: string) => text.match(/[0-9]+/g)?.join('') || '';

  console.log('detalhessss:' + details)

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

      <div className={`${styles.detailsWrapper} ${isOpen ? styles.open : ''}`}>
        <div className={styles.details}>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p>{error}</p>
          ) : details.length === 0 ? (
            <p>Nenhum detalhe disponível.</p>
          ) : (
            details.map((detail) => (
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
                  <span
                    className={styles.viewButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetail(detail);
                    }}
                    >
                    <p className={styles.viewP}>visualizar</p>
                    <pre className={styles.arrow}>⟶</pre>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {details.length > (paramsData?.size || 6) && ( 
          <div className={styles.paginationContainer}>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              pageCount={Math.ceil(details.length / (paramsData?.size || 6))}
              marginPagesDisplayed={2}
              pageRangeDisplayed={10}
              onPageChange={handlePageClick}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              aria-label="Pagination"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColetaItem;
