import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useEffect, useState} from "react";
import Swal from 'sweetalert2';
import { InputPoint } from "../InputPoint";
import usePbsStore from "../../../store/PbsStore";
import { PBS } from "../../../interfaces/postParams";

const itemsPerPage = 2; // Definir o número de itens por página

interface PointNameProps {
    name: string;
    idColeta: number;
}

function PbsCard({ name, idColeta }: PointNameProps) {
    const [pressure, setPressure] = useState<number>(1);
    const [pulses, setPulses] = useState<number>(1);
    const [oilLevel, setOilLevel] = useState<number>(1);
    const [waterLevel, setWaterLevel] = useState<number>(1);
    const [volRemOleo, setVolRemOleo] = useState<number>(1);
    const { createPbsMeasure, isCreated, isError, resetState } = usePbsStore();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const increment = (setter: React.Dispatch<React.SetStateAction<number>>, isInteger: boolean = false) => {
        setter(prev => isInteger ? prev + 1 : Math.round((prev + 0.1) * 10) / 10);
    };

    const decrement = (setter: React.Dispatch<React.SetStateAction<number>>, isInteger: boolean = false) => {
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
            idColeta: idColeta
        };
        createPbsMeasure(obj);
    };

    useEffect(() => {
        if (isCreated) {
            Swal.fire({
                title: 'Sucesso!',
                icon: 'success',
                text: 'Coleta inserida com sucesso!',
                showConfirmButton: false,
                timer: 2000,
                width: '30%'
            });
            resetState();
        }
        if (isError) {
            Swal.fire({
                title: 'Erro ao criar',
                icon: 'error',
                text: 'Ocorreu um erro durante a criação. Tente novamente!',
            });
            resetState();
        }
    }, [isCreated, resetState, isError, name]);

    const infoContentData = [
        { type: "Pressão", key: "pressure", value: pressure, setter: setPressure, isInteger: false },
        { type: "Pulsos", key: "pulses", value: pulses, setter: setPulses, isInteger: false },
        { type: "Nível do óleo", key: "oilLevel", value: oilLevel, setter: setOilLevel, isInteger: false },
        { type: "Nível da água", key: "waterLevel", value: waterLevel, setter: setWaterLevel, isInteger: false },
        { type: "Vol Rem Óleo", key: "volRemOleo", value: volRemOleo, setter: setVolRemOleo, isInteger: false }
    ];

    const nextPage = () => {
        if (currentIndex + itemsPerPage < infoContentData.length) {
            setCurrentIndex(prev => prev + itemsPerPage);
        }
    };

    const prevPage = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(prev => prev - itemsPerPage);
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
                            increment={() => increment(item.setter, item.isInteger)}
                            decrement={() => decrement(item.setter, item.isInteger)}
                            handleChange={(e) => handleChange(e, item.setter)}
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
