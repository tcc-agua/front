import React, { useState, useEffect } from 'react';
import DropdownButton from '../../components/DropdownButton/DropdownButton';
import ColetaItem from '../../components/Colects/ColectItem';
import styles from './Historic.module.css';

interface DropdownItem {
  id: string;
  label: string;
  value: string | number;
}

interface Detail {
  id: number;
  label: string;
}

interface Coleta {
  id: number;
  date: string;
  description: string;
  details: Detail[];
}

const Historic: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DropdownItem | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<DropdownItem | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<DropdownItem | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<Detail | null>(null);

  const days: DropdownItem[] = Array.from({ length: 31 }, (_, i) => ({
    id: (i + 1).toString(),
    label: (i + 1).toString(),
    value: i + 1
  }));

  const months: DropdownItem[] = [
    { id: '1', label: 'Janeiro', value: 'Janeiro' },
    { id: '2', label: 'Fevereiro', value: 'Fevereiro' },
    { id: '3', label: 'Março', value: 'Março' },
    { id: '4', label: 'Abril', value: 'Abril' },
    { id: '5', label: 'Maio', value: 'Maio' },
    { id: '6', label: 'Junho', value: 'Junho' },
    { id: '7', label: 'Julho', value: 'Julho' },
    { id: '8', label: 'Agosto', value: 'Agosto' },
    { id: '9', label: 'Setembro', value: 'Setembro' },
    { id: '10', label: 'Outubro', value: 'Outubro' },
    { id: '11', label: 'Novembro', value: 'Novembro' },
    { id: '12', label: 'Dezembro', value: 'Dezembro' },
  ];

  const years: DropdownItem[] = ['2024', '2025', '2026', '2027'].map(year => ({
    id: year,
    label: year,
    value: year
  }));

  const handleOpenDetail = (detail: Detail) => {
    setSelectedDetail(detail);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDetail(null);
  };

  const coletas: Coleta[] = [
    {
      id: 1,
      date: '26/07/2024',
      description: 'Sexta-feira, 26 de Junho de 2024, 15:26 BRT',
      details: [
        { id: 1, label: 'PM - 15' },
        { id: 2, label: 'PM - 55' },
        { id: 3, label: 'PM - 60' },
        { id: 4, label: 'PM - 65' },
        { id: 5, label: 'PM - 70' },
        { id: 6, label: 'PM - 80' },
        { id: 7, label: 'PM - 90' },
        { id: 8, label: 'PM - 63' },
        { id: 6, label: 'PM - 61' }
      ]
    },
    {
      id: 2,
      date: '27/07/2024',
      description: 'Sábado, 27 de Junho de 2024, 12:00 BRT',
      details: [
        { id: 3, label: 'PM - 20' },
        { id: 4, label: 'PM - 30' }
      ]
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Selecione uma data:</h1>

      <div className={styles.buttons}>
        <div className={styles.dropdownContainer}>
          <DropdownButton
            id="day-dropdown"
            title="Dia"
            options={days}
            selectedOption={selectedDay}
            onSelect={setSelectedDay}
          />
          <DropdownButton
            id="month-dropdown"
            title="Mês"
            options={months}
            selectedOption={selectedMonth}
            onSelect={setSelectedMonth}
          />
          <DropdownButton
            id="year-dropdown"
            title="Ano"
            options={years}
            selectedOption={selectedYear}
            onSelect={setSelectedYear}
          />
        </div>
      </div>

      <h1 className={styles.title}>Últimas coletas:</h1>
      <div className={styles.colects}>
        {coletas.map(coleta => (
          <ColetaItem
            key={coleta.id}
            date={coleta.date}
            description={coleta.description}
            details={coleta.details}
            onOpenDetail={handleOpenDetail}
          />
        ))}
      </div>

      {modalOpen && selectedDetail && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>

            <button className={styles.close} onClick={handleCloseModal}>x</button>
            <h2 className={styles.pointName}>Dados de coleta do ponto {selectedDetail.label}</h2>

            <main>

              <div className={styles.infoContainer}>
                <h3>pH</h3>
                <div className={styles.information}>
                  <p>01</p>
                </div>
              </div>

              <div className={styles.separator}></div>

              <div className={styles.infoContainer}>
                <h3>Pressão</h3>
                <div className={styles.information}>
                  <p>03</p>
                </div>
              </div>

            </main>
          </div>
        </div>
      )}

    </div>
  );
};

export default Historic;
