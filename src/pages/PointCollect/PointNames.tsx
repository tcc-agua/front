import { useEffect, useState } from "react";
import useUtilsStore from "../../store/utils";
import { fetchPointBySheet } from "../../api/api";
import styles from './PointCollect.module.css';

export interface Point {
    id: string;
    nome: string;
    localizacao: string;
    status: string;
}

interface PointNamesProps {
    onSelectPoint: (point: Point) => void;
}

export function PointNames({ onSelectPoint }: PointNamesProps) {
    const [points, setPoints] = useState<Point[]>([]);
    const [pontosPreenchidos, setPontosPreenchidos] = useState<string[]>([]); // Agora usando useState
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

        updatePointsPerPage();
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

                        const pontosColetados = response.filter((point) => point.status === "COLETADO").map((point) => point.nome);

                        setPontosPreenchidos(pontosColetados);
                        setQtdPontos(response.length);

                    } else {
                        setPoints([]);
                    }
                } 
                catch (error) {
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
                            {point.status} ⟶ {isPreenchido ? "Preenchido" : "Não Preenchido"}
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