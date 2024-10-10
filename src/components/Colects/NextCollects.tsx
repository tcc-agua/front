import { useEffect, useState } from "react";
import { fetchNotif } from "../../api/api";
import styles from "./NextCollect.module.css";
import { getDateDifference } from "../../pages/Dashboards/Dashboards";
import icon_alert from "../../assets/images/alert.svg";
import correct from "../../assets/images/correct.svg"

interface Coleta {
    id: number;
    tabela: 'DADOS ETAS' | 'NA' | 'PBS' | 'EXCEL' | 'CA';
    tipo: 'SALVO' | 'EXPORTADO';
    data: string;
}

export const NextCollects: React.FC = () => {
    const [coleta, setColeta] = useState<Coleta[]>([]);

    useEffect(() => {
        const getColeta = async () => {
            try {
                const data: Coleta[] = await fetchNotif();
                const sortedColeta = data.sort((a, b) => b.id - a.id); // Ordenar por ID crescente
                setColeta(sortedColeta);
            } catch (error) {
                console.error("Erro ao buscar as últimas coletas finalizadas");
            }
        };
        getColeta();
    }, []);

    // Função para verificar se a coleta foi feita hoje
    const coletaFeitaHoje = (data: string) => getDateDifference(data) === "hoje";

    // Filtro para manter apenas a última coleta de cada ponto
    const filtrarUltimasColetas = (coletas: Coleta[]) => {
        const ultimasColetas: { [key: string]: Coleta } = {};

        coletas.forEach((coleta) => {
            const { tabela } = coleta;

            if (['NA', 'PBS', 'DADOS ETAS', 'CA'].includes(tabela) && !ultimasColetas[tabela]) {
                ultimasColetas[tabela] = coleta;
            }
        });

        return Object.values(ultimasColetas); // Retorna apenas as últimas coletas filtradas
    };

    const renderUltimasColetas = (coleta: Coleta, index: number) => {
    const { tabela, tipo, data } = coleta;
    let message = '';
    let iconClass = '';
    let isCorrect = false;

    // Verificar e atribuir a classe do ícone e mensagem com base nos dados
    if (tabela === 'NA' && tipo === 'SALVO') {
        const diasDesdeUltimaColeta = parseInt(getDateDifference(data));
        const diasParaProximaColeta = 15 - diasDesdeUltimaColeta;

        if (getDateDifference(data) !== "hoje") {
            iconClass = icon_alert;
            message = diasParaProximaColeta > 0
                ? `Dados "NA" coletados há ${diasDesdeUltimaColeta} dias, nova coleta em ${diasParaProximaColeta} dias.`
                : diasParaProximaColeta === 0
                    ? `A data para coletar os dados "NA" é hoje.`
                    : `A coleta dos dados "NA" está vencida há ${Math.abs(diasParaProximaColeta)} dias.`;
        } else {
            iconClass = correct;
            isCorrect = true;
            message = 'Dados "Consumo de água" coletados hoje, próxima coleta em 15 dias.';
        }
    } else if (tabela === 'DADOS ETAS' && tipo === 'SALVO') {
        if (coletaFeitaHoje(data)) {
            iconClass = correct;
            isCorrect = true;
            message = 'Dados "ETAS" já coletados hoje, próxima coleta amanhã.';
        } else if (parseInt(getDateDifference(data)) >= 2) {
            iconClass = icon_alert;
            message = `Coleta dos dados "ETAS" atrasada há ${getDateDifference(data)} dias.`;
        } else {
            iconClass = icon_alert;
            message = 'Coleta dos dados "ETAS" ainda não realizada hoje.';
        }
    } else if (tabela === 'PBS' && tipo === 'SALVO') {
        if (coletaFeitaHoje(data)) {
            iconClass = correct;
            isCorrect = true;
            message = 'Dados "PBS" já coletados hoje, próxima coleta amanhã.';
        } else if (parseInt(getDateDifference(data)) >= 2) {
            iconClass = icon_alert;
            message = `Coleta dos dados "PBS" atrasada há ${getDateDifference(data)} dias.`;
        } else {
            iconClass = icon_alert;
            message = 'Coleta dos dados "PBS" ainda não realizada hoje.';
        }
    } else if (tabela === 'CA' && tipo === 'SALVO') {
        const diasDesdeUltimaColeta = parseInt(getDateDifference(data));
        const diasParaProximaColeta = 30 - diasDesdeUltimaColeta;

        if (getDateDifference(data) !== "hoje") {
            iconClass = icon_alert;
            message = diasParaProximaColeta > 0
                ? `Dados "CA" coletados há ${diasDesdeUltimaColeta} dias, nova coleta em ${diasParaProximaColeta} dias.`
                : diasParaProximaColeta === 0
                    ? `A coleta dos dados "CA" é hoje.`
                    : `A coleta dos dados "CA" está vencida há ${Math.abs(diasParaProximaColeta)} dias.`;
        } else {
            iconClass = correct;
            isCorrect = true;
            message = 'Dados "CA" coletados hoje, próxima coleta em 30 dias.';
        }
    }

    return (
        <div key={`${tabela}-${tipo}-${index}`} className={styles.coleta_container}>
            <div className={styles.coleta_activity}>
                <div className={`${styles.icon_coleta} ${isCorrect ? styles.correct : styles.icon_alert}`}>
                    <img className={styles.imgs_coleta} src={iconClass} alt="Ícone" />
                </div>
                <div className={styles.text_coleta}>
                    <p className={styles.data_coleta}>{message}</p>
                </div>
            </div>
            {index < 5 && (
                <div className={styles.linha_coleta}>
                    <hr className={styles.hr_coleta} />
                </div>
            )}
        </div>
    );
};


    return (
        <section className={styles.notifications_coleta}>
            {filtrarUltimasColetas(coleta).map((c, index) => renderUltimasColetas(c, index))}
        </section>
    );
};
