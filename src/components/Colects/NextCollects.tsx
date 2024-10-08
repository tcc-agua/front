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
        const isCorrect = iconClass === correct;

        if (tabela === 'NA' && tipo === 'SALVO') {
            if (getDateDifference(data) !== "hoje") {
                iconClass = icon_alert;
                const diasDesdeUltimaColeta = parseInt(getDateDifference(data));
                const diasParaProximaColeta = 15 - diasDesdeUltimaColeta;

                if ( diasParaProximaColeta > 0) {
                    message = `Dados "NA" coletados há ${diasDesdeUltimaColeta} dias, uma nova coleta deve ser feita em ${diasParaProximaColeta} dias.`;
                } else if (diasParaProximaColeta === 0) {
                    message = `A data para coletar os dados "NA" é hoje.`;
                } else if (diasParaProximaColeta < 0 ) {
                    message = `A data para coletar os dados "NA" venceu a ${diasParaProximaColeta} dias.`;
                }
            } else {
                iconClass = correct;
                message = 'Dados "Consumo de água" coletados hoje, a próxima coleta deve ser feita em 15 dias.'
            }

        } else if (tabela === 'DADOS ETAS' && tipo === 'SALVO') {
            if (coletaFeitaHoje(data)) {
                iconClass = correct;
                message = 'Dados "ETAS" já coletados hoje, próxima coleta amanhã.'
            } else if (parseInt(getDateDifference(data)) >= 2 ) {
                iconClass = icon_alert;
                message = `Coleta dados "ETAS" atrasada a ${getDateDifference(data)} dias.`
            } else {
                iconClass = icon_alert;
                message = 'Coleta dados "ETAS" ainda não foram coletados hoje.'
            }
            
        } else if (tabela === 'PBS' && tipo === 'SALVO') {
            if (coletaFeitaHoje(data)) {
                iconClass = correct;
                message = 'Dados "PBS" já coletados hoje, próxima coleta amanhã.'
            } else if (parseInt(getDateDifference(data)) >= 2 ) {
                iconClass = icon_alert;
                message = `Coleta dados "PBS" atrasada a ${getDateDifference(data)} dias.`
            } else {
                iconClass = icon_alert;
                message = 'Coleta dados "PBS" ainda não foram coletados hoje.'
            }
        } else if (tabela === 'CA' && tipo === 'SALVO') {
            if (getDateDifference(data) !== "hoje") {
                
                const diasDesdeUltimaColeta = parseInt(getDateDifference(data));
                const diasParaProximaColeta = 30 - diasDesdeUltimaColeta;

                if ( diasParaProximaColeta > 0) {
                    iconClass = icon_alert;
                    message = `Dados "NA" coletados há ${diasDesdeUltimaColeta} dias, uma nova coleta deve ser feita em ${diasParaProximaColeta} dias.`;
                } else if (diasParaProximaColeta === 0) {
                    iconClass = icon_alert;
                    message = `A data para coletar os dados "NA" é hoje.`;
                } else if (diasParaProximaColeta < 0 ) {
                    iconClass = icon_alert;
                    message = `A data para coletar os dados "NA" venceu a ${diasParaProximaColeta} dias.`;
                }
            } else {
                iconClass = correct;
                message = 'Dados "Consumo de água" coletados hoje, a próxima coleta deve ser feita em 15 dias.'
            }
        }

        return (
            <div key={`${tabela}-${tipo}-${index}`} className={styles.coleta_container}>
                <div className={styles.coleta_activity}>
                    <div className={`${styles.icon_coleta} ${isCorrect ? styles.icon_alert : styles.correct}`}>
                        <img className={styles.imgs_coleta} src={`${iconClass}`} alt="Ícone" />
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
