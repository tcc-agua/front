import { Link } from "react-router-dom"
import styles from "./Dashboards.module.css"
import icon_correct from "../../assets/images/correct.svg"
import icon_export from "../../assets/images/export_activity.svg"
import Graphic from "../../components/Graphic/Graphic"
import Map from "../../assets/images/mapa-panorama.svg"
import MapDarkmode from "../../assets/images/foto_mapa_dark.svg";
import Forecast from "../../components/Forecast/Forecast"
import { useEffect, useState } from "react";
import { fetchNotif, fetchPH, fetchTQ01 } from "../../api/api";
import { useTheme } from '../../components/ThemeContext/ThemeContext';
import MapSpline from '../../components/MapSpline/MapSpline';
import Loading from '../../components/LoadingMap/LoadingMap';

const mockData = {
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    expense: [500, 700, 300, 800, 600],
    income: [1000, 1200, 900, 1400, 1300],
};

interface Notification {
    id: number;
    tabela: 'DADOS ETAS' | 'NA' | 'PB' | 'EXCEL';
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

const MapDark = () => {
    const { isDarkMode } = useTheme();
    return isDarkMode ? MapDarkmode : Map;
}

const getDateDifference = (notifDate: string): string => {
    const [notifYear, notifMonth, notifDay] = notifDate.split('-').map(Number);
    const notifDateObj = new Date(notifYear, notifMonth - 1, notifDay);

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
    const todayDateObj = new Date(todayYear, todayMonth, todayDay);

    const timeDiff = todayDateObj.getTime() - notifDateObj.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (notifDateObj.toDateString() === todayDateObj.toDateString()) {
        return "hoje";
    } else {
        return `${dayDiff} dias atrás`;
    }
};

export const SensorPH: React.FC = () => {
    const [, setPh] = useState<PH[]>([]);
    const [differencePercentage, setDifferencePercentage] = useState<number>(0);
    const [isIncrease, setIsIncrease] = useState<boolean>(true);

    useEffect(() => {
        const getPH = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 3000));
                const data: PH[] = await fetchPH();
                const sortedPH = data.sort((a, b) => b.id - a.id);
                setPh(sortedPH);


                if (sortedPH.length >= 2) {
                    const lastPH = sortedPH[0].ph;
                    const previousPH = sortedPH[1].ph;

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

export const Niveltq01: React.FC = () => {
    const [, setNivel] = useState<Nivel[]>([]);
    const [differencePercentage, setDifferencePercentage] = useState<number>(0);
    const [isIncrease, setIsIncrease] = useState<boolean>(true);
    
    useEffect(() => {
        const getNivel = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 3000));
                const data: Nivel[] = await fetchTQ01();
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


export const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const getNotifications = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 3000));
                const data: Notification[] = await fetchNotif();
                const sortedNotifications = data.sort((a, b) => b.id - a.id);

                setNotifications(sortedNotifications);
            } catch (error) {
                console.error("Erro ao buscar notificações.");
            }
        };
        getNotifications();
    }, []);

    const renderNotif = (notification: Notification, index: number) => {
        const { tabela, tipo, data } = notification;
        const isExport = tipo === 'EXPORTADO';
        let message = '';

        if (tabela === 'EXCEL' && isExport) {
            message = "Excel exportado com sucesso!";
        } else if (['NA', 'PB'].includes(tabela) && tipo === 'SALVO') {
            message = `Dados "${tabela}" salvo com sucesso!`;
        } else if (['DADOS ETAS'].includes(tabela) && tipo === 'SALVO') {
            message = `Dados "ETAS" salvo com sucesso!`;
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
                        <p className={styles.days}>{getDateDifference(data)}</p>
                    </div>
                </div>
                <div className={styles.linha_hr}>
                    <hr className={styles.hr_dash} />
                </div>
            </div>
        );
    };

    return (
        <div className={styles.content_last_activities}>
            {notifications.slice(0, 3).map(renderNotif)}
        </div>
    );
};

export function Dashboards() {
    const mapSrc = MapDark();

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
                            <MapSpline />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
