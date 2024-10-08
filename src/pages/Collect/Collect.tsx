import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Collect.module.css";
import useUtilsStore from "../../store/utils";
import { fetchNotif } from "../../api/api";
import { getDateDifference } from "../Dashboards/Dashboards";
import icon_correct from "../../assets/images/correct.svg";
import icon_alert from "../../assets/images/alert.svg"

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
        const sortedColeta = data.sort((a, b) => b.id - a.id); // Ordenar por id decrescente

        setColeta(sortedColeta);
      } catch (error) {
        console.error("Erro ao buscar as últimas coletas finalizadas");
      }
    };
    getColeta();
  }, []);

  // Função para verificar se a coleta foi feita hoje
  const coletaFeitaHoje = (data: string) => getDateDifference(data) === "hoje";

  // Filtrar para manter apenas a última coleta de cada ponto (NA, PB, DADOS ETAS)
  const filtrarUltimasColetas = (coletas: Coleta[]) => {
    const ultimasColetas: { [key: string]: Coleta } = {};

    coletas.forEach((coleta) => {
      const { tabela } = coleta;
      // Apenas adicionar se for "NA", "PB", ou "DADOS ETAS"
      if (['NA', 'PBS', 'DADOS ETAS'].includes(tabela)) {
        // Como a lista já está ordenada por id decrescente, a primeira vez que encontramos uma tabela é a mais recente
        if (!ultimasColetas[tabela]) {
          ultimasColetas[tabela] = coleta;
        }
      }
    });

    return Object.values(ultimasColetas); // Retorna apenas as últimas coletas filtradas
  };

  const renderUltimasColetas = (coleta: Coleta, index: number) => {
    const { tabela, tipo, data } = coleta;
    let message = '';
    let iconClass = '';
    
    // Definir a mensagem e o ícone baseado na tabela e tipo
    if (tabela === 'NA' && tipo === 'SALVO') {
        iconClass = 'icon_salvo'; 
        const diasDesdeUltimaColeta = parseInt(getDateDifference(data));
        const diasParaProximaColeta = 15 - diasDesdeUltimaColeta;

        if (diasParaProximaColeta > 0) {
            message = `Dados "${tabela}" coletados há ${diasDesdeUltimaColeta} dias, próxima coleta em ${diasParaProximaColeta} dias.`;
        } else {
            message = `Já passou o prazo para coletar os dados "${tabela}".`;
        }
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

    let dayDiff = getDateDifference(data);
    if (dayDiff !== "hoje") {
        dayDiff = `${dayDiff} dias atrás`;
    }

    return (
        <div key={`${tabela}-${tipo}-${index}`} className={styles.coleta_container}>
            <div className={styles.coleta_activity}>
                <div className={`${styles.icon_coleta} ${styles[iconClass]}`}>
                    <img
                        className={styles.imgs_coleta}
                        src={icon_alert}
                    />
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

export function Collect() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [selectedPoint, setSelectedPoint] = useState<string>("");

  const navigate = useNavigate();

  const { setPlanilha } = useUtilsStore();

  const openModal = (point: string) => {
    setSelectedPoint(point);

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);

    setSelectedPoint("");
  };

  const handlePoint = (planilha: string) => {
    setPlanilha(planilha);

    navigate("/inicial/pontos_de_coleta");
  };

  return (
    <div className={styles.container}>
      <section className={styles.content_search}>
        <p className={styles.title}>
          Insira os <span className={styles.data_color}>dados</span> atualizados
          do ponto que acabou de coletar!
        </p>
        <input
          className={styles.search_bar}
          type="text"
          placeholder="Procure o ponto que deseja adicionar novos dados aqui!"
        />
      </section>
      <p className={styles.text}>Selecione:</p>
      <div className={styles.main_content}>
        <section className={styles.left_side}>
          <div className={styles.options_data}>
            <button
              onClick={() => handlePoint("DADOS ETAS")}
              className={styles.data_etas_content}
            >
              <div className={styles.title_data_content_etas}>
                <p className={styles.title_data}>
                  Estações de Tratamento de Águas S.
                </p>
              </div>
              <div className={styles.percentage_and_points}>
                <div className={styles.percentage_content_etas}>
                  <p className={styles.percentage}>40%</p>
                  <p className={styles.complement}>Preenchido</p>
                </div>
                <div className={styles.points_content_etas}>
                  <p className={styles.points}>24</p>
                  <p className={styles.complement}>Pontos</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handlePoint("NA")}
              className={styles.data_na_content}
            >
              <div className={styles.title_data_content_na}>
                <p className={styles.title_data}>Nível D'água</p>
              </div>
              <div className={styles.percentage_and_points}>
                <div className={styles.percentage_content_na}>
                  <p className={styles.percentage}>10%</p>
                  <p className={styles.complement}>Preenchido</p>
                </div>
                <div className={styles.points_content_na}>
                  <p className={styles.points}>22</p>
                  <p className={styles.complement}>Pontos</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handlePoint("PBS")}
              className={styles.data_pb_content}
            >
              <div className={styles.title_data_content_pb}>
                <p className={styles.title_data}>Poços de Bombeamento</p>
              </div>
              <div className={styles.percentage_and_points}>
                <div className={styles.percentage_content_pb}>
                  <p className={styles.percentage}>75%</p>
                  <p className={styles.complement}>Preenchido</p>
                </div>
                <div className={styles.points_content_pb}>
                  <p className={styles.points}>09</p>
                  <p className={styles.complement}>Pontos</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handlePoint("CA")}
              className={styles.data_ca_content}
            >
              <div className={styles.title_data_content_ca}>
                <p className={styles.title_data}>Consumo de Água</p>
              </div>
              <div className={styles.percentage_and_points}>
                <div className={styles.percentage_content_ca}>
                  <p className={styles.percentage}>75%</p>
                  <p className={styles.complement}>Preenchido</p>
                </div>
                <div className={styles.points_content_ca}>
                  <p className={styles.points}>09</p>
                  <p className={styles.complement}>Pontos</p>
                </div>
              </div>
            </button>
          </div>
        </section>


        <section className={styles.right_side}>
          <div className={styles.recent_points_container}>
          <NextCollects/>
          </div>
        </section>



      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.close} onClick={closeModal}>
              x
            </button>
            <h2 className={styles.pointName}>
              Dados de coleta do ponto {selectedPoint}
            </h2>
            <main className={styles.mainModal}>
              <div className={styles.infoContainer}>
                <h3>pH</h3>
                <div className={styles.information}>
                  <p>01</p>
                </div>
              </div>
              <div className={styles.separator}></div>
              <div className={styles.infoContainer}>
                <h3>Pressão</h3>
                <div className={styles.information}>
                  <p>03</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}