import { useState, useEffect } from "react";
import styles from './PointCollect.module.css';

import { fetchPointBySheet } from "../../api/api";
import useUtilsStore from "../../store/utils";
import { postNotif } from "../../api/api";
import { PointModal } from "../../components/PointModal";



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
    const [points, setPoints] = useState<Point[]>([]); // Inicialize como array vazio
    const id_token = localStorage.getItem("id_token");
    const { planilha } = useUtilsStore();

    console.log(planilha)

    useEffect(() => {

        const fetchPoints = async () => {
            if (planilha) {
                try {
                    const response = await fetchPointBySheet(planilha);
                    if (Array.isArray(response)) {
                        setPoints(response);
                    } else {
                        setPoints([]); // Caso não seja um array, define um array vazio
                    }
                } catch (error) {
                    console.error("Erro ao buscar pontos:", error);
                    setPoints([]); // Em caso de erro, define um array vazio
                }
            }
        };

        fetchPoints();
    }, [id_token, planilha]);

    return (
        <div className={styles.select_point_grid}>
            {points.map((point) => (
                <button
                    key={point.id}
                    className={styles.select_point}
                    onClick={() => {
                        onSelectPoint(point);
                        console.log("Points :" + point.nome);
                    }}
                >
                    <p className={styles.name_point}>
                        <span className={styles.name_point_type}>{point.nome}</span>
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
    const { planilha } = useUtilsStore(); 
    

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
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
        }
    };

 function renderCardInfo(name: string){
    switch(name){
        case "BC01": 
            return <PointModal.BC01/>

        case "BC06":
            return <PointModal.BC06/>
        
        case "BH02":
            return <PointModal.BH02/>
        
        case "BOMBA BC03":
            return <PointModal.BOMBA_BC03/>
        
        case "BS01 HIDROMETRO":
            return <PointModal.BS01_HIDROMETRO/>
        
        case "BS01 PRESSAO":
            return <PointModal.BS01_PRESSAO/>
        
        case "CD":
            return <PointModal.CD/>
        
        case "COLUNAS CARVAO":
            return <PointModal.COLUNAS_CARVAO/>
    }
 }

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
                <PointModal.Container closeModal={closeModal}>
                    {renderCardInfo(selectedPoint.nome)}
                </PointModal.Container>
            )}
        </>
    );
}