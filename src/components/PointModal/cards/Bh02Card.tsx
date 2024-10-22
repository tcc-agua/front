import styles from "../../../pages/PointCollect/PointCollect.module.css";
import React, { useEffect, useState, useCallback } from "react";
import Swal from 'sweetalert2';
import { InputPoint } from "../InputPoint"; 
import { BH02 } from "../../../interfaces/postParams";
import useBh02Store from "../../../store/Bh02Store";
import usePontoState from "../../../store/PontoStore";
import useUtilsStore from "../../../store/utils";

const itemsPerPage = 2;

interface PointNameProps {
    name: string;
    idColeta: number;
}

function Bh02Card({ name, idColeta }: PointNameProps) {
    const { setStatus } = usePontoState();
    const { fetchPoints } = useUtilsStore();
    
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
            idColeta: idColeta,
        };
        createBh02Measure(obj);
        fetchPoints();
    };

    useEffect(() => {
        const getModalWidth = () => {
            const width = window.innerWidth;
            
            if (width <= 540) return '95%';
            if (width <= 680) return '90%';
            if (width <= 750) return '85%';
            if (width <= 865) return '75%';
            if (width <= 1300) return '40%';
            if (width <= 1500) return '30%';
            
            return '30%'; 
        };
    
        if (isCreated) {
            Swal.fire({
                title: 'Sucesso!',
                icon: 'success',
                text: 'Coleta inserida com sucesso!',
                showConfirmButton: false,
                timer: 2000,
                width: getModalWidth(),
                customClass: {
                    popup: 'custom-swal-popup', 
                },
            });
            resetState();
            setStatus(name, "COLETADO");
        }
    
        if (isError) {
            Swal.fire({
                title: 'Erro ao criar',
                icon: 'error',
                text: 'Ocorreu um erro durante a criação. Tente novamente!',
                width: getModalWidth(), 
                customClass: {
                    popup: 'custom-swal-popup', 
                },
            });
            resetState();
            setStatus(name, "NAO_COLETADO");
        }
    }, [isCreated, resetState, isError, name, setStatus]);

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
