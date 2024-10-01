import { Link } from "react-router-dom"
import styles from "./Dashboards.module.css"
import icon_correct from "../../assets/images/correct.svg"
import icon_export from "../../assets/images/export_activity.svg"
import Graphic from "../../components/Graphic/Graphic"
import Forecast from "../../components/Forecast/Forecast"
import { useEffect, useState } from "react";
import { fetchNotif, fetchPH, fetchTQ01 } from "../../api/api";
import MapHome from '../../components/MapHome/MapHome';

const mockData = {
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    expense: [500, 700, 300, 800, 600],
    income: [1000, 1200, 900, 1400, 1300],
};

interface Notification {
    id: number;
    tabela: 'DADOS ETAS' | 'NA' | 'PBS' | 'EXCEL';
    tipo: 'SALVO' | 'EXPORTADO';
    data: string;
}

interface PH {
    id: number;
    ph: number;
}

interface Nivel {
    id: number,
    nivel: number
}
// Verifica a data atual e compara com a data em que a coleta foi feita
// assim retornando a quanto tempo aquela coleta foi realizada
// eslint-disable-next-line react-refresh/only-export-components
export const getDateDifference = (notifDate: string): string => {
    const [notifYear, notifMonth, notifDay] = notifDate.split('-').map(Number);
    const notifDateObj = new Date(notifYear, notifMonth - 1, notifDay);

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
    const todayDateObj = new Date(todayYear, todayMonth, todayDay); // Instancia um objeto com a data atual, ano, mês e dia

    const timeDiff = todayDateObj.getTime() - notifDateObj.getTime(); // Faz a diferença entre a data atual e data da notificação
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Transforma essa data em dia 

    if (notifDateObj.toDateString() === todayDateObj.toDateString()) {
        return "hoje";
    } else {
        return `${dayDiff}`;
    }
};

// Pega os dados do sensor PH e compara o último dado coletado com o antepenúltimo
// mostrando se o PH subiu ou desceu
export const SensorPH: React.FC = () => {
    const [, setPh] = useState<PH[]>([]);
    const [differencePercentage, setDifferencePercentage] = useState<number>(0);
    const [isIncrease, setIsIncrease] = useState<boolean>(true);

    useEffect(() => {
        const getPH = async () => {
            try {
                const data: PH[] = await fetchPH();
                const sortedPH = data.sort((a, b) => b.id - a.id); // pega do maior id pro menor
                setPh(sortedPH);


                if (sortedPH.length >= 2) { 
                    // pega somente os dois ultimos registros
                    const lastPH = sortedPH[0].ph;
                    const previousPH = sortedPH[1].ph;
                    
                    // verifica a diferença entre um registro e outro em porcentagem
                    const percentageDifference = ((lastPH - previousPH) / previousPH) * 100;
                    setDifferencePercentage(Math.abs(percentageDifference));
                    setIsIncrease(percentageDifference > 0);
                }
            } catch (error) {
                console.error("Erro ao buscar informações de 'sensorPH.");
                console.log(error);
            }
        };

        getPH();
    }, []);

    return (
        <div className={styles.first_update}>
            <p className={styles.point}>Dados ETAS - Sensor PH</p>
            <p className={styles.main_information}>
                {isIncrease ? 'PH mais ácido' : 'PH menos ácido'}
            </p>
            <div className={styles.extra_information}>
                <pre>
                    <span className={styles.extra}>
                        {isIncrease ? '↗' : '↘'} {differencePercentage.toFixed(0)}%
                    </span>{' '}
                    {isIncrease ? 'maior' : 'menor'} que na última semana
                </pre>
            </div>
        </div>
    );
};


