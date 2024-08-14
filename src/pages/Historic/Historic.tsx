
import React, { useState } from 'react';
import DropdownButton from '../../components/DropdownButton/DropdownButton';
import ColetaItem from '../../components/Colects/ColectItem';
import styles from './Historic.module.css';

interface DropdownItem {
  id: string;
  label: string;
  value: string | number;
}

const Historic: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DropdownItem | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<DropdownItem | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<DropdownItem | undefined>(undefined);

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
        <ColetaItem 
          date="26/07/2024"
          description="Sexta-feira, 26 de Junho de 2024, 15:26 BRT"
          details="Informações adicionais sobre a coleta deste dia."
        />
        <ColetaItem 
          date="26/07/2024"
          description="Sexta-feira, 26 de Junho de 2024, 15:26 BRT"
          details="Informações adicionais sobre a coleta deste dia."
        />
        <ColetaItem 
          date="26/07/2024"
          description="Sexta-feira, 26 de Junho de 2024, 15:26 BRT"
          details="Informações adicionais sobre a coleta deste dia."
        />
        {/* Adicione mais ColetaItem aqui conforme necessário */}
      </div>
    </div>
  );
};

export default Historic;
