import { useEffect, useState } from "react";
import { fetchNotif } from "../../api/api";
import styles from "./NextCollect.module.css";
import { getDateDifference } from "../../pages/Dashboards/Dashboards";
import icon_alert from "../../assets/images/alert.svg";

interface Coleta {
    id: number;
    tabela: 'DADOS ETAS' | 'NA' | 'PBS' | 'EXCEL';
    tipo: 'SALVO' | 'EXPORTADO';
    data: string;
}

export const NextCollects: React.FC = () => {
    const [coleta, setColeta] = useState<Coleta[]>([]);

    useEffect(() => {
        const getColeta = async () => {
            try {
                const data: Coleta[] = await fetchNotif();
                const sortedColeta = data.sort((a, b) => b.id - a.id);
                setColeta(sortedColeta);
            } catch (error) {
                console.error("Erro ao buscar as últimas coletas finalizadas");
            }
        };
        getColeta();
    }, []);

    const coletaFeitaHoje = (data: string) => getDateDifference(data) === "hoje";

    const filtrarUltimasColetas = (coletas: Coleta[]) => {
        const ultimasColetas: { [key: string]: Coleta } = {};

        coletas.forEach((coleta) => {
            const { tabela } = coleta;
            if (['NA', 'PBS', 'DADOS ETAS'].includes(tabela) && !ultimasColetas[tabela]) {
                ultimasColetas[tabela] = coleta;
            }
        });

        return Object.values(ultimasColetas);
    };

    const renderUltimasColetas = (coleta: Coleta, index: number) => {
        const { tabela, tipo, data } = coleta;
        let message = '';
        let iconClass = '';

        if (tabela === 'NA' && tipo === 'SALVO') {
            iconClass = 'icon_salvo';
            const diasDesdeUltimaColeta = parseInt(getDateDifference(data));
            const diasParaProximaColeta = 15 - diasDesdeUltimaColeta;

            message = diasParaProximaColeta > 0
                ? `Dados "${tabela}" coletados há ${diasDesdeUltimaColeta} dias, próxima coleta em ${diasParaProximaColeta} dias.`
                : `Já passou o prazo para coletar os dados "${tabela}".`;
        } else if (tabela === 'DADOS ETAS' && tipo === 'SALVO') {
            iconClass = coletaFeitaHoje(data) ? 'icon_salvo' : 'icon_alert';
            message = coletaFeitaHoje(data)
                ? `Dados "ETAS" já coletados hoje, próxima coleta amanhã.`
                : `Dados "ETAS" ainda não coletados hoje.`;
        } else if (tabela === 'PBS' && tipo === 'SALVO') {
            iconClass = coletaFeitaHoje(data) ? 'icon_salvo' : 'icon_alert';
            message = coletaFeitaHoje(data)
                ? `Dados "${tabela}" já coletados hoje, próxima coleta amanhã.`
                : `Os dados "${tabela}" ainda não coletados hoje.`;
        }

        const dayDiff = getDateDifference(data) !== "hoje"
            ? `${getDateDifference(data)} dias atrás`
            : "hoje";

        return (
            <div key={`${tabela}-${tipo}-${index}`} className={styles.coleta_container}>
                <div className={styles.coleta_activity}>
                    <div className={`${styles.icon_coleta} ${styles[iconClass]}`}>
                        <img className={styles.imgs_coleta} src={icon_alert} alt="Ícone de alerta" />
                    </div>
                    <div className={styles.text_coleta}>
                        <p className={styles.data_coleta}>{message}</p>
                        <p className={styles.dias_coleta}>{dayDiff}</p>
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
