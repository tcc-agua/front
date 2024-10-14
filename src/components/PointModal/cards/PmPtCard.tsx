import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useEffect, useState, useCallback } from "react";
import Swal from 'sweetalert2';
import { InputPoint } from "../InputPoint";
import usePmPtStore from "../../../store/PmPtStore";
import { PMPT } from "../../../interfaces/postParams";
import usePontoState from "../../../store/PontoStore";

interface PointNameProps {
    name: string;
    idColeta: number;
}

const itemsPerPage = 2;

function PmPtCard({ name, idColeta }: PointNameProps) {
    const { setStatus } = usePontoState();
    const [oilLevel, setOilLevel] = useState<number>(1);
    const [waterLevel, setWaterLevel] = useState<number>(1);
    const [flRemoManual, setFlRemoManual] = useState<number>(1);
    const { createPmPtMeasure, isCreated, isError, resetState } = usePmPtStore();
    const [currentIndex, setCurrentIndex] = useState(0);

    const increment = useCallback(
        (setter: React.Dispatch<React.SetStateAction<number>>, isInteger?: boolean) => {
            setter(prev => (isInteger ? prev + 1 : Math.round((prev + 0.1) * 10) / 10));
        },
        []
    );

    const decrement = useCallback(
        (setter: React.Dispatch<React.SetStateAction<number>>, isInteger?: boolean) => {
            setter(prev => (isInteger ? Math.max(prev - 1, 0) : Math.max(Math.round((prev - 0.1) * 10) / 10, 0)));
        },
        []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setter(value);
        }
    };

    const sendInformation = () => {
        const obj: PMPT = {
            flRemoManual: flRemoManual,
            nivelAgua: waterLevel,
            nivelOleo: oilLevel,
            nomePonto: name,
            idColeta: idColeta
        };
        createPmPtMeasure(obj);
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
            setStatus(name, "COLETADO");
        }
        if (isError) {
            Swal.fire({
                title: 'Erro ao criar',
                icon: 'error',
                text: 'Ocorreu um erro durante a criação. Tente novamente!',
            });
            resetState();
            setStatus(name, "NAO_COLETADO");
        }
    }, [isCreated, resetState, isError, name, setStatus]);

    const infoContentData = [
        { type: "Nível do óleo", value: oilLevel, isInteger: false, setter: setOilLevel },
        { type: "Nível da água", value: waterLevel, isInteger: false, setter: setWaterLevel },
        { type: "Fl remo Manual", value: flRemoManual, isInteger: false, setter: setFlRemoManual }
    ];

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
                            increment={() => increment(item.setter, item.isInteger)}
                            decrement={() => decrement(item.setter, item.isInteger)}
                            handleChange={(e) => handleChange(e, item.setter)}
                            isInteger={item.isInteger}
                        />
                    ))}
                </div>
                <div className={styles.button_container_modal}>
                    <button className={styles.arrow_modal} onClick={prevPage} disabled={currentIndex === 0}>
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
                <button className={styles.buttonEnviar} onClick={sendInformation}>
                    Enviar
                </button>
            </main>
        </>
    );
}

export default PmPtCard;
