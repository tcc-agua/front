import { useState, useEffect } from "react";
import styles from './PointCollect.module.css';
import Swal from 'sweetalert2'; 
import useUtilsStore from "../../store/utils";
import { fetchColeta, fetchPointBySheet, postNotif } from "../../api/api";
import { PointModal } from "../../components/PointModal";
import MapPoints from "../../components/MapPoints/MapPoints";
import { Point, PointNames } from "./PointNames";

export interface Coleta {
    id: number;
    tecnico: string;
    dataColeta: string;
    horaInicio: string;
    horaFim: string;
}

export function PointCollect() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
    const { planilha, qtdPontos } = useUtilsStore();
    const [etas, setEtas] = useState<Point[]>([]);
    const [na, setNa] = useState<Point[]>([]);
    const [pb, setPb] = useState<Point[]>([]);
    const [ultimaColeta, setUltimaColeta] = useState<Coleta | null>(null);

    useEffect(() =>{
        const fetchColetaAtual = async () =>{
            try{
                 const response = await fetchColeta();
                 console.log(response);
                 setUltimaColeta(response);
            }
            catch(error){
                console.error("Erro ao buscar coleta:", error);
            }
        };

        fetchColetaAtual();
    },[]);

    useEffect(() => {
        const fetchPontos = async () => {
          try {
            const [etasResponse, naResponse, pbResponse] = await Promise.all([
              fetchPointBySheet("DADOS ETAS"),
              fetchPointBySheet("NA"),
              fetchPointBySheet("PBS"),
            ]);
    
            setEtas(etasResponse);
            setNa(naResponse);
            setPb(pbResponse);
    
          } catch (error) {
            console.error("Erro ao buscar pontos:", error);
          }
        };
    
        fetchPontos();
      }, []);

    function calculatePercentageCollected(points: Point[]): string {
        if (points.length === 0) return "0%";
      
        const collectedPoints = points.filter((point) => point.statusEnum === "COLETADO");
        const percentage = (collectedPoints.length / points.length) * 100;
      
        return `${percentage.toFixed(0)}%`;
      }

      const etasPercentage = calculatePercentageCollected(etas);
      const naPercentage = calculatePercentageCollected(na);
      const pbPercentage = calculatePercentageCollected(pb);
    
      const coletaId = ultimaColeta?.id;

    useEffect(() => {
        const fetchColetaId = async () => {
          try {
                if(coletaId != null){
                    localStorage.setItem("coletaId", String(coletaId));
                }
                else{
                    throw new Error;
                }
                
          } catch (error) {
            console.log("Erro", error);
          }
        };
    
        fetchColetaId();
      }, [coletaId]);

    const openModal = (point: Point) => {
        setSelectedPoint(point);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedPoint(null);
    };

    const notify = async () => {
        try {
            const result = await postNotif(planilha, "SALVO");
            console.log("Dados salvos com sucesso:", result);
            Swal.fire({ 
                icon: 'success',
                title: 'Sucesso',
                text: 'Dados salvos com sucesso!',
                confirmButtonText: 'Ok',
                width: '30%',
            });
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
            Swal.fire({ 
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao salvar os dados.',
                confirmButtonText: 'Ok',
                width: '30%',
            });
        }
    };

    function renderCardInfo(name: string, idColeta: number) {

        if (name.startsWith("PM") || name.startsWith("PT")) {
            return <PointModal.PMPT
                name={name}
                idColeta={idColeta}
            />
        }
        if (name.startsWith("PB")) {
            return <PointModal.PBS
                name={name}
                idColeta={idColeta}
            />
        }
        if (name.startsWith("CD")) {
            return <PointModal.CD
                name={name}
                idColeta={idColeta}
            />
        }
        if (name == "TQ04" || name == "TQ05") {
            return <PointModal.TQ04_TQ05
                name={name}
                idColeta={idColeta}
            />
        }
        if (name.startsWith("AG") || name == "BS01 HORIMETRO") {
            return <PointModal.HORIMETRO
                name={name}
                idColeta={idColeta}
            />
        }
        if (name.startsWith("Geral") ||
            name.startsWith("Entrada") ||
            name.startsWith("Saida") ||
            name == "Refeitorio" ||
            name.startsWith("Kinderhaus") ||
            name.startsWith("Descarte") ||
            name.startsWith("Agua") ||
            name.startsWith("Central") ||
            name.startsWith("Caixa") ||
            name.startsWith("ETAS") ||
            name.startsWith("Tanque")) {

            return <PointModal.HIDROMETRO
            name={name}
            idColeta={idColeta}
            />
        }

        switch (name) {
            case "BC01":
                    return <PointModal.BC01
                    name={name}
                    idColeta={idColeta}
                />
            case "BC06":
                return <PointModal.BC06
                    name={name}
                    idColeta={idColeta}
                />

            case "BH02":
                return <PointModal.BH02
                    name={name}
                    idColeta={idColeta}
                />

            case "BOMBA BC03":
                return <PointModal.BOMBA_BC03
                    name={name}
                    idColeta={idColeta}
                />

            case "BS01 HIDROMETRO":
                return <PointModal.BS01_HIDROMETRO
                    name={name}
                    idColeta={idColeta}
                />

            case "BS01 PRESSAO":
                return <PointModal.BS01_PRESSAO
                    name={name}
                    idColeta={idColeta}
                />

            case "COLUNAS CARVAO":
                return <PointModal.COLUNAS_CARVAO
                    name={name}
                    idColeta={idColeta}
                />

            case "FASE LIVRE":
                return <PointModal.FASE_LIVRE
                    name={name}
                    idColeta={idColeta}
                />

            case "FILTRO CARTUCHO":
                return <PointModal.FILTRO_CARTUCHO
                    name={name}
                    idColeta={idColeta}
                />

            case "HORIMETRO":
                return <PointModal.HORIMETRO
                    name={name}
                    idColeta={idColeta}
                />

            case "SENSOR PH":
                return <PointModal.SENSOR_PH
                    name={name}
                    idColeta={idColeta}
                />

            case "TQ01":
                return <PointModal.TQ01
                    name={name}
                    idColeta={idColeta}
                />

            case "TQ02":
                return <PointModal.TQ02
                    name={name}
                    idColeta={idColeta}
                />

            case "TQ04 TQ05":
                return <PointModal.TQ04_TQ05
                    name={name}
                    idColeta={idColeta}
                />
        }
    }

    function getPlanilhaTitle(planilha: string | null) {
        switch (planilha) {
            case "DADOS ETAS":
                return "Estações de Tratamento de Águas Subterrâneas";
            case "PBS":
                return "Poços de Bombeamento";
            case "NA":
                return "Nível de Água";
            case "CA":
                return "Consumo de Água";
            default:
                return "Planilha não encontrada!";
        }
    }

    const coleta = localStorage.getItem("coletaId");

    const shouldShowButton = planilha === "DADOS ETAS" && etasPercentage === "100%" || 
                                                 planilha === "NA" && naPercentage === "100%" || 
                                                 planilha === "PBS" && pbPercentage === "100%";

    return (
        <>
            <main className={styles.container}>
                <p className={styles.title}>
                    {getPlanilhaTitle(planilha)}
                </p>
                <div className={styles.main_information}>
                    <div className={styles.left_side}>
                        <div className={styles.select_point_container}>
                            <p className={styles.select_point_title}>Selecione um ponto:</p>
                            <PointNames onSelectPoint={openModal} />
                        </div>
                    </div>
                    <div className={styles.right_side}>
                        <div className={styles.point_information}>
                            <p className={styles.point_information_text}>
                                Existem <span className={styles.point_information_number}>{qtdPontos}</span> pontos para preencher o arquivo
                                {planilha === "DADOS ETAS"
                                    ? "'ETAS'"
                                    : planilha === "PBS"
                                        ? "'Poços de Bombeamento'"
                                        : planilha === "NA"
                                            ? "'Nível de Água'"
                                            : planilha === "CA"
                                                ? "'Consumo de Água'"
                                                : "'Planilha não encontrada!'"
                                }
                            </p>
                        </div>
                        <div className={styles.map_container}>
                            <p className={styles.map_title}>Localize seus pontos no mapa:</p>
                            <div className={styles.map}>
                                <MapPoints planilha={planilha} />
                            </div>
                        </div>
    
                        {/* Renderizar o botão condicionalmente */}
                        {shouldShowButton && (
                            <div className={styles.button_container}>
                                <button className={styles.button_complete} onClick={notify}>Salvar dados</button>
                            </div>
                        )}
    
                    </div>
                </div>
            </main>
    
            {isModalOpen && selectedPoint && (
                <PointModal.Container closeModal={closeModal}>
                    {(() => {
                        if (coleta != null) {
                            return renderCardInfo(selectedPoint.nome, Number(coleta));
                        }
                        return <><p className={styles.point_information_text}>ERRO</p></>;
                    })()}

                </PointModal.Container>
            )}
        </>
    );
}