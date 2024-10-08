import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Collect.module.css";
import useUtilsStore from "../../store/utils";
import { fetchPointBySheet } from "../../api/api";
import PointButton from "../../components/PointButton/PointButton";
import { COLETA } from "../../interfaces/postParams";
import { NextCollects } from "../../components/Colects/NextCollects";
import useColetaStore from "../../store/ColetaStore";

export function Collect() {
  const [etas, setEtas] = useState<number>(0);
  const [na, setNa] = useState<number>(0);
  const [pb, setPb] = useState<number>(0);
  const [ca, setCa] = useState<number>(0);
  const { createColetaMeasure } = useColetaStore();
  const [showPointButtons, setShowPointButtons] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const { setPlanilha } = useUtilsStore();

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
    localStorage.setItem("coletaDia", formatDate(new Date()));
  };

  useEffect(() => {
    const storedDate = localStorage.getItem("coletaDia");
    const currentDate = formatDate(new Date());

    if (storedDate === currentDate) {
      setShowPointButtons(true);
    } else {
      setShowPointButtons(false);
    }
  }, []);

  useEffect(() => {
    const fetchQtdPontos = async () => {
      try {
        const [etasResponse, naResponse, pbResponse, caResponse] = await Promise.all([
          fetchPointBySheet("DADOS ETAS"),
          fetchPointBySheet("NA"),
          fetchPointBySheet("PBS"),
          fetchPointBySheet("CA"),
        ]);

        setEtas(etasResponse.length);
        setNa(naResponse.length);
        setPb(pbResponse.length);
        setCa(caResponse.length);
      } catch (error) {
        console.error("Erro ao buscar pontos:", error);
      }
    };

    fetchQtdPontos();
  }, []);

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
          <button onClick={sendInformation}>Iniciar Coleta</button>
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
                  percentage="40%"
                  points={etas}
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
                  percentage="10%"
                  points={na}
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
                  percentage="75%"
                  points={pb}
                  filledText="Preenchido"
                  pointsText="Pontos"
                  containerClass={styles.data_pb_content}
                  titleClass={styles.title_data_content_pb}
                  percentageClass={styles.percentage_content_pb}
                  pointsClass={styles.points_content_pb}
                />
                <PointButton
                  onClick={() => handlePoint("CA")}
                  title="Consumo de Água"
                  percentage="75%"
                  points={ca}
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
