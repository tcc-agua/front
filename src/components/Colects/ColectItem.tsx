import React, { useEffect, useState } from 'react';
import styles from './ColectItem.module.css';
import arrow from '../../assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';
import { fetchColetasByData } from '../../api/api';

interface Detail {
  id: number;
  tipo: string;
  ponto: string;
  dados: Record<string, any>;  
}

interface ColetaItemProps {
  date: string;
  description: string;
  paramsData: any; 
  onOpenDetail: (detail: Detail) => void;
}

const ColetaItem: React.FC<ColetaItemProps> = ({ date, description, paramsData, onOpenDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [details, setDetails] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchColetasByData(paramsData);
        console.log('Response:', response); // Adicione este log
        if (response.content) {
            setDetails(response.content);
            setItemsPerPage(response.size);
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
  }, [paramsData]);

  // Cálculo do deslocamento e dos itens atuais
  const offset = currentPage * itemsPerPage;
  const currentItems = details.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(details.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const toggleOpen = () => setIsOpen(prev => !prev);

  const filterLetters = (text: string) => text.match(/[a-zA-Z]+/g)?.join('') || '';
  const filterNumbers = (text: string) => text.match(/[0-9]+/g)?.join('') || '';

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
          ) : currentItems.length === 0 ? (
            <p>Nenhum detalhe disponível.</p>
          ) : (
            currentItems.map(detail => (
              <div key={detail.id} className={styles.detailContainer}>
                <div
                  className={styles.detailButton}
                  onClick={(e) => { e.stopPropagation(); onOpenDetail(detail); }} 
                >
                  <div className={styles.texts}>
                    <span className={styles.label}>{filterLetters(detail.tipo)}</span>
                    <pre>–</pre>
                    <span className={styles.number}>{filterNumbers(detail.ponto)}</span> 
                  </div>
                  <span
                    className={styles.viewButton}
                    onClick={(e) => { e.stopPropagation(); onOpenDetail(detail); }} 
                  >
                    <p className={styles.viewP}>visualizar</p>
                    <pre className={styles.arrow}>⟶</pre>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {details.length > itemsPerPage && (
          <div className={styles.paginationContainer}>
            <ReactPaginate
              previousLabel={'<'}  
              nextLabel={'>'}  
              breakLabel={'...'}  
              pageCount={pageCount} 
              marginPagesDisplayed={2}  
              pageRangeDisplayed={3}  
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
