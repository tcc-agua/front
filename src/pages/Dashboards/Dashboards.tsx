import { Link } from "react-router-dom"
import styles from "./Dashboards.module.css"
import icon_correct from "../../assets/images/correct.svg"
import icon_export from "../../assets/images/export_activity.svg"
import Graphic, { ChartDataProp } from "../../components/Graphic/Graphic"
import Forecast from "../../components/Forecast/Forecast"
import { useEffect, useRef, useState } from "react";
import { deleteNotifByID, fetchHidrometro, fetchNotif, fetchPH, fetchTQ01 } from "../../api/api";
import MapHome from '../../components/MapHome/MapHome';
import DropdownButton from "../../components/DropdownButton/DropdownButton"
import icon_alert from "../../assets/images/alert.svg"

interface DropdownItem {
    id: string;
    label: string;
    value: string | number;
}

interface Hidrometro {
    id: number;
    volume: number;
    ponto: string;
}

interface Notification {
    id: number;
    tabela: 'DADOS ETAS' | 'NA' | 'PBS' | 'EXCEL' | 'CA';
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

// Função que permite ao usuário escolher os dados serão exibidos no gráfico
const GraphicDropdown: React.FC = () => {
    const [chartData, setChartData] = useState<ChartDataProp | undefined>(undefined);
    const [selectedHidro, setSelectedHidro] = useState<DropdownItem | undefined>(undefined);
    const [hidroVolume, setHidroVolume] = useState<number[]>([]);
    const [selectedDate, setSelectedDate] = useState< DropdownItem>({ id: '1', label: '2024', value: '2024' });
    const [selectedTable, setSelectedTable] = useState<DropdownItem>({ id: '1', label: 'Leitura hidrômetros', value: 'leitura'});

    const iconClass = useRef('');
    const message = useRef('');


    // Opções de hidrômetros que o usuário pode escolher para visualizar no gráfico
    const hidro: DropdownItem[] = [
        { id: '53', label: 'Geral Fábrica', value: 'Geral Fabrica' },
        { id: '54', label: 'Kinderhaus', value: 'Kinderhaus' },
        { id: '55', label: 'Refeitório', value: 'Refeitorio' },
        { id: '56', label: 'Geral222', value: 'Geral222' },
        { id: '57', label: 'Entrada Desmi', value: 'EntradaDesmi' },
        { id: '58', label: 'Saída Desmi', value: 'SaidaDesmi' },
        { id: '59', label: 'Geral 210', value: 'Geral210' },
        { id: '60', label: 'Descarte', value: 'Descarte' },
        { id: '61', label: 'Geral 401', value: 'Geral401' },
        { id: '62', label: 'Água Quente', value: 'Agua Quente' },
        { id: '63', label: 'Água Industrial', value: 'Agua industrial' },
        { id: '64', label: 'Geral 303', value: 'Geral303' },
        { id: '65', label: 'Geral 304', value: 'Geral304' },
        { id: '66', label: 'Geral 115', value: 'Geral115' },
        { id: '67', label: 'Geral 101', value: 'Geral101' },
        { id: '68', label: 'Tanque Reman', value: 'Tanque Reman' },
    ]

    // Opções de período de coleta que ele deseja visualizar
    const dateOptions: DropdownItem[] = [
        { id: '1', label: '2024', value: '2024' },
        { id: '2', label: '2025', value: '2025' },
        { id: '3', label: '2026', value: '2026' },
        { id: '4', label: '2027', value: '2027' },
        { id: '5', label: '2028', value: '2028' },
        { id: '6', label: '2029', value: '2029' },
        { id: '7', label: '2030', value: '2030' }
    ]

    // Opções de tipos de dado que ele deseja finalizar 
    const tableOptions: DropdownItem[] = [
        {id: '1', label: 'Leitura hidrômetros', value: 'leitura'},
        {id: '2', label: 'Consumo de água', value: 'consumo'},
    ]

    // Função para buscar os dados do hidrometro selecionado
    useEffect(() => {
        const FetchHidrometro = async (ponto: string, year: string, table: string) => {
            try {
                const data: Hidrometro[] = await fetchHidrometro(ponto, year);
                const lastYear = (parseInt(year) - 1).toString();
                const volumes = data.map(hidrometro => hidrometro.volume);
                const nome = selectedHidro?.label ?? 'Hidrometro não selecionado.';
                setHidroVolume(volumes);

                // Pegando o registro de volume de dezembro do ano anterior, a fim de fazer 
                // a conta do consumo de água desde janeiro
                let volumeDezembroAnterior = 0;
                try {
                    const dezDataResponse = await fetchHidrometro(ponto, lastYear);

                    // Verifica se a resposta é ok 
                    if (!dezDataResponse.ok) {
                        if (dezDataResponse.status === 404) {
                            console.warn(`Dados não encontrados para dezembro de ${lastYear}. Usando valor 0.`);
                            volumeDezembroAnterior = 0;
                        } else {
                            throw new Error(`Erro na requisição: ${dezDataResponse.status}`);
                        }
                    } else {
                        const dezData: Hidrometro[] = await dezDataResponse.json();
                        volumeDezembroAnterior = dezData[11]?.volume || 0;
                    }

                } catch (error) {
                    console.error("Erro ao buscar dados do ano anterior", error);
                    volumeDezembroAnterior = 0; // Fallback para o valor 0 caso ocorra outro erro
                }

                // Iniciando o array de consumo com o valor da diferença entre janeiro e dezembro
                const consumo: number[] = [(volumes[0]- parseFloat(volumeDezembroAnterior.toFixed(2)))];

                const mesesVazamento: string[] = [];

                // Fazendo a diferença entre o mês atual e o anterior 
                for (let i = 1; i < volumes.length; i++) {
                    const diferrence = volumes[i]-volumes[i-1]
                    consumo.push(parseFloat(diferrence.toFixed(2)))
                }

                // Calculando a média do array consumo
                const somaConsumo = consumo.reduce((acc, val) => acc + val, 0);
                const mediaConsumo = somaConsumo / consumo.length;

                const limiteVazamento = mediaConsumo * 1.5;
                let vazamentoDetectado = false;
                
                 // Verificando se algum consumo mensal excede o limite
                consumo.forEach((valor, index) => {
                    if (valor > limiteVazamento) {
                        vazamentoDetectado = true;
                        const mes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][index];
                        mesesVazamento.push(mes);
                        console.warn(`Possível vazamento detectado no mês ${index + 1}. Consumo: ${valor}, Limite: ${limiteVazamento}`);
                    }
                });

                if (table === 'leitura') {
                    // Definindo o que o gráfico irá receber
                    setChartData({
                        meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                        nome,
                        volumes
                    })
                } else if (table === 'consumo') {
                    // Definindo o que o gráfico irá receber
                    setChartData({
                        meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                        nome,
                        volumes: consumo
                    })
                }

                if (vazamentoDetectado) {
                    iconClass.current = icon_alert; // Presumindo que você tenha essa variável definida
                    message.current = `Possível vazamento detectado nos meses: ${mesesVazamento.join(', ')}`;
                }

            } catch (error) {
                console.error("Erro ao buscar dados do hidrometro selecionado.");
                console.error(error);
            }
        };

        // Estanciando as variáveis com base na escolha do usuário no dropdown
        const ponto = selectedHidro ? selectedHidro.value.toString() : 'Geral Fabrica';
        const year = selectedDate.value.toString();
        const table = selectedTable.value.toString();

        if (selectedHidro) {
            FetchHidrometro(ponto, year, table);
        } else {
            FetchHidrometro('Geral Fabrica', '2024', 'leitura') // Seleciona um valor base, caso nenhum ponto seja escolhido ainda, para o gráfico não sumir
        }
    }, [selectedHidro, selectedDate, selectedTable]);

