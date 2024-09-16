import styles from './LastActivities.module.css';
import icon_correct from "../../assets/images/correct.svg";
import icon_export from "../../assets/images/export_activity.svg";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchNotif } from '../../api/api';

interface Notification {
    id: number;
    tabela: 'DADOS ETAS' | 'NA' | 'PB' | 'EXCEL';
    tipo: 'SALVO' | 'EXPORTADO';
    data: string;
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

export const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const getNotifications = async () => {
            try {
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
            <>
            <div key={`${tabela}-${tipo}-${index}`} className={styles.data_activity}>
                <div className={styles.left_side}>
                    <div className={`${styles.icon_activity} ${isExport ? styles.icon_export : styles.icon_correct}`}>
                        <img
                            className={styles.imgs_activity}
                            src={isExport ? icon_export : icon_correct}
                            alt={isExport ? "icon_export" : "icon_correct"}
                        />
                    </div>
                    <p className={styles.text_history}>{message}</p>
                </div>
                <div className={styles.right_side}>
                    <p className={styles.day_history}>{getDateDifference(data)}</p>
                    <Link className={styles.button_history} to='/inicial/historico'>Veja</Link>
                </div>
            </div>
            <div className={styles.hr}>
                <hr  />
            </div>
                
            </>
            
        );
    };

    return (
        <div>
            {notifications.map((notification, index) => (
                renderNotif(notification, index)
            ))}
        </div>
    );
};

export const LastNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const getNotifications = async () => {
            try {
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
            <div key={`${tabela}-${tipo}-${index}`} className={styles.data_activity}>
                <div className={styles.first_activity}>
                    <div className={styles.upside_content}>
                        <p className={styles.day}>{getDateDifference(data)}</p>
                        <div className={`${styles.icon_activity} ${isExport ? styles.icon_export : styles.icon_correct}`}>
                            <img
                                className={styles.imgs_activity}
                                src={isExport ? icon_export : icon_correct}
                                alt={isExport ? "icon_export" : "icon_correct"}
                            />
                        </div>
                        <div className={styles.main_information_content}>
                            <p className={styles.main_information}>{message}</p>
                        </div>
                        <div className={styles.botaozinho}>
                            <Link to='/inicial/exportar_excel' className={styles.button_to_excel}>Analisar os dados</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.content_last_activities}>
            {notifications.slice(0, 2).map(renderNotif)}
        </div>
    );
};

export const LastActivities: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.last_activities_container}>
                <p className={styles.title}>Suas últimas atualizações</p>
                <div className={styles.last_activities_content}>
                    <LastNotifications />
                </div>
            </div>
            <div className={styles.history_activity_container}>
                <p className={styles.title_history_activity}>Histórico de atividades</p>
                <div className={styles.history_activity_content}>
                    <Notifications />
                </div>
            </div>
        </div>
    );
};
