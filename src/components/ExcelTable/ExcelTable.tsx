import React, { useEffect, useState } from 'react';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react';
import styles from './ExcelTable.module.css';
import axios from 'axios';

registerAllModules();

interface ExcelTableProps {
  sheetName: string;
}

const ExcelTable: React.FC<ExcelTableProps> = ({ sheetName }) => {
  const [headers, setHeaders] = useState([]);
  const [subHeaders, setSubHeaders] = useState([]);
  const [dataPonto, setDataPonto] = useState([]);

  useEffect(() => {
    async function fetchPontosExcel() {
        try {
          const token = localStorage.getItem('id_token');
          const response = await axios.get(`http://localhost:5173/exportExcel/data/${sheetName}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setHeaders(response.data[0])
          setSubHeaders(response.data[1])
          setDataPonto(response.data[2])
        } catch (e) {
          console.error(e);
        }
    }
    
    fetchPontosExcel();

  }, [sheetName]);

  const data = [
    headers,
    dataPonto,
  ];

  const cells = (row: number, col: number, prop: string | number): any => {
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
      cells={cells} // Aplica a função de renderização
      className={styles.customHotTable} 
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default ExcelTable;
