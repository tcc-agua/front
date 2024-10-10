import styles from "../../../pages/PointCollect/PointCollect.module.css";
import React, { useEffect, useState, useCallback } from "react";
import Swal from 'sweetalert2';
import { InputPoint } from "../InputPoint"; 
import { BC01 } from "../../../interfaces/postParams";
import useBc01Store from "../../../store/Bc01Store";
import usePontoState from "../../../store/PontoStore";

const itemsPerPage = 2;

interface PointNameProps {
    name: string;
    idColeta: number;
}

function Bc01Card({ name, idColeta }: PointNameProps) {
    const { createBc01Measure, isCreated, isError, resetState } = useBc01Store();
    const [currentIndex, setCurrentIndex] = useState(0);
    const { setStatus } = usePontoState();

    const [measurements, setMeasurements] = useState({
        pressure: 1,
        frequency: 1,
        horimeter: 1,
        leak: 1,
        volume: 1,
    });

    const increment = useCallback((key: keyof typeof measurements, isInteger: boolean) => {
        setMeasurements(prevState => ({
            ...prevState,
            [key]: isInteger ? prevState[key] + 1 : parseFloat((prevState[key] + 0.1).toFixed(1))
        }));
    }, []);
    
    const decrement = useCallback((key: keyof typeof measurements, isInteger: boolean) => {
        setMeasurements(prevState => ({
            ...prevState,
            [key]: isInteger && prevState[key] > 0 ? prevState[key] - 1 : prevState[key] > 0 ? parseFloat((prevState[key] - 0.1).toFixed(1)) : 0
        }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof measurements) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setMeasurements(prev => ({ ...prev, [key]: value }));
        }
    };

    const sendInformation = () => {
        const obj: BC01 = {
            horimetro: measurements.horimeter,
            pressao: measurements.pressure,
            frequencia: measurements.frequency,
            vazao: measurements.leak,
            volume: measurements.volume,
            nomePonto: name,
            idColeta: idColeta,
        };

        createBc01Measure(obj);
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
        { type: "Pressão", key: "pressure", value: measurements.pressure, isInteger: false },
        { type: "Frequência", key: "frequency", value: measurements.frequency, isInteger: true },
        { type: "Horímetro", key: "horimeter", value: measurements.horimeter, isInteger: true },
        { type: "Vazão", key: "leak", value: measurements.leak, isInteger: false },
        { type: "Volume", key: "volume", value: measurements.volume, isInteger: true },
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
                            increment={() => increment(item.key as keyof typeof measurements, item.isInteger)} 
                            decrement={() => decrement(item.key as keyof typeof measurements, item.isInteger)} 
                            isInteger={item.isInteger}
                            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, item.key as keyof typeof measurements)}
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

export default Bc01Card;
