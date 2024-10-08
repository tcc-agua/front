import React, { useState, useEffect } from 'react';
import DropdownButton from '../../components/DropdownButton/DropdownButton';
import ColetaItem from '../../components/Colects/ColectItem';
import ModalError from '../../components/ModalError/ModalError';
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
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Estado para controlar o modal de erro
  const [errorMessage, setErrorMessage] = useState<string>(''); // Estado para guardar a mensagem de erro

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

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPontosPorColeta() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('id_token');
        if (!token) {
          setError('Token não encontrado.');
          return;
        }
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('id_token');
        if (!token) {
          setError('Token não encontrado.');
          return;
        }

        let paramsData: { startDate?: string; endDate?: string; page?: number; size?: number } = {};

        if (selectedDay?.value != null && selectedMonth?.value != null && selectedYear?.value != null) {
          const year = Number(selectedYear.value);
          const month = Number(selectedMonth.id) - 1;
          const day = Number(selectedDay.value);

          const startDate = dayjs(new Date(year, month, day)).format('YYYY-MM-DD');
          console.log('Start Date:', startDate);
          paramsData = { startDate, endDate: startDate, page, size };
        } else {
          const endDate = dayjs().format('YYYY-MM-DD');
          const startDate = dayjs().subtract(30, 'day').format('YYYY-MM-DD');
          paramsData = { startDate, endDate, page, size };
        }

        console.log('Parameters for API:', paramsData);
        const response = await fetchColetasByData(paramsData);
        console.log('API Response:', response.content);

        if (response.content) {
          const pontos = response.content;
          setColetasPonto(pontos);
        } else {
          setError('Nenhum dado retornado.');
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error('Error fetching data:', e.message);
          setError('Erro ao buscar dados: ' + e.message);
        } else {
          console.error('Error fetching data:', e);
          setError('Erro ao buscar dados: Erro desconhecido.');
        }
      } finally {
        setLoading(false);
        setLoading(false);
      }
    }


    fetchPontosPorColeta();
  }, [selectedDay, selectedMonth, selectedYear, page, size]);
  }, [selectedDay, selectedMonth, selectedYear, page, size]);

  console.log(`COLETAS PONTO: ${coletasPonto}`);

  console.log(`DADOS: ${coletasPonto.map(coleta => coleta.details)}`)

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

  const visibleInfoContainers = selectedDetail
    ? Object.entries(selectedDetail.dados)
      .filter(([key]) => key !== 'id' && key !== '')
      .slice(carouselIndex, carouselIndex + 2)
    : [];
    ? Object.entries(selectedDetail.dados)
      .filter(([key]) => key !== 'id' && key !== '')
      .slice(carouselIndex, carouselIndex + 2)
    : [];

  return (
    <div className={styles.container}>
      <p className={styles.title_filter}>Selecione uma data:</p>
      <div className={styles.content_buttons}>
        <div className={styles.filterContainer}>
          <button className={styles.filtrar}>Filtrar</button>
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

      {isErrorModalOpen && (
        <ModalError message={errorMessage} onClose={closeErrorModal} />
      )}

      <p className={styles.title}>Últimas coletas:</p>
      <div className={styles.colects}>
        {coletasPonto &&
          coletasPonto
            .filter(coleta => coleta.details.length > 0)
            .map(coleta => (
              <ColetaItem
                key={coleta.id} // Verifique se `id` é único
                date={coleta.date}
                description={coleta.description}
                details={coleta.details.filter(detail => Object.keys(detail.dados).length > 0)}
                onOpenDetail={handleOpenDetail}
              />
            ))}
      </div>

      {modalOpen && selectedDetail && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.close} onClick={handleCloseModal}>x</button>
            <p className={styles.pointName}>Dados de coleta do ponto {selectedDetail.ponto}</p>

            <main className={styles.carousel}>
              <button
                className={`${styles.carousel_button} ${carouselIndex === 0 ? styles.carousel_button_invisible : ''}`}
              <button
                className={`${styles.carousel_button} ${carouselIndex === 0 ? styles.carousel_button_invisible : ''}`}
                onClick={handlePrevious}
                disabled={carouselIndex === 0}
              >
                ‹
              </button>

              {visibleInfoContainers.map(([key, value]) => (
                <div
                  key={key}
                <div
                  key={key}
                  className={`${styles.infoContainer} ${key === "*" ? styles.hidden : ''}`}
                >
                  <p className={styles.pointName}>{key}</p>
                  <div className={styles.information}>
                    <p className={styles.pointName}>{String(value)}</p>
                  </div>
                </div>
              ))}

              <button
                className={`${styles.carousel_button} ${carouselIndex + 2 >= Object.keys(selectedDetail.dados).length ? styles.carousel_button_invisible : ''}`}
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
              </button>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historic;