import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./Collect.module.css";
import useUtilsStore from "../../store/utils";
import { fetchColeta, fetchPointBySheet } from "../../api/api";
import PointButton from "../../components/PointButton/PointButton";
import { COLETA } from "../../interfaces/postParams";
import { NextCollects } from "../../components/Colects/NextCollects";
import useColetaStore from "../../store/ColetaStore";
import { Point } from "../PointCollect/PointNames";
import { updatePontoStatus } from "../../services/PontoService";

export function Collect() {
  const [etas, setEtas] = useState<Point[]>([]);
  const [na, setNa] = useState<Point[]>([]);
  const [pb, setPb] = useState<Point[]>([]);
  const [ca, setCa] = useState<Point[]>([]);

  const { createColetaMeasure } = useColetaStore();
  const [showPointButtons, setShowPointButtons] = useState<boolean>(false);
  const location = useLocation(); 
  const navigate = useNavigate();
  const { setPlanilha, naPercentage, etasPercentage, pbPercentage, fetchPoints } = useUtilsStore();

  useEffect(() => {
    const fetchPontos = async () => {
      try {
        fetchPoints();
        const [etasResponse, naResponse, pbResponse, caResponse] = await Promise.all([
          fetchPointBySheet("DADOS ETAS"),
          fetchPointBySheet("NA"),
          fetchPointBySheet("PBS"),
          fetchPointBySheet("CA"),
        ]);

        setEtas(etasResponse);
        setNa(naResponse);
        setPb(pbResponse);
        setCa(caResponse)

      } catch (error) {
        console.error("Erro ao buscar pontos:", error);
      }
    };

    fetchPontos();
  }, [fetchPoints]);

// Buscar e comparar coleta atual 

useEffect(() => {
  const fetchColetaAtual = async () => {
    try {
      const response = await fetchColeta();

      const storedDate = response?.dataColeta;
      const currentDate = formatDate(new Date());

      if (storedDate !== currentDate) {
        [...etas, ...na, ...pb, ...ca].forEach((i) => {
          console.log("UPDATE STATUS DOS PONTO!");
          updatePontoStatus(i.nome, "NAO_COLETADO");
        });
        fetchPoints();
      }

      setShowPointButtons(storedDate === currentDate);

    } catch (error) {
      console.error("Erro ao buscar coleta:", error);
    }
  };

  fetchColetaAtual();
}, [fetchPoints, etas, na, pb, ca, location]);

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
                  onClick={() => handlePoint("DADOS ETAS")}
                  title="Estações de Tratamento de Águas S."
                  percentage={etasPercentage}
                  points={etas.length}
                  filledText="Preenchido"
                  pointsText="Pontos"
                  containerClass={styles.data_etas_content}
                  titleClass={styles.title_data_content_etas}
                  percentageClass={styles.percentage_content_etas}
                  pointsClass={styles.points_content_etas}
                />
                <PointButton
                  onClick={() => handlePoint("NA")}
                  title="Nível D'água"
                  percentage={naPercentage}
                  points={na.length}
                  filledText="Preenchido"
                  pointsText="Pontos"
                  containerClass={styles.data_na_content}
                  titleClass={styles.title_data_content_na}
                  percentageClass={styles.percentage_content_na}
                  pointsClass={styles.points_content_na}
                />
                <PointButton
                  onClick={() => handlePoint("PBS")}
                  title="Poços de Bombeamento"
                  percentage={pbPercentage}
                  points={pb.length}
                  filledText="Preenchido"
                  pointsText="Pontos"
                  containerClass={styles.data_pb_content}
                  titleClass={styles.title_data_content_pb}
                  percentageClass={styles.percentage_content_pb}
                  pointsClass={styles.points_content_pb}
                />
              </div>
            </section>
            <section className={styles.right_side}>
              <div className={styles.recent_points_container}>
                <NextCollects/>
            </div>
        </section>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}