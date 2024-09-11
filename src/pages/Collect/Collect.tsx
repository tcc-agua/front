import React, { useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import styles from "./Collect.module.css";

import useUtilsStore from "../../store/utils";

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
              onClick={() => handlePoint("PB")}
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
          </div>
        </section>
        <section className={styles.right_side}>
          <div className={styles.recent_points_container}>
            <p className={styles.title_historic_points}>Pontos recentes:</p>
            <div className={styles.historic_points_container}>
              <button
                className={styles.historic_point}
                onClick={() => openModal("AG - 02")}
              >
                <p className={styles.name_point}>
                  <span className={styles.name_color}>AG</span> - 02
                </p>
                <p className={styles.arrow}>⟶</p>
              </button>
              <button
                className={styles.historic_point}
                onClick={() => openModal("TQ - 01")}
              >
                <p className={styles.name_point}>
                  <span className={styles.name_color}>TQ</span> - 01
                </p>
                <p className={styles.arrow}>⟶</p>
              </button>
              <button
                className={styles.historic_point}
                onClick={() => openModal("PM - 21")}
              >
                <p className={styles.name_point}>
                  <span className={styles.name_color}>PM</span> - 21
                </p>
                <p className={styles.arrow}>⟶</p>
              </button>
              <button
                className={styles.historic_point}
                onClick={() => openModal("PM - 56")}
              >
                <p className={styles.name_point}>
                  <span className={styles.name_color}>PM</span> - 56
                </p>
                <p className={styles.arrow}>⟶</p>
              </button>
              <button
                className={styles.historic_point}
                onClick={() => openModal("PT - 09")}
              >
                <p className={styles.name_point}>
                  <span className={styles.name_color}>PT</span> - 09
                </p>
                <p className={styles.arrow}>⟶</p>
              </button>
            </div>
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
