import styles from './WaterConsumption.module.css';
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useUtilsStore from "../../store/utils";
import { fetchColeta, fetchPointBySheet } from "../../api/api";
import PointButton from "../../components/PointButton/PointButton";
import { COLETA } from "../../interfaces/postParams";
import { NextCollects } from "../../components/Colects/NextCollects";
import useColetaStore from "../../store/ColetaStore";
import { Point } from '../PointCollect/PointNames';
import { updatePontoStatus } from '../../services/PontoService';

export function WaterConsumption() {
    const [ca, setCa] = useState<Point[]>([]);
    const { createColetaMeasure } = useColetaStore();
    const [showPointButtons, setShowPointButtons] = useState<boolean>(false);
    const location = useLocation(); 

    const navigate = useNavigate();
    const { setPlanilha, caPercentage, fetchPoints } = useUtilsStore();

    useEffect(() => {
        const fetchPontos = async () => {
        try {
            fetchPoints();
            const caResponse = await fetchPointBySheet("CA");
        
            setCa(caResponse)

        } catch (error) {
            console.error("Erro ao buscar pontos:", error);
        }
    };
    fetchPontos();
  }, [fetchPoints, caPercentage]);

  useEffect(() => {
    const fetchColetaAtual = async () => {
      try {
        const response = await fetchColeta();
  
        const storedDate = response?.dataColeta;
        const currentDate = formatDate(new Date());
  
        setShowPointButtons(storedDate === currentDate);
  
        if (storedDate !== currentDate) {
          [...ca].forEach((i) => {
            updatePontoStatus(i.nome, "NAO_COLETADO");
          });
        }
      } catch (error) {
        console.error("Erro ao buscar coleta:", error);
      }
    };
  
    fetchColetaAtual();
  }, [ca, location]);

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const sendInformation = () => {
        const obj: COLETA = {
            dataColeta: formatDate(new Date()),
            horaInicio: new Date().toLocaleTimeString(),
            horaFim: new Date().toLocaleTimeString(),
            tecnico: "BOSCH",
        };

        console.log(obj);

        createColetaMeasure(obj);
        setShowPointButtons(true);
    };

    const handlePoint = (planilha: string) => {
        setPlanilha(planilha);
        navigate("/inicial/pontos_de_coleta");
    };

    return (
        <div className={styles.container}>
            {!showPointButtons && (
                <>
                    <p className={styles.text}>
                        Para prosseguir, inicie uma nova coleta para registrar os pontos desejados.
                    </p>
                    <button onClick={sendInformation} className={styles.iniciarcoleta}>
                        <p>Iniciar Coleta</p>
                    </button>
                </>
            )}

            {showPointButtons && (
                <div>
                    <p className={styles.text}>Selecione a planilha desejada:</p>
                    <div className={styles.main_content}>
                        <section className={styles.left_side}>
                            <div className={styles.options_data}>
                                <PointButton
                                    onClick={() => handlePoint("CA")}
                                    title="Consumo de Água"
                                    percentage={caPercentage}
                                    points={ca.length}
                                    filledText="Preenchido"
                                    pointsText="Pontos"
                                    containerClass={styles.data_ca_content}
                                    titleClass={styles.title_data_content_ca}
                                    percentageClass={styles.percentage_content_ca}
                                    pointsClass={styles.points_content_ca}
                                />
                            </div>
                        </section>
                        <section className={styles.right_side}>
                            <div className={styles.recent_points_container}>
                                <NextCollects />
                            </div>
                        </section>
                    </div>
                </div>
            )}
            <Outlet />
        </div>
    );
}