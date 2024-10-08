import styles from "../../../pages/PointCollect/PointCollect.module.css";
import React, { useEffect, useState, useCallback } from "react";
import { BooleanInput, InputPoint } from "../InputPoint";
import useColunasCarvaoStore from "../../../store/ColunasCarvaoStore";
import { COLUNAS_CARVAO } from "../../../interfaces/postParams";

const itemsPerPage = 2;

interface PointNameProps {
    name: string;
    idColeta: number;
}

function ColunasCarvaoCard({ name, idColeta }: PointNameProps) {
    const [measurements, setMeasurements] = useState({
        pressure_c01: 1,
        pressure_c02: 1,
        pressure_c03: 1,
        outletPressure: 1,
        trocaCarvao: false,
        retroLavagem: false,
    });

    const { createColunasCarvaoMeasure, isCreated, isError, resetState } = useColunasCarvaoStore();
    const [currentIndex, setCurrentIndex] = useState(0);

    const increment = useCallback((key: keyof typeof measurements, isInteger: boolean) => {
        setMeasurements(prevState => ({
            ...prevState,
            [key]: typeof prevState[key] === 'number' 
                ? (isInteger ? (prevState[key] as number) + 1 : parseFloat(((prevState[key] as number) + 0.1).toFixed(1)))
                : prevState[key]
        }));
    }, []);
    
    const decrement = useCallback((key: keyof typeof measurements, isInteger: boolean) => {
        setMeasurements(prevState => ({
            ...prevState,
            [key]: typeof prevState[key] === 'number'
                ? (isInteger && (prevState[key] as number) > 0 ? (prevState[key] as number) - 1 : (prevState[key] as number) > 0 ? parseFloat(((prevState[key] as number) - 0.1).toFixed(1)) : 0)
                : prevState[key]
        }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: keyof typeof measurements) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                      e.target.type === 'number' ? parseFloat(e.target.value) :
                      e.target.value === 'Sim';
        if (typeof value === 'number' && !isNaN(value) || typeof value === 'boolean') {
            setMeasurements(prev => ({ ...prev, [key]: value }));
        }
    };

    const sendInformation = () => {
        const obj: COLUNAS_CARVAO = {
            houve_retrolavagem: measurements.retroLavagem,
            houve_troca_carvao: measurements.trocaCarvao,
            pressao_c01: measurements.pressure_c01,
            pressao_c02: measurements.pressure_c02,
            pressao_c03: measurements.pressure_c03,
            pressao_saida: measurements.outletPressure,
            nomePonto: name,
            idColeta: idColeta
        };
        createColunasCarvaoMeasure(obj);
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
        { type: "Pressão C01", key: "pressure_c01", value: measurements.pressure_c01, isInteger: false, isBoolean: false },
        { type: "Pressão C02", key: "pressure_c02", value: measurements.pressure_c02, isInteger: false, isBoolean: false },
        { type: "Pressão C03", key: "pressure_c03", value: measurements.pressure_c03, isInteger: false, isBoolean: false },
        { type: "Pressão de Saída", key: "outletPressure", value: measurements.outletPressure, isInteger: false, isBoolean: false },
        { type: "Houve troca de carvão?", key: "trocaCarvao", value: measurements.trocaCarvao, isBoolean: true },
        { type: "Houve retrolavagem?", key: "retroLavagem", value: measurements.retroLavagem, isBoolean: true },
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
                        item.isBoolean ? (
                            <BooleanInput
                                key={index}
                                handleChange={(e) => handleChange(e, item.key as keyof typeof measurements)}
                                valor={item.value as boolean}
                                titulo={item.type}
                            />
                        ) : (
                            <InputPoint
                                key={index}
                                titulo={item.type}
                                valor={item.value as number}
                                increment={() => increment(item.key as keyof typeof measurements, item.isInteger as boolean)} 
                                decrement={() => decrement(item.key as keyof typeof measurements, item.isInteger as boolean)} 
                                isInteger={item.isInteger}
                                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, item.key as keyof typeof measurements)}
                            />
                        )
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

export default ColunasCarvaoCard;