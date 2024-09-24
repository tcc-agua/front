import React, { useEffect, useState } from 'react';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react';
import styles from './ExcelTable.module.css';
import { fetchSheet } from '../../api/api';

registerAllModules();

interface ExcelTableProps {
  sheetName: string;
  monthProps: string;
  yearProps: string;
}

const ExcelTable: React.FC<ExcelTableProps> = ({ sheetName, monthProps, yearProps }) => {
  const [dataPonto, setDataPonto] = useState<any[][]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const month = parseInt(monthProps); // Mês como número
  const year = parseInt(yearProps); // Ano como número

  useEffect(() => {
    if (!sheetName || (sheetName !== 'DADOS ETAS' && sheetName !== 'NA' && sheetName !== 'PB')) {
      setErrorMessage('Selecione uma das planilhas!');
      return;
    }

    // Cria as datas de início e fim apenas aqui
    const startDate = new Date(year, month - 1, 1); // Primeiro dia do mês
    const endDate = new Date(year, month, 0); // Último dia do mês

    // Converte para o formato 'YYYY-MM-DD'
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];

    async function fetchPontosExcel() {
      try {
        const token = localStorage.getItem('id_token');

        if (token) {
          const response = await fetchSheet(sheetName, startDateString, endDateString);
          console.log(response);
          // Atualiza os dados no estado se a resposta for válida
          setDataPonto(response.data); // Supondo que a resposta tenha um atributo data
        }
      } catch (e) {
        console.error(e);
        setErrorMessage('Erro ao buscar dados da planilha.');
      }
    }

    fetchPontosExcel();
  }, [sheetName, monthProps, yearProps]);

  if (errorMessage) {
    return <div className={styles.errorMessage}>{errorMessage}</div>;
  }

  return (
    <HotTable
      data={dataPonto}
      rowHeaders={false}
      colHeaders={false}
      height="100%"
      width="100%"
      autoWrapRow={true}
      autoWrapCol={true}
      className={styles.customHotTable}
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default ExcelTable;
