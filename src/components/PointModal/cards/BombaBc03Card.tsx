import styles from "../../../pages/PointCollect/PointCollect.module.css";
import React, { useEffect, useState, useCallback } from "react";
import { InputPoint } from "../InputPoint"; 
import useBombaBc03Store from "../../../store/BombaBc03Store";
import { BOMBA_BC03 } from "../../../interfaces/postParams";

const itemsPerPage = 2;

interface PointNameProps {
    name: string;
}

function BombaBc03Card({ name }: PointNameProps) {
    const [measurements, setMeasurements] = useState({
        pressure: 1,
        horimeter: 1,
        hidrometer: 1,
    });

    const { createBombaBc03Measure, isCreated, isError, resetState } = useBombaBc03Store();
    const [currentIndex, setCurrentIndex] = useState(0);

    const increment = useCallback((key: keyof typeof measurements) => {
        setMeasurements(prevState => ({
            ...prevState,
            [key]: parseFloat((prevState[key] + 0.1).toFixed(1))
        }));
    }, []);

    const decrement = useCallback((key: keyof typeof measurements) => {
        setMeasurements(prevState => ({
            ...prevState,
            [key]: prevState[key] > 0 ? parseFloat((prevState[key] - 0.1).toFixed(1)) : 0
        }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof measurements) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setMeasurements(prev => ({ ...prev, [key]: value }));
        }
    };

    const sendInformation = () => {
        const obj: BOMBA_BC03 = {
            hidrometro: measurements.hidrometer,
            horimetro: measurements.horimeter,
            pressao: measurements.pressure,
            nomePonto: name,
            idColeta: 1,
        };

        createBombaBc03Measure(obj);
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
        { type: "Pressão", key: "pressure", value: measurements.pressure },
        { type: "Horímetro", key: "horimeter", value: measurements.horimeter },
        { type: "Hidrometro", key: "hidrometer", value: measurements.hidrometer },
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
                            increment={() => increment(item.key as keyof typeof measurements)} 
                            decrement={() => decrement(item.key as keyof typeof measurements)} 
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
                        ←
                    </button>
                    <button
                        className={styles.arrow_modal}
                        onClick={nextPage}
                        disabled={currentIndex + itemsPerPage >= infoContentData.length}
                    >
                        →
                    </button>
                </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default BombaBc03Card;
