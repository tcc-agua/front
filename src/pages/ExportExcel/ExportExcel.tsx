import React, { useState } from 'react';
import DropdownButton from '../../components/DropdownButton/DropdownButton';
import ExcelTable from '../../components/ExcelTable/ExcelTable';
import success from '../../assets/images/success.svg';
import styles from './ExportExcel.module.css';
import { fetchExport, postNotif } from '../../api/api';

interface DropdownItem {
    id: string;
    label: string;
    value: string | number; 
}

const ExportExcel: React.FC = () => {
    const [selectedTable, setSelectedTable] = useState<DropdownItem | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState<DropdownItem | undefined>(undefined);
    const [selectedYear, setSelectedYear] = useState<DropdownItem | undefined>(undefined);
    const [exportYearOnly, setExportYearOnly] = useState(false); // Estado para controlar a exportação por ano

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
        value: year,
    }));

    const tables: DropdownItem[] = [
        { id: '1', label: 'DADOS ETAS', value: 'DADOS ETAS' },
        { id: '2', label: 'NA', value: 'NA' },
        { id: '3', label: 'PB', value: 'PB' },
        { id: '4', label: 'CA', value: 'CA' },
    ];

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    async function fetchExportExcel(startDate: string, endDate: string) {
        try {
            const endpoint = selectedTable?.value === 'CA' ? '/exportExcel/hidrometro' : '/exportExcel';
            const response = await fetchExport(startDate, endDate, endpoint);
            console.log(response);

            const url = window.URL.createObjectURL(response); 
            const link = document.createElement('a');
            link.href = url;
            const nomeExcel = selectedTable?.value === 'CA' ? 'coletas_hidrometro.xlsx' : 'coletas.xlsx';
            link.setAttribute('download', nomeExcel);
            document.body.appendChild(link);
            link.click(); 

            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                link.remove(); 
            }, 100);
            openModal(); 
        } catch (e) {
            console.error("Erro ao exportar o arquivo:", e);
        }
    }

    const notify = async () => {
        try {
            const result = await postNotif("EXCEL", "EXPORTADO");
            console.log("Dados salvos com sucesso:", result);
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
        }
    };

    const handleExportClick = () => {
        if (selectedYear) {
            const year = parseInt(selectedYear.label);
            let startDate: Date;
            let endDate: Date;

            if (exportYearOnly) {
                startDate = new Date(year, 0, 1); // 1º de Janeiro
                endDate = new Date(year, 11, 31); // 31 de Dezembro
            } else if (selectedMonth) {
                const month = parseInt(selectedMonth.id); 
                startDate = new Date(year, month - 1, 1); 
                endDate = new Date(year, month, 0); 
            } else {
                console.error("Selecione um mês ou o ano completo.");
                return;
            }

            const startDateString = startDate.toISOString().split('T')[0];
            const endDateString = endDate.toISOString().split('T')[0];

            console.log("Selected Table: ", selectedTable);
            console.log("Start Date: ", startDateString);
            console.log("End Date: ", endDateString);

            fetchExportExcel(startDateString, endDateString);
            notify();
        } else {
            console.error("Selecione um ano válido.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.container_top}>
                <div className={styles.filter}>
                    <p className={styles.title}>Exporte o arquivo Excel de suas coletas!</p>
                    <div className={styles.dropdownContainer}>
                        <div className={styles.month}>
                            <DropdownButton
                                id="monthDropdown"
                                title="Selecione o Mês"
                                options={months}
                                selectedOption={selectedMonth}
                                onSelect={setSelectedMonth}
                                disabled={exportYearOnly} 
                            />
                        </div>
                        <div className={styles.year}>
                            <DropdownButton
                                id="yearDropdown"
                                title="Selecione o Ano"
                                options={years}
                                selectedOption={selectedYear}
                                onSelect={setSelectedYear}
                            />
                        </div>
                        <div className={styles.selecionar_tabela}>
                            <DropdownButton
                                id="tableDropdown"
                                title="Selecione a Tabela"
                                options={tables}
                                selectedOption={selectedTable}
                                onSelect={setSelectedTable}
                            />
                        </div>
                        <div className={styles.exportYearContainer}>
                            <input
                                type="checkbox"
                                id="exportYear"
                                checked={exportYearOnly}
                                onChange={() => setExportYearOnly(!exportYearOnly)}
                            />
                            <label htmlFor="exportYear">Exportar o ano inteiro</label>
                        </div>
                    </div>
                </div>
                {isModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <span className={styles.close} onClick={closeModal}>&times;</span>
                            <p className={styles.modalTitle}>Tabelas exportadas com sucesso!</p>
                            <img className={styles.modalImg} src={success} alt="Success" />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.container1}>
                {selectedTable && selectedMonth && selectedYear && (
                    <ExcelTable
                        key={`${selectedTable.value}-${selectedMonth?.id}-${selectedYear.label}`}
                        sheetName={String(selectedTable.value)}
                        monthProps={selectedMonth?.id || '0'} 
                        yearProps={selectedYear.label}
                    />
                )}
            </div>
            <div className="footer">
                <button className={styles.export} onClick={handleExportClick}>
                    Exportar Arquivo
                </button>
            </div>
        </div>
    );
};

export default ExportExcel;
