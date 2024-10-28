import React, { useEffect, useState } from 'react';
import styles from './CollectItem.module.css';
import ReactPaginate from 'react-paginate';
import useUtilsStore from '../../store/utils';

interface Detail {
  id: number;
  tipo: string;
  ponto: string;
  dados: any;
}

interface ColetaDetailsProps {
  details: Detail[];
  onOpenDetail: (detail: Detail) => void;
  itemsPerPage: number; 
  totalPages: number;
}

const ColetaDetails: React.FC<ColetaDetailsProps> = ({ details, onOpenDetail, itemsPerPage, totalPages }) => {
  const { setCurrentPage, currentPage } = useUtilsStore();
  const [currentDetails, setCurrentDetails] = useState<Detail[]>([]);

  useEffect(() => {
    const offset = currentPage * itemsPerPage;
    setCurrentDetails(details);
  }, [currentPage, details, itemsPerPage]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className={styles.details}>
      {currentDetails.map((detail) => (
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

      {totalPages > 1 && (
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={totalPages}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          forcePage={currentPage}
          aria-label="Pagination"
        />
      )}
    </div>
  );
};

export default ColetaDetails;
