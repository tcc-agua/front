import React, { useState } from 'react';
import styles from './DetailModal.module.css';

interface Detail {
  id: number;
  label: string;
}

interface DetailModalProps {
  modalOpen: boolean;
  selectedDetail: Detail | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ modalOpen, selectedDetail, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const infoContainers = [
    { label: 'pH', value: '01' },
    { label: 'Pressão', value: '03' },
    { label: 'Pressão', value: '03' },
  ];

  const handleNext = () => {
    if (currentIndex < infoContainers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    modalOpen && selectedDetail ? (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <button className={styles.close} onClick={onClose}>x</button>
          <h2 className={styles.pointName}>Dados de coleta do ponto {selectedDetail.label}</h2>

          <div className={styles.sliderContainer}>
            <button className={styles.arrowButton} onClick={handlePrev} disabled={currentIndex === 0}>←</button>
            <div className={styles.slider}>
              <div className={styles.sliderInner} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {infoContainers.map((info, index) => (
                  <div key={index} className={styles.infoContainer}>
                    <h3>{info.label}</h3>
                    <div className={styles.information}>
                      <p>{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className={styles.arrowButton} onClick={handleNext} disabled={currentIndex === infoContainers.length - 1}>→</button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default DetailModal;
