import React, { useState, useEffect } from "react";
import styles from './PointCollect.module.css';
import ArrowUp from '../../assets/images/arrow-up.svg';
import ArrowDown from '../../assets/images/arrow-down.svg';
import { fetchPointBySheet } from "../../api/api";
import useUtilsStore from "../../store/utils";
import { postNotif } from "../../api/api";



interface Point {
    id: string;
    nome: string;
    localizacao: string;
    status: string;
}

interface PointNamesProps {
    onSelectPoint: (point: Point) => void;
}

export function PointNames({ onSelectPoint }: PointNamesProps) {
    const [points, setPoints] = useState<Point[] | null>(null);
    const id_token = localStorage.getItem("id_token");
    const { planilha } = useUtilsStore();

    useEffect(() => {

        const fetchPoints = async () => {
            if (planilha) {
                try {
                    const response = await fetchPointBySheet(planilha);
                    setPoints(response);
                } catch (error) {
                    console.error("Erro ao buscar pontos:", error);
                }
            }
        };

        fetchPoints();
    }, [id_token, planilha]);

    
    return (
        <div className={styles.select_point_grid}>
            {points?.map((point) => (
                <button
                    key={point.id}
                    className={styles.select_point}
                    onClick={() => onSelectPoint(point)}
                >
                    <p className={styles.name_point}>
                        <span className={styles.name_point_type}>{point.nome.split(' ')[0]}</span>
                    </p>
                    <pre className={styles.status_point}>{point.status} ⟶</pre>
                </button>
            ))}
        </div>
    );
}

export function PointCollect() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
    const [numberValue, setNumberValue] = useState<number>(1);
    const { planilha } = useUtilsStore(); 
    

    const openModal = (point: Point) => {
        setSelectedPoint(point);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedPoint(null);
    };

    const incrementValue = () => {
        setNumberValue(prev => Math.round((prev + 0.1) * 10) / 10);
    };

    const decrementValue = () => {
        setNumberValue(prev => (prev > 0 ? Math.round((prev - 0.1) * 10) / 10 : 0));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setNumberValue(value);
        }
    };

    const notify = async () => {
        try {
            const result = await postNotif(planilha, "SALVO");
            console.log("Dados salvos com sucesso:", result);
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
        }
    };

    return (
        <>
            <main className={styles.container}>
                <p className={styles.title}>Estações de Tratamento de Águas Subterrâneas</p>
                <div className={styles.main_information}>
                    <div className={styles.left_side}>
                        <div className={styles.select_point_container}>
                            <p className={styles.select_point_title}>Selecione um ponto:</p>
                            <PointNames onSelectPoint={openModal} />
                        </div>
                    </div>
                    <div className={styles.right_side}>
                        <div className={styles.point_information}>
                            <p className={styles.point_information_text}>Ainda restam <span className={styles.point_information_number}>22</span> pontos para completar o arquivo ETAS</p>
                        </div>
                        <div className={styles.map_container}>
                            <p className={styles.map_title}>Localize seus pontos no mapa:</p>
                            <div className={styles.map}></div>
                        </div>
                        <div className={styles.button_container}>
                       <button className={styles.button_complete} onClick={notify}>Salvar dados</button> 
                        </div>
                    </div>
                </div>
            </main>

            {isModalOpen && selectedPoint && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.close} onClick={closeModal}>x</button>
                        <p className={styles.pointName}>Dados de coleta do ponto {selectedPoint.nome}</p>
                        <main className={styles.infoContainer}>
                            <div className={styles.infoContent}>
                                <p className={styles.type}>Pressão</p>
                                <div className={styles.information}>
                                    <button className={styles.arrow} onClick={incrementValue}><img src={ArrowUp} alt="Arrow Up" /></button>
                                    <input
                                        type="number"
                                        value={numberValue.toFixed(1)}
                                        onChange={handleInputChange}
                                        step="0.1"
                                        min="0"
                                        className={styles.numberInput}
                                    />
                                    <button className={styles.arrow} onClick={decrementValue}><img src={ArrowDown} alt="Arrow Down" /></button>
                                </div>
                            </div>
                            <button className={styles.buttonEnviar} onClick={() => console.log("Dados enviados")}>Enviar</button>
                        </main>
                    </div>
                </div>
            )}
        </>
    );
}