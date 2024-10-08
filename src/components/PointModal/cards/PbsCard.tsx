import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useEffect, useState} from "react";
import { InputPoint } from "../InputPoint";
import usePbsStore from "../../../store/PbsStore";
import { PBS } from "../../../interfaces/postParams";

const itemsPerPage = 2; // Definir o número de itens por página

interface PointNameProps {
    name: string;
}

function PbsCard({ name }: PointNameProps) {
    const [pressure, setPressure] = useState<number>(1);
    const [pulses, setPulses] = useState<number>(1);
    const [oilLevel, setOilLevel] = useState<number>(1);
    const [waterLevel, setWaterLevel] = useState<number>(1);
    const [volRemOleo, setVolRemOleo] = useState<number>(1);
    const { createPbsMeasure, isCreated, isError, resetState } = usePbsStore();
    const [currentIndex, setCurrentIndex] = useState(0); // Controle do índice de paginação

    const increment = (setter: React.Dispatch<React.SetStateAction<number>>, isInteger?: boolean) => {
        setter(prev => isInteger ? prev + 1 : Math.round((prev + 0.1) * 10) / 10);
    };

    const decrement = (setter: React.Dispatch<React.SetStateAction<number>>, isInteger?: boolean) => {
        setter(prev => isInteger ? Math.max(prev - 1, 0) : Math.max(Math.round((prev - 0.1) * 10) / 10, 0));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setter(value);
        }
    };

    const sendInformation = () => {
        const obj: PBS = {
            vol_rem_oleo: volRemOleo,
            pulsos: pulses,
            pressao: pressure,
            nivel_agua: waterLevel,
            nivel_oleo: oilLevel,
            nomePonto: name,
            idColeta: 1
        };
        createPbsMeasure(obj);
    };

    useEffect(() => {
        if (isCreated) {
            alert("Criado");
            resetState();
        }
        if (isError) {
            alert("ERRO");
        }
    }, [isCreated, resetState, isError]);

    // Dados para exibição no modal
    const infoContentData = [
        { type: "Pressão", key: "pressure", value: pressure, isInteger: false },
        { type: "Pulsos", key: "pulses", value: pulses, isInteger: false },
        { type: "Nível do óleo", key: "oilLevel", value: oilLevel, isInteger: false },
        { type: "Nível da água", key: "waterLevel", value: waterLevel, isInteger: false },
        { type: "Vol Rem Óleo", key: "volRemOleo", value: volRemOleo, isInteger: false }
    ];

    // Funções de navegação entre os itens no modal
    const nextPage = () => {
        if (currentIndex + itemsPerPage < infoContentData.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const prevPage = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div className={styles.infoGrid}>
                    {infoContentData.slice(currentIndex, currentIndex + itemsPerPage).map((item, index) => (
                        <InputPoint
                            key={index}
                            titulo={item.type}
                            valor={item.value}
                            increment={() => increment(eval(`set${item.key.charAt(0).toUpperCase() + item.key.slice(1)}`), item.isInteger)}
                            decrement={() => decrement(eval(`set${item.key.charAt(0).toUpperCase() + item.key.slice(1)}`), item.isInteger)}
                            handleChange={(e) => handleChange(e, eval(`set${item.key.charAt(0).toUpperCase() + item.key.slice(1)}`))}
                            isInteger={item.isInteger}
                        />
                    ))}
                </div>
                <div className={styles.button_container_modal}>
                    <button
                        className={styles.arrow_modal}
                        onClick={prevPage}
                        disabled={currentIndex === 0}
                    >
                        &lt;
                    </button>
                    <button
                        className={styles.arrow_modal}
                        onClick={nextPage}
                        disabled={currentIndex + itemsPerPage >= infoContentData.length}
                    >
                        &gt;
                    </button>
                </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default PbsCard;
