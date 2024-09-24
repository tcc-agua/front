import React, { useState } from 'react';
import DropdownButton from '../../components/DropdownButton/DropdownButton';
import ExcelTable from '../../components/ExcelTable/ExcelTable';
import success from '../../assets/images/success.svg';
import styles from './ExportExcel.module.css';
import { fetchExport, fetchSheet, postNotif } from '../../api/api';

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
        value: year
    }));

    const tables: DropdownItem[] = [
        { id: '1', label: 'DADOS ETAS', value: 'DADOS ETAS' },
        { id: '2', label: 'NA', value: 'NA' },
        { id: '3', label: 'PB', value: 'PB' },
    ];

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    async function fetchExportExcel(startDate: string, endDate: string) {
        try {
            const response = await fetchExport(startDate, endDate); // Chama a função para buscar o Excel
            console.log(response);
    
            const url = window.URL.createObjectURL(response); // Cria o URL do Blob
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'coletas.xlsx'); // Nome do arquivo para download
            document.body.appendChild(link);
            link.click(); // Simula o clique para iniciar o download
    
            setTimeout(() => {
                window.URL.revokeObjectURL(url); // Libera a URL do Blob
                link.remove(); // Remove o link
            }, 100);
            openModal(); // Abre um modal, se necessário
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
        if (selectedMonth && selectedYear) {
            const month = parseInt(selectedMonth.id); // Mês como número
            const year = parseInt(selectedYear.label); // Ano como número

            // Cria as datas de início e fim
            const startDate = new Date(year, month - 1, 1); // Primeiro dia do mês
            const endDate = new Date(year, month, 0); // Último dia do mês

            // Converte para o formato 'YYYY-MM-DD'
            const startDateString = startDate.toISOString().split('T')[0];
            const endDateString = endDate.toISOString().split('T')[0];

            // Chama a função fetchExportExcel com as datas
            console.log(startDateString, endDateString);
            fetchExportExcel(startDateString, endDateString);
            notify(); // Chama a função notify após a exportação
        } else {
            console.error("Selecione um mês e um ano válidos.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.title}>Exporte o arquivo Excel de suas coletas!</p>
                <div className={styles.content_buttons}>
                    <div className={styles.buttons}>
                        <div className={styles.dropdownContainer}>
                            <DropdownButton
                                id="month-dropdown"
                                title="Mês"
                                options={months}
                                selectedOption={selectedMonth}
                                onSelect={setSelectedMonth}
                            />
                            <DropdownButton
                                id="year-dropdown"
                                title="Ano"
                                options={years}
                                selectedOption={selectedYear}
                                onSelect={setSelectedYear}
                            />
                        </div>
                    </div>
                </div>
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
            <ExcelTable sheetName={String(selectedTable?.value || "")} />
            </div>

            <div className="buttonContainer">
                <button className={styles.export} onClick={handleExportClick}>Exportar Arquivo</button>
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
