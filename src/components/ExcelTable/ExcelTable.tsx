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
  const [dataPonto, setDataPonto] = useState<any[][]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (sheetName !== 'DADOS ETAS' && sheetName !== 'NA' && sheetName !== 'PB') {
      setErrorMessage('Selecione uma das planilhas!');
      return;
    }

    async function fetchPontosExcel() {
      try {
        const token = localStorage.getItem('id_token');

        if (token) {
          const response = await fetchSheet(sheetName);
          console.log(response)

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
