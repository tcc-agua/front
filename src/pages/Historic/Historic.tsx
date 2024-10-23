import React, { useState, useEffect } from 'react';
import DropdownButton from '../../components/DropdownButton/DropdownButton';
import ColetaItem from '../../components/Colects/CollectItem';
import styles from './Historic.module.css';
import dayjs from 'dayjs';
import { fetchColetasByData } from '../../api/api';

interface DropdownItem {
  id: string;
  label: string;
  value: string | number;
}

interface Detail {
  id: number;
  tipo: string;
  ponto: string;
  dados: any;
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
  const [coletasPonto, setColetasPonto] = useState<Coleta[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [startDateState, setStartDateState] = useState<string>('');
  const [endDateState, setEndDateState] = useState<string>('');




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

  const fetchPontosPorColeta = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('id_token');
      if (!token) {
        setError('Token não encontrado.');
        return;
      }

      let paramsData: { startDate?: string; endDate?: string } = {};
      let startDate: string;
      let endDate: string;

      if (selectedDay?.value && selectedMonth?.value && selectedYear?.value) {
        const year = Number(selectedYear.value);
        const month = Number(selectedMonth.id) - 1;
        const day = Number(selectedDay.value);

        startDate = dayjs(new Date(year, month, day)).format('YYYY-MM-DD');
        endDate = startDate; 
      } else {
        endDate = dayjs().format('YYYY-MM-DD');
        startDate = dayjs().subtract(60, 'day').format('YYYY-MM-DD');
      }
      setStartDateState(startDate);
      setEndDateState(endDate);

      paramsData = { startDate, endDate };

      const response = await fetchColetasByData(paramsData);
      if (response && response.content) {
        const coletas: Coleta[] = response.content;
        setColetasPonto(coletas);
      } else {
        setError('Nenhum dado retornado.');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Erro desconhecido.';
      setError('Erro ao buscar dados: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPontosPorColeta()
  },[selectedDay, selectedMonth, selectedYear]);
  

  const handleOpenDetail = (detail: Detail) => {
    setSelectedDetail(detail);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDetail(null);
    setCarouselIndex(0);
  };

  const handleNext = () => {
    if (selectedDetail && carouselIndex + 2 < Object.keys(selectedDetail.dados).length) {
      setCarouselIndex(prevIndex => prevIndex + 2);
    }
  };

  const handlePrevious = () => {
    if (carouselIndex > 0) {
      setCarouselIndex(prevIndex => prevIndex - 2);
    }
  };

  // Informações visíveis no modal, limitadas pela paginação
  const visibleInfoContainers = selectedDetail
    ? Object.entries(selectedDetail.dados)
        .filter(([key]) => key !== 'id' && key !== '')
        .slice(carouselIndex, carouselIndex + 2)
    : [];

  return (
    <div className={styles.container}>
      <p className={styles.title_filter}>Selecione uma data:</p>
      <div className={styles.content_buttons}>
        <div className={styles.filterContainer}>
          <button className={styles.filtrar} onClick={fetchPontosPorColeta}>Filtrar</button>
        </div>
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
      </div>

      <p className={styles.title}>Últimas coletas:</p>
      <div className={styles.colects}>
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
            <ColetaItem
              paramsData={{ page: 0, size: 6, startDate: startDateState , endDate: endDateState  }} 
              onOpenDetail={handleOpenDetail}
            />
        )}
      </div>

      {/* Informações individuais de cada ponto */}
      {modalOpen && selectedDetail && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.close} onClick={handleCloseModal}>x</button>
            <p className={styles.pointName}>Dados de coleta do ponto {selectedDetail.ponto}</p>

            <main className={styles.carousel}>
              <button
                className={`${styles.carousel_button} ${carouselIndex === 0 ? styles.carousel_button_invisible : ''}`}
                onClick={handlePrevious}
                disabled={carouselIndex === 0}
              >
                ‹
              </button>

              {visibleInfoContainers.map(([key, value]) => (
                <div key={key} className={`${styles.infoContainer} ${key === "*" ? styles.hidden : ''}`}>
                  <p className={styles.type}>
                    {key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}:
                  </p>
                  <p className={styles.info}>{value.toString()}</p>
                </div>
              ))}

              <button
                className={`${styles.carousel_button} ${carouselIndex + 2 >= Object.keys(selectedDetail.dados).length ? styles.carousel_button_invisible : ''}`}
                onClick={handleNext}
                disabled={carouselIndex + 2 >= Object.keys(selectedDetail.dados).length}
              >
                ›
              </button>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historic;
