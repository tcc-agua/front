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
  const [tableData, setTableData] = useState<any[][]>([]);  // Dados processados para a tabela
  const [columnHeaders, setColumnHeaders] = useState<string[]>([]);  // Cabeçalhos das colunas
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const month = parseInt(monthProps); // Mês como número
  const year = parseInt(yearProps); // Ano como número

  useEffect(() => {
    if (!sheetName || (sheetName !== 'DADOS ETAS' && sheetName !== 'NA' && sheetName !== 'PB' && sheetName !== 'CA')) {
      setErrorMessage('Selecione uma das planilhas!');
      return;
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];

    async function fetchPontosExcel() {
      try {
        const token = localStorage.getItem('id_token');

        if (token) {
          const response = await fetchSheet(sheetName, startDateString, endDateString);
          setDataPonto(response);
          console.log(response);
        }
      } catch (e) {
        console.error(e);
        setErrorMessage('Erro ao buscar dados da planilha.');
      }
    }

    fetchPontosExcel();
  }, [sheetName, monthProps, yearProps]);

  // Processar os dados recebidos para estruturar a tabela
  useEffect(() => {
    if (dataPonto.length > 0) {
      // Obter os cabeçalhos (nomes dos pontos)
      const headers = dataPonto.map((item: any) => item[0]);
  
      // Apenas atualize os cabeçalhos se forem diferentes dos atuais
      if (JSON.stringify(headers) !== JSON.stringify(columnHeaders)) {
        setColumnHeaders(headers);
      }
  
      // Processar as linhas da tabela da mesma maneira
      const allKeys = new Set<string>();
      dataPonto.forEach((item: any) => {
        const dataKeys = Object.keys(item[1]);
        dataKeys.forEach(key => allKeys.add(key));
      });
  
      const rowKeys = Array.from(allKeys);
      const rows = rowKeys.map((key) => {
        return dataPonto.map((item: any) => item[1][key] || '');
      });
  
      setTableData([rowKeys, ...rows]);
    }
  }, [dataPonto, columnHeaders]);  

  useEffect(() => {
    console.log("dataPonto:", dataPonto);
  }, [dataPonto]);  

  // Função para mesclar os headers dinamicamente
  const mergeHeaders = (headers: HTMLTableCellElement[]) => {
    let i = 0;
    while (i < headers.length) {
      let currentHeader = headers[i];
      let colSpanCount = 1;

      // Verifica as células subsequentes que possuem o mesmo conteúdo
      while (i + colSpanCount < headers.length && currentHeader.innerHTML === headers[i + colSpanCount].innerHTML) {
        headers[i + colSpanCount].style.display = 'none'; // Oculta a célula subsequente
        colSpanCount++;
      }

      // Define o colSpan para a quantidade de células mescladas
      if (colSpanCount > 1) {
        currentHeader.colSpan = colSpanCount;
      }

      i += colSpanCount; // Avança o índice para a próxima célula não mesclada
    }
  };

  // Chamar a função mergeHeaders quando os headers estiverem prontos
  useEffect(() => {
    const tableHeaders = document.querySelectorAll<HTMLTableCellElement>('th'); // Seleciona todos os headers
    if (tableHeaders.length > 0) {
      mergeHeaders(Array.from(tableHeaders)); // Converte NodeList para array e chama a função
    }
  }, [columnHeaders]);


  if (errorMessage) {
    return <div className={styles.errorMessage}>{errorMessage}</div>;
  }

  return (
    <HotTable
      data={tableData}
      rowHeaders={false}
      colHeaders={columnHeaders}
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
