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
    const { planilha,  setQtdPontos } = useUtilsStore();

    console.log(planilha)

    useEffect(() => {

        const fetchPoints = async () => {
            if (planilha) {
                try {
                    const response = await fetchPointBySheet(planilha);
                    if (Array.isArray(response)) {
                        setPoints(response);
                        setQtdPontos(response.length)
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
    const { planilha,  qtdPontos } = useUtilsStore(); 

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

    if(name.startsWith("PM") || name.startsWith("PT")){
        return <PointModal.PMPT/>
    }
    if(name.startsWith("PB")){
        return <PointModal.PBS/>
    }
    if(name.startsWith("CD")){
        return <PointModal.CD/>
    }
    if(name == "TQ04" || name == "TQ05"){
        return <PointModal.TQ04_TQ05/>
    }

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
        
        case "COLUNAS CARVAO":
            return <PointModal.COLUNAS_CARVAO/>

        case "FASE LIVRE":
            return <PointModal.FASE_LIVRE/>

        case "FILTRO CARTUCHO":
            return <PointModal.FILTRO_CARTUCHO/>

        case "HORIMETRO":
            return <PointModal.HORIMETRO/>
        
        case "SENSOR PH":
            return <PointModal.SENSOR_PH/>

        case "TQ01":
            return <PointModal.TQ01/>

        case "TQ02":
            return <PointModal.TQ02/>

        case "TQ04 TQ05":
            return <PointModal.TQ04_TQ05/>
    }
 }

 function getPlanilhaTitle(planilha: string | null) {
    switch (planilha) {
        case "DADOS ETAS":
            return "Estações de Tratamento de Águas Subterrâneas";
        case "PB":
            return "Poços de Bombeamento";
        case "NA":
            return "Nível de Água";
        default:
            return "Planilha não encontrada!";
    }
}


    return (
        <>
            <main className={styles.container}>
            <p className={styles.title}>
                {getPlanilhaTitle(planilha)}
            </p>                <div className={styles.main_information}>
                    <div className={styles.left_side}>
                        <div className={styles.select_point_container}>
                            <p className={styles.select_point_title}>Selecione um ponto:</p>
                            <PointNames onSelectPoint={openModal} />
                        </div>
                    </div>
                    <div className={styles.right_side}>
                        <div className={styles.point_information}>
                            <p className={styles.point_information_text}>Existem <span className={styles.point_information_number}>{qtdPontos}</span> pontos para preencher o arquivo   {
                planilha === "DADOS ETAS" 
                    ? "'ETAS'" 
                    : planilha === "PB"
                    ? "'Poços de Bombeamento'"
                    : planilha === "NA"
                    ? "'Nível de Água'"
                    : "'Planilha não encontrada!'"
                    }</p>
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