// Pega os dados do nível do ponto tq01, compara o último com o penúltimo nível
// e indica se ele subiu ou desceu 
export const Niveltq01: React.FC = () => {
    const [, setNivel] = useState<Nivel[]>([]);
    const [differencePercentage, setDifferencePercentage] = useState<number>(0);
    const [isIncrease, setIsIncrease] = useState<boolean>(true);
    
    useEffect(() => {
        const getNivel = async () => {
            try {
                const data: Nivel[] = await fetchTQ01();
                if (Array.isArray(data)) {
                    const sortedNivel = data.sort((a, b) => b.id - a.id);
                    setNivel(sortedNivel);

                if(sortedNivel.length >= 2) {
                    const lastNivel = sortedNivel[0].nivel;
                    const previousNivel = sortedNivel[1].nivel;

                    if ( previousNivel !== 0 ) {
                        const percentageDiff = ((lastNivel - previousNivel) / previousNivel) * 100;
                        setDifferencePercentage(Math.abs(percentageDiff));
                        setIsIncrease(percentageDiff > 0);
                    }
                }
                }
            } catch (error) {
                console.error("Erro ao buscar informações de 'Nivel TQ01.");
                console.log(error)
            }
        };
        getNivel();
    }, []);

    return (
        <div className={styles.second_update}>
            <p className={styles.point}>Dados ETAS - TQ01 Nível</p>
            <p className={styles.main_information}>{isIncrease ? 'Nível mais alto' : 'Nível mais baixo'}</p>
            <div className={styles.extra_information}>
                <pre>
                    <span className={styles.extra}>
                        {isIncrease ? '↗' : '↘'} {differencePercentage.toFixed(0)}%
                        </span> {' '}
                        {isIncrease ? 'maior' : 'menor'} que na última semana
                    </pre>
            </div>
        </div>
    )

};

// Resgata todas as notificações salvas no banco de dados e configura como serão exibidas
export const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Request que resgata a as notificações
    useEffect(() => {
        const getNotifications = async () => {
            try {
                const data: Notification[] = await fetchNotif();
                const sortedNotifications = data.sort((a, b) => b.id - a.id);

                setNotifications(sortedNotifications);

            } catch (error) {
                console.error("Erro ao buscar notificações.");
                console.log(error)
            }
        };
        getNotifications();
    }, []);

    // Renderiza as notificações com base nos dados de cada uma, definindo o ícone e 
    // a mensagem a serem definidos
    const renderNotif = (notification: Notification, index: number) => {
        const { tabela, tipo, data } = notification;
        const isExport = tipo === 'EXPORTADO';
        let message = '';

        if (tabela === 'EXCEL' && isExport) {
            message = "Excel exportado com sucesso!";

        } else if (['NA', 'PBS'].includes(tabela) && tipo === 'SALVO') {
            message = `Dados "${tabela}" salvo com sucesso!`;
            
        } else if (['DADOS ETAS'].includes(tabela) && tipo === 'SALVO') {
            message = `Dados "ETAS" salvo com sucesso!`;
        }

        let dayDiff = getDateDifference(data)
        if (dayDiff !== "hoje") {
            dayDiff = `${dayDiff} dias atrás`
        }

        return (
            <div key={`${tabela}-${tipo}-${index}`}>
                <div className={styles.activity}>
                    <div className={`${styles.icon_activity} ${isExport ? styles.icon_export : styles.icon_correct}`}>
                        <img
                            className={styles.imgs_activity}
                            src={isExport ? icon_export : icon_correct}
                            alt={isExport ? "icon_export" : "icon_correct"}
                        />
                    </div>
                    <div className={styles.text_activity}>
                        <p className={styles.data_activity}>{message}</p>
                        <p className={styles.days}>{dayDiff}</p>
                    </div>
                </div>
                {index < 2 && (
                    <div className={styles.linha_hr}>
                        <hr className={styles.hr_dash} />
                    </div>
                )}
            </div>
        );
    };

    // Garante que serão exibidas na home somente as últimas três notificações salvas
    return (
        <div className={styles.content_last_activities}>
            {notifications.slice(0, 3).map(renderNotif)}
        </div>
    );
};

export function Dashboards() {

    return (
        <div className={styles.container}>
            <div className={styles.left_side}>
                <div className={styles.updates}>
                    <p className={styles.title}>Atualizações</p>
                    <div className={styles.content_updates}> 
                        <SensorPH /> 
                        <Niveltq01/>
                    </div>
                </div>

                <div className={styles.weekly_weather}>
                    <p className={styles.title}>Clima Semanal</p>
                    <Forecast />
                </div>

                <div className={styles.graphic}>
                    <p className={styles.title}>Gráfico</p>
                    <div className={styles.grafico}>
                        <Graphic chartDataProp={mockData} />
                    </div>
                </div>
            </div>

            <div className={styles.right_side}>
                <div className={styles.last_activities}>
                    <div className={styles.title_more}>
                        <p className={styles.title}>Últimas atividades</p>
                        <Link to={'/inicial/ultimas_atividades'} className={styles.more}>Mais</Link>
                    </div>
                    <Notifications />
                </div>
                <div className={styles.mapview}>

                    <p className={styles.title}>Mapa de Curitiba</p>
                    <div className={styles.content_mapview}>
                        <div className={styles.map}>
                            <MapHome />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
