import React, { useState } from 'react';
import DropdownButton from '../../components/ExcelOptions/ExcelOptions';
import ExcelTable from '../../components/ExcelTable/ExcelTable';
import success from '../../assets/images/success.svg';
import styles from './ExportExcel.module.css';

interface DropdownItem {
    id: string;
    label: string;
    value: string;
}

const ExportExcel: React.FC = () => {
    const [selectedTable, setSelectedTable] = useState<DropdownItem | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tables: DropdownItem[] = [
        { id: '1', label: 'ETAS', value: 'ETAS' },
        { id: '2', label: 'NA', value: 'NA' },
        { id: '3', label: 'PB', value: 'PB' },
    ];

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        
        <div className={styles.container}>
            <header>
                <h1 className={styles.title}>Exporte o arquivo Excel de suas coletas!</h1>

                <div className={styles.left}>
                    <h1 className={styles.subtitle}>Tabela em visualização:</h1>
                    <div className={styles.buttonTable}>
                        <DropdownButton
                            id="table"
                            title="--"
                            options={tables}
                            selectedOption={selectedTable}
                            onSelect={setSelectedTable}
                        />
                    </div>
                </div>

            </header>

            <div className={styles.table}>
                <ExcelTable />
            </div>

            <div className="buttonContainer">
                <button className={styles.export} onClick={openModal}>Exportar Arquivo</button>
                {isModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <span className={styles.close} onClick={closeModal}>&times;</span>
                            <h2 className={styles.modalTitle}>Tabelas exportadas com sucesso!</h2>
                            <img className={styles.modalImg} src={success} alt="Success" />
                            <p className={styles.modalText}>O arquivo exportado contém todas as três tabelas em diferentes abas.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default ExportExcel;
