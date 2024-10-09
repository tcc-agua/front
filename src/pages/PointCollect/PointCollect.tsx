import { useState, useEffect } from "react";
import styles from './PointCollect.module.css';
import Swal from 'sweetalert2'; // Importe o SweetAlert
import { fetchPointBySheet } from "../../api/api";
import useUtilsStore from "../../store/utils";
import { postNotif } from "../../api/api";
import { PointModal } from "../../components/PointModal";
import MapPoints from "../../components/MapPoints/MapPoints";
import useColetaStore from "../../store/ColetaStore";

interface Point {
    id: string;
    nome: string;
    localizacao: string;
    status: string;
}

interface PointNamesProps {
    onSelectPoint: (point: Point) => void;
    pontosPreenchidos: string[]; 

}

export function PointNames({ onSelectPoint, pontosPreenchidos }: PointNamesProps) {
    const [points, setPoints] = useState<Point[]>([]);
    const id_token = localStorage.getItem("id_token");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pointsPerPage, setPointsPerPage] = useState<number>(8);
    const isNextDisabled = (currentPage + 1) * pointsPerPage >= points.length;
    const isPrevDisabled = currentPage === 0;
    const { planilha, setQtdPontos } = useUtilsStore();

    useEffect(() => {
        const updatePointsPerPage = () => {
            if (window.innerWidth <= 680) {
                setPointsPerPage(5);
            } else {
                setPointsPerPage(8);
            }
        };

        updatePointsPerPage(); // Chamada inicial
        window.addEventListener("resize", updatePointsPerPage);

        return () => {
            window.removeEventListener("resize", updatePointsPerPage);
        };
    }, []);

    useEffect(() => {
        const fetchPoints = async () => {
            if (planilha) {
                try {
                    const response = await fetchPointBySheet(planilha);
                    if (Array.isArray(response)) {
                        setPoints(response);
                        setQtdPontos(response.length);
                    } else {
                        setPoints([]);
                    }
                } catch (error) {
                    console.error("Erro ao buscar pontos:", error);
                    setPoints([]);
                    setQtdPontos(0);
                }
            }
        };

        fetchPoints();
    }, [id_token, planilha, setQtdPontos]);

    const getCurrentPoints = () => {
        const startIndex = currentPage * pointsPerPage;
        return points.slice(startIndex, startIndex + pointsPerPage);
    };

    const handleNextPage = () => {
        if ((currentPage + 1) * pointsPerPage < points.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={styles.select_point_grid}>
            {getCurrentPoints().map((point) => {
                const isPreenchido = pontosPreenchidos.includes(point.nome); 
                return (
                    <button
                        key={point.id}
                        className={styles.select_point}
                        onClick={() => onSelectPoint(point)}
                    >
                        <p className={styles.name_point}>
                            <span className={styles.name_point_type}>{point.nome}</span>
                        </p>
                        <pre className={styles.status_point}>
                            {point.status} ⟶ {isPreenchido ? "(Preenchido)" : "(Não Preenchido)"}
                        </pre>
                    </button>
                );
            })}
            <div className={styles.pagination_buttons}>
                <button
                    onClick={handlePreviousPage}
                    className={`${styles.arrow} ${isPrevDisabled ? styles.disabled : ''}`}
                    disabled={isPrevDisabled}
                >
                    &lt;
                </button>
                <button
                    onClick={handleNextPage}
                    className={`${styles.arrow} ${isNextDisabled ? styles.disabled : ''}`}
                    disabled={isNextDisabled}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export function PointCollect() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
    const [preenchido, setPreenchido] = useState<string[]>([]); // Estado para controlar os pontos preenchidos
    const { planilha, qtdPontos } = useUtilsStore();
    const { coletaId } = useColetaStore();

    const preencher = (pointName: string) => {
        setPreenchido(prev => [...prev, pointName]); // Adiciona o nome do ponto à lista de pontos preenchidos
    };

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
            Swal.fire({ // Usando SweetAlert para sucesso
                icon: 'success',
                title: 'Sucesso',
                text: 'Dados salvos com sucesso!',
                confirmButtonText: 'Ok',
                width: '30%',
            });
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
            Swal.fire({ // Usando SweetAlert para erro
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
                preencher={preencher}
            />
        }
        if (name.startsWith("PB")) {
            return <PointModal.PBS
                name={name}
                idColeta={idColeta}
                preencher={preencher}
            />
        }
        if (name.startsWith("CD")) {
            return <PointModal.CD
                name={name}
                idColeta={idColeta}
                preencher={preencher}
            />
        }
        if (name == "TQ04" || name == "TQ05") {
            return <PointModal.TQ04_TQ05
                name={name}
                idColeta={idColeta}
                preencher={preencher}
            />
        }
        if (name.startsWith("AG") || name == "BS01 HORIMETRO") {
            return <PointModal.HORIMETRO
                name={name}
                idColeta={idColeta}
                preencher={preencher}
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
            preencher={preencher}
            />
        }

        switch (name) {
            case "BC01":
                    return <PointModal.BC01
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />
            case "BC06":
                return <PointModal.BC06
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />

            case "BH02":
                return <PointModal.BH02
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />

            case "BOMBA BC03":
                return <PointModal.BOMBA_BC03
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />

            case "BS01 HIDROMETRO":
                return <PointModal.BS01_HIDROMETRO
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />

            case "BS01 PRESSAO":
                return <PointModal.BS01_PRESSAO
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />

            case "COLUNAS CARVAO":
                return <PointModal.COLUNAS_CARVAO
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />

            case "FASE LIVRE":
                return <PointModal.FASE_LIVRE
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />

            case "FILTRO CARTUCHO":
                return <PointModal.FILTRO_CARTUCHO
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />

            case "HORIMETRO":
                return <PointModal.HORIMETRO
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />

            case "SENSOR PH":
                return <PointModal.SENSOR_PH
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />

            case "TQ01":
                return <PointModal.TQ01
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />

            case "TQ02":
                return <PointModal.TQ02
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
                />

            case "TQ04 TQ05":
                return <PointModal.TQ04_TQ05
                    name={name}
                    idColeta={idColeta}
                    preencher={preencher}
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

    return (
        <>
            <main className={styles.container}>
                <p className={styles.title}>
                    {getPlanilhaTitle(planilha)}
                </p>                <div className={styles.main_information}>
                    <div className={styles.left_side}>
                        <div className={styles.select_point_container}>
                            <p className={styles.select_point_title}>Selecione um ponto:</p>
                            <PointNames 
                                onSelectPoint={openModal} 
                                pontosPreenchidos={preenchido}
                            />
                        </div>
                    </div>
                    <div className={styles.right_side}>
                        <div className={styles.point_information}>
                            <p className={styles.point_information_text}>Existem <span className={styles.point_information_number}>{qtdPontos}</span> pontos para preencher o arquivo   {
                                planilha === "DADOS ETAS"
                                    ? "'ETAS'"
                                    : planilha === "PBS"
                                        ? "'Poços de Bombeamento'"
                                        : planilha === "NA"
                                            ? "'Nível de Água'"
                                            : planilha === "CA"
                                                ? "'Consumo de Água'"
                                                : "'Planilha não encontrada!'"
                            }</p>
                        </div>

                        <div className={styles.map_container}>
                            <p className={styles.map_title}>Localize seus pontos no mapa:</p>
                            <div className={styles.map}>
                                <MapPoints planilha={planilha} />
                            </div>
                        </div>

                        <div className={styles.button_container}>
                            <button className={styles.button_complete} onClick={notify}>Salvar dados</button>
                        </div>
                    </div>
                </div>
            </main>

            {isModalOpen && selectedPoint && (
                <PointModal.Container closeModal={closeModal}>
                {(() => {

                        if (coleta != null) {
                            return renderCardInfo(selectedPoint.nome, Number(coleta));
                        }
                        return <>
                            <p className={styles.point_information_text}>ERRO</p>
                        </>; 
                 })()}
                </PointModal.Container>

            )}
        </>
    );
}