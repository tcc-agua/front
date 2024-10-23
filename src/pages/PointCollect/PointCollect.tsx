import { useState, useEffect } from "react";
import styles from './PointCollect.module.css';
import Swal from 'sweetalert2'; 
import useUtilsStore from "../../store/utils";
import { fetchColeta, postNotif } from "../../api/api";
import { PointModal } from "../../components/PointModal";
import MapPoints from "../../components/MapPoints/MapPoints";
import { Point, PointNames } from "./PointNames";
import { calculatePercentageCollected, getPlanilhaTitle, renderCardInfo } from "./PointCollectUtils/renderCardInfo";

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
    const { planilha, qtdPontos, fetchPoints, etasResponse, naResponse, pbResponse, isUpdated, resetState } = useUtilsStore();
    const [ultimaColeta, setUltimaColeta] = useState<Coleta | null>(null);
    
    const etasPercentage = calculatePercentageCollected(etasResponse);
    const naPercentage = calculatePercentageCollected(naResponse);
    const pbPercentage = calculatePercentageCollected(pbResponse);
    const coleta = ultimaColeta?.id;

    useEffect(() => {
        const fetchColetaAtual = async () => {
            try {
                const response = await fetchColeta();
                console.log(response);
                setUltimaColeta(response);
            } catch (error) {
                console.error("Erro ao buscar coleta:", error);
            }
        };
    
        fetchColetaAtual();
    }, []); // Executa apenas uma vez, ao montar o componente
    
    useEffect(() => {
        fetchPoints(); // Chama a função para buscar pontos sempre que necessário
    }, []); // Sem `isUpdated`, para evitar loops
    
    useEffect(() => {
        console.log(etasPercentage, naPercentage, pbPercentage);
    }, [etasPercentage, naPercentage, pbPercentage]); // Atualiza somente ao alterar as porcentagens
    
    useEffect(() => {
        const fetchColetaId = async () => {
            try {
                if (coleta != null) {
                    localStorage.setItem("coletaId", String(coleta));
                } else {
                    throw new Error("Coleta não encontrada");
                }
            } catch (error) {
                console.error("Erro ao armazenar coletaId:", error);
            }
        };
    
        fetchColetaId();
    }, [coleta]); // Executa sempre que `coleta` for alterada
    
    
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

    const shouldShowButton = (
        (planilha === "DADOS ETAS" && etasPercentage === "100%") ||
        (planilha === "NA" && naPercentage === "100%") ||
        (planilha === "PBS" && pbPercentage === "100%")
      );

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