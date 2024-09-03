import React, { useState, useEffect } from 'react';
import DropdownButton from '../../components/DropdownButton/DropdownButton';
import ColetaItem from '../../components/Colects/ColectItem';
import styles from './Historic.module.css';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';  // Importa a localidade portuguesa

// Configura o dayjs para usar a localidade portuguesa
dayjs.locale('pt-br');

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
  tecnico: string;          // Novo atributo
  dataColeta: string;       // Data no formato 'yyyy-MM-dd'
  hora_inicio: string;      // Hora no formato 'HH:mm:ss'
  hora_fim: string;         // Hora no formato 'HH:mm:ss'
  details: Detail[];
}

// Mapeamento dos nomes dos meses para números
const monthToNumber: { [key: string]: number } = {
  Janeiro: 1,
  Fevereiro: 2,
  Março: 3,
  Abril: 4,
  Maio: 5,
  Junho: 6,
  Julho: 7,
  Agosto: 8,
  Setembro: 9,
  Outubro: 10,
  Novembro: 11,
  Dezembro: 12
};

// Função para obter o número do mês a partir do nome
const getMonthNumber = (monthName: string) => monthToNumber[monthName] || 0;

const Historic: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DropdownItem | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<DropdownItem | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<DropdownItem | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<Detail | null>(null);
  const [data, setData] = useState<Coleta[]>([]);

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

  useEffect(() => {
    async function fetchPontosPorData() {
      // Construir os parâmetros de consulta com base na seleção do usuário
      let params: { day?: number; month?: number; year?: number; startDate?: string; endDate?: string } = {};

      if (selectedDay && selectedMonth && selectedYear) {
        // Busca por data específica
        params = {
          day: Number(selectedDay.value),
          month: getMonthNumber(selectedMonth.value as string),
          year: Number(selectedYear.value)
        };
      } else {
        // Busca pelos últimos 15 dias
        const endDate = dayjs();
        const startDate = dayjs().subtract(15, 'day').format('YYYY-MM-DD');
        
        params = {
          day: endDate.date(),
          month: endDate.month() + 1,
          year: endDate.year()
        };
      }

      try {
        const token = localStorage.getItem('id_token');
        const response = await axios.get(`http://localhost:5173/coleta/get-by-date`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: Object.keys(params).length ? params : undefined  // Envia apenas os parâmetros se existirem
        });

        if (response.data === undefined) {
          console.log("ESTÁ UNDEFINED");
        } else {
          console.log("NÃO ESTÁ UNDEFINED");
          setData(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchPontosPorData();
  }, [selectedDay, selectedMonth, selectedYear]);

  // Função para formatar a data e hora
  const formatDateTime = (dataColeta: string, hora_inicio: string) => {
    const date = dayjs(`${dataColeta}T${hora_inicio}`);
    return date.format('dddd, D [de] MMMM [de] YYYY, HH:mm [BRT]');
  };

  const coletas: Coleta[] = data;

  return (
    <div className={styles.container}>
      <p className={styles.title_filter}>Selecione uma data:</p>
      <div className={styles.content_buttons}>
        <button className={styles.filtrar}>Filtrar</button>
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
        {coletas.map(coleta => (
          <ColetaItem
            key={coleta.id}
            date={coleta.dataColeta}
            description={formatDateTime(coleta.dataColeta, coleta.hora_inicio)}  // Atualizado para mostrar o técnico
            details={coleta.details}
            onOpenDetail={handleOpenDetail}
          />
        ))}
      </div>

      {modalOpen && selectedDetail && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>

            <button className={styles.close} onClick={handleCloseModal}>x</button>
            <p className={styles.pointName}>Dados de coleta do ponto {selectedDetail.label}</p>

            <main>
              <div className={styles.infoContainer}>
                <p className={styles.pointName}>pH</p>
                <div className={styles.information}>
                  <p className={styles.pointName}>01</p>
                </div>
              </div>

              <div className={styles.separator}></div>

              <div className={styles.infoContainer}>
                <p className={styles.pointName}>Pressão</p>
                <div className={styles.information}>
                  <p className={styles.pointName}>03</p>
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