    return (
        <div>
            <DropdownButton
                id="hidroDropdown"
                title="Geral Fábrica"
                options={hidro}
                selectedOption={selectedHidro}
                onSelect={setSelectedHidro}
            />

            <DropdownButton
                id="dateDropdown"
                title={selectedDate ? selectedDate.label : 'Selecione o ano'}
                options={dateOptions}
                selectedOption={selectedDate}
                onSelect={setSelectedDate}
            />

            <DropdownButton
                id="tableDropdown"
                title={selectedDate ? selectedDate.label : 'Selecione a tabela'}
                options={tableOptions}
                selectedOption={selectedTable}
                onSelect={setSelectedTable}
            />
            {hidroVolume && (
                <div>
                    <Graphic chartDataProp={chartData} />
                    <div className={styles.graphic_activity}>
                        <div className={styles.icon_alert}>
                            <img className={styles.imgs_graphic} src={iconClass.current} alt="Ícone" />
                        </div>
                        <div className={styles.text_graphic}>
                            <p className={styles.data_graphic}>{message.current}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

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

                    if (sortedNivel.length >= 2) {
                        const lastNivel = sortedNivel[0].nivel;
                        const previousNivel = sortedNivel[1].nivel;

                        if (previousNivel !== 0) {
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
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Request que resgata a as notificações
    useEffect(() => {
        const getNotifications = async () => {
            try {
                const data: Notification[] = await fetchNotif();
                const sortedNotifications = data.sort((a, b) => b.id - a.id);
                setNotifications(sortedNotifications);

                // Filtra as notificações com mais de 7 dias
                const oldNotifications = sortedNotifications.filter((notification) => {
                    return parseInt(getDateDifference(notification.data)) >= 7;
                });

                // Exclui as notificações antigas
                for (const notification of oldNotifications) {
                    await deleteNotifByID(notification.id);
                }

            } catch (error) {
                console.error("Erro ao buscar notificações.");
                console.log(error)
            }
        };
        getNotifications();
    }, []);

    // Atualiza a largura da tela
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
        } else if (['CA'].includes(tabela) && tipo === 'SALVO') {
            message = `Dados de "Consumo de água" salvo com sucesso!`
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
                {index < 2 + (windowWidth < 1500 ? 1 : 0) && (
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
            {notifications.slice(0, 3 + (windowWidth < 1500 ? 1 : 0)).map(renderNotif)}
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
                        <Niveltq01 />
                    </div>
                </div>

                <div className={styles.weekly_weather}>
                    <p className={styles.title}>Clima Semanal</p>
                    <Forecast />
                </div>

                <div className={styles.graphic}>
                    <p className={styles.title}>Leitura dos hidrômetros</p>
                    <div className={styles.grafico}>
                        <GraphicDropdown />
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
                    <p className={styles.title_map}>Mapa de Curitiba</p>
                    <div className={styles.map}>
                        <MapHome />
                    </div>
                </div>
            </div>
        </div>
    );
}
