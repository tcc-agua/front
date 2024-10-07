import styles from "../../../pages/PointCollect/PointCollect.module.css";
import React, { useEffect, useState, useCallback } from "react";
import { InputPoint } from "../InputPoint"; 
import { BH02 } from "../../../interfaces/postParams";
import useBh02Store from "../../../store/Bh02Store";

const itemsPerPage = 2;

interface PointNameProps {
    name: string;
}

function Bh02Card({ name }: PointNameProps) {
    const [measurements, setMeasurements] = useState({
        pressure: 1,
        frequency: 1,
        horimeter: 1,
    });

    const { createBh02Measure, isCreated, isError, resetState } = useBh02Store();
    const [currentIndex, setCurrentIndex] = useState(0);

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
        const obj: BH02 = {
            pressao: measurements.pressure,
            frequencia: measurements.frequency,
            horimetro: measurements.horimeter,
            nomePonto: name,
            idColeta: 1,
        };

        createBh02Measure(obj);
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

    const infoContentData = [
        { type: "Pressão", key: "pressure", value: measurements.pressure, isInteger: true },
        { type: "Frequência", key: "frequency", value: measurements.frequency, isInteger: true },
        { type: "Horímetro", key: "horimeter", value: measurements.horimeter, isInteger: true },
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

export default Bh02Card;
