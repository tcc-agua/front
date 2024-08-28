import React from 'react';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react';
import styles from './ExcelTable.module.css';

registerAllModules();

const ExcelTable: React.FC = () => {
  const data = [
    ['', 'PB-01', 'PM-02', 'PM-03', 'PB-01', 'PM-02', 'PM-03', 'PM-02', 'PM-03', 'PM-02', 'PM-03', 'PM-02', 'PM-03', 'PM-03', 'PM-02', 'PM-03', 'PM-02', 'PM-03', 'PM-03', 'PM-02', 'PM-03', 'PM-02', 'PM-03', 'PM-03', 'PM-03', 'PM-02', 'PM-03', 'PM-02', 'PM-03'],
    ['02', 10, 11, 12, 13, 1, 1],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
    ['02', 20, 11, 14, 13, 5, 6],
    ['02', 30, 15, 12, 13, 2, 3],
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
