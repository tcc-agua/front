import styles from "../../../pages/PointCollect/PointCollect.module.css";
import React, { useState, useCallback } from "react";
import Swal from 'sweetalert2';
import { InputPoint } from "../InputPoint"; 
import useBombaBc03Store from "../../../store/BombaBc03Store";
import { BOMBA_BC03 } from "../../../interfaces/postParams";
import usePontoState from "../../../store/PontoStore";
import useUtilsStore from "../../../store/utils";

const itemsPerPage = 2;

interface PointNameProps {
    name: string;
    idColeta: number;
    closeModal: () => void; 
}

function BombaBc03Card({ name, idColeta, closeModal }: PointNameProps) {
    const { setStatus } = usePontoState();
    const { fetchPoints } = useUtilsStore();

    const [measurements, setMeasurements] = useState({
        pressure: 1,
        horimeter: 1,
        hidrometer: 1,
    });

    const infoContentData = [
        { type: "Pressão", key: "pressure", value: measurements.pressure },
        { type: "Horímetro", key: "horimeter", value: measurements.horimeter },
        { type: "Hidrometro", key: "hidrometer", value: measurements.hidrometer },
    ];

    const { createBombaBc03Measure } = useBombaBc03Store();
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

    const sendInformation = async () => {
        const obj: BOMBA_BC03 = {
            hidrometro: measurements.hidrometer,
            horimetro: measurements.horimeter,
            pressao: measurements.pressure,
            nomePonto: name,
            idColeta: idColeta,
        };
        try{
           await createBombaBc03Measure(obj);
           Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Medida enviada com sucesso!',
            showConfirmButton: false,
            timer: 2000,
            width: getModalWidth(),
            customClass: {
                popup: 'custom-swal-popup', 
            },
        });

        setStatus(name, 'COLETADO');
        fetchPoints();
        closeModal();

        } catch(error){
            console.error("Erro ao enviar medida:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao enviar a medida.',
                showConfirmButton: false,
                timer: 2000,
                width: getModalWidth(),
                customClass: {
                    popup: 'custom-swal-popup', 
                },
            });
        }
        fetchPoints();
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

export default BombaBc03Card;
