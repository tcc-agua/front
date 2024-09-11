import React, { useEffect, useState } from 'react';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react';
import styles from './ExcelTable.module.css';
import { fetchSheet } from '../../api/api';

registerAllModules();

interface ExcelTableProps {
  sheetName: string;
}

const ExcelTable: React.FC<ExcelTableProps> = ({ sheetName }) => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [, setSubHeaders] = useState<string[]>([]);
  const [dataPonto, setDataPonto] = useState<string[][]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (sheetName !== 'DADOS ETAS' && sheetName !== 'NA' && sheetName !== 'PB') {
      setErrorMessage('Selecione uma das planilhas!');
      return;
    }

    async function fetchPontosExcel() {
      try {

        const token = localStorage.getItem('id_token');

        if(token != null){
          const response = await fetchSheet(sheetName);

          setHeaders(response[0]);
          setSubHeaders(response[1]);
          setDataPonto(response[2]);
          setErrorMessage(null); 
        }

      } catch (e) {
        console.error(e);
        setErrorMessage('Erro ao buscar dados da planilha.');
      }
    }
    
    fetchPontosExcel();

  }, [sheetName]);

  if (errorMessage) {
    return <div className={styles.errorMessage}>{errorMessage}</div>;
  }

  const data = [
    headers,
    dataPonto,
  ];

  const cells = (row: number): any => {
    const cellProperties: any = {};

    if (row === 0) {
      cellProperties.className = `${styles.lightGreen}`;
    } 
    return cellProperties;
  };

  return (
    <HotTable
      data={data}
      rowHeaders={false}
      colHeaders={false}
      height="100%"
      width="100%"
      autoWrapRow={true}
      autoWrapCol={true}
      cells={cells} 
      className={styles.customHotTable} 
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default ExcelTable;