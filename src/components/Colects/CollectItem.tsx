import React, { useState, useEffect } from 'react';
import styles from './CollectItem.module.css';
import arrow from '../../assets/images/arrow.svg';
import { fetchColetasByData } from '../../api/api';
import ColetaDetails from './CollectDetails';
import ReactPaginate from 'react-paginate';
import useUtilsStore from '../../store/utils';

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
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const[pageCount, setPageCount] = useState(0);
  const itemsPerPage = paramsData.size; 

  const { setCurrentPage, currentPage } = useUtilsStore();

  const offset = currentPage * itemsPerPage;

  // Filtrando para aparecer somente coletas com details
  const currentItems = content
  .filter(item => item.details.length > 0)
  .slice(offset, offset + itemsPerPage);

  // Contagem do número de páginas que deve aparecer
  // const pageCount = Math.ceil(
  //   content.filter(item => item.details.length > 0).length / itemsPerPage
  // );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchColetasByData({
          startDate: paramsData.startDate,
          endDate: paramsData.endDate,
          page: currentPage,
          size: paramsData.size,
        });
        setContent(response.content);
        setPageCount(response.totalPages);
        console.log(`Response: ${JSON.stringify(response)}`)
      } catch (error) {
        setError('Erro ao buscar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paramsData, currentPage]);

  const toggleOpen = (id: number) => {
    setIsOpen(isOpen === id ? null : id);
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };


  return (
    <div className={styles.coletaList}>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        currentItems.map((item) => (
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
              <><ColetaDetails details={item.details} onOpenDetail={onOpenDetail} /><div className={styles.pagination}>
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  pageCount={pageCount}
                  // marginPagesDisplayed={2}
                  // pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={styles.pagination}
                  activeClassName={styles.active}
                  aria-label="Pagination" />
              </div></>
            )}
          </div>
        ))
      )}
    </div>
    
  );
};

export default ColetaItem;
