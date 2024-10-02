import React, { useState, useRef } from 'react';
import styles from './ColectItem.module.css';
import arrow from '../../assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';

interface Detail {
  id: number;
  tipo: string;
  ponto: string;
  dados: Record<string, any>;  
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

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; 

  // Cálculo do deslocamento e dos itens atuais com base na página e na quantidade por página
  const offset = currentPage * itemsPerPage;
  let currentItems = details.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(details.length / itemsPerPage);

  // Função para lidar com a mudança de página na paginação
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
    currentItems = details.slice(offset, offset + itemsPerPage);
    console.log(currentItems);
    
    toggleOpen();
  };

  const toggleOpen = () => {setIsOpen(prev => !prev);};

  const filterLetters = (text: string) => { return text.match(/[a-zA-Z]+/g)?.join('') || '';};
  const filterNumbers = (text: string) => { return text.match(/[0-9]+/g)?.join('') || ''; };

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
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <img src={arrow} alt="Arrow" style={{ width: '16px', height: '16px' }} />
        </span>
      </div>

      <div className={`${styles.detailsWrapper} ${isOpen ? styles.open : ''}`} ref={detailsRef}>

        {/* Mapeia e exibe os detalhes paginados */}
        <div className={styles.details}>
          {currentItems.map(detail => (
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
                > <p className={styles.viewP}>visualizar</p><pre className={styles.arrow}>⟶</pre>  {/* Exibe a seta indicando ação */}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.paginationContainer}>
            {details.length > itemsPerPage && (
              <ReactPaginate
                previousLabel={'<'}  
                nextLabel={'>'}  
                breakLabel={'...'}  
                pageCount={pageCount} 
                marginPagesDisplayed={2}  
                pageRangeDisplayed={3}  
                onPageChange={handlePageClick}  // Lida com a troca de página
                containerClassName={styles.pagination}  
                activeClassName={styles.active}
              />
            )}
          </div>
      </div>
    </div>
  );
};

export default ColetaItem;
