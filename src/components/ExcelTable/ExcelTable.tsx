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
    if (!sheetName || (sheetName !== 'DADOS ETAS' && sheetName !== 'NA' && sheetName !== 'PB')) {
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
      setColumnHeaders(headers);

      // Obter todas as propriedades únicas para definir as linhas
      const allKeys = new Set<string>();
      dataPonto.forEach((item: any) => {
        const dataKeys = Object.keys(item[1]);
        dataKeys.forEach(key => allKeys.add(key));
      });

      // Converter o Set de chaves em um array para a tabela
      const rowKeys = Array.from(allKeys);

      // Criar as linhas da tabela, onde cada linha corresponde a uma propriedade (volume, vazão, etc.)
      const rows = rowKeys.map((key) => {
        return dataPonto.map((item: any) => item[1][key] || '');  // Preencher com os valores ou vazio se não existir
      });

      // Atualizar os dados da tabela
      setTableData([rowKeys, ...rows]);
    }
  }, [dataPonto]);

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
