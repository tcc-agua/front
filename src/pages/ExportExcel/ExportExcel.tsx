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
            <div className={styles.top}>
                <p className={styles.title}>Exporte o arquivo Excel de suas coletas!</p>

                <div className={styles.left}>
                    <p className={styles.subtitle}>Tabela em visualização:</p>
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

            </div>

            <div className={styles.table}>
                <ExcelTable />
            </div>

            <div className="buttonContainer">
                <button className={styles.export} onClick={openModal}>Exportar Arquivo</button>
                {isModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <span className={styles.close} onClick={closeModal}>&times;</span>
                            <p className={styles.modalTitle}>Tabelas exportadas com sucesso!</p>
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
