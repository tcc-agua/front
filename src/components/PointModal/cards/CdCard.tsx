import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useEffect, useState, useCallback } from "react";
import { DropdownInput, InputPoint } from "../InputPoint";
import useCdStore from "../../../store/CdStore";
import { CD } from "../../../interfaces/postParams";

const itemsPerPage = 2; // Definindo itens por página

interface PointNameProps {
    name: string;
}

function CdCard({ name }: PointNameProps) {
    const [measurements, setMeasurements] = useState({
        pressure: 1,
        hidrometer: 1,
        tipoRede: "ETAS",
    });

    const { createCdMeasure, isCreated, isError, resetState } = useCdStore();
    const [currentIndex, setCurrentIndex] = useState(0);

    const increment = useCallback((key: keyof typeof measurements, isInteger: boolean) => {
        setMeasurements(prevState => {
            if (typeof prevState[key] === "number") {
                return {
                    ...prevState,
                    [key]: isInteger
                        ? (prevState[key] as number) + 1
                        : parseFloat(((prevState[key] as number) + 0.1).toFixed(1)),
                };
            }
            return prevState; 
        });
    }, []);

    const decrement = useCallback((key: keyof typeof measurements, isInteger: boolean) => {
        setMeasurements(prevState => {
            if (typeof prevState[key] === "number") {
                return {
                    ...prevState,
                    [key]: isInteger && (prevState[key] as number) > 0
                        ? (prevState[key] as number) - 1
                        : (prevState[key] as number) > 0
                            ? parseFloat(((prevState[key] as number) - 0.1).toFixed(1))
                            : 0,
                };
            }
            return prevState; // No caso de não ser um número, não faz nada
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof measurements) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setMeasurements(prev => {
                if (typeof prev[key] === "number") {
                    return { ...prev, [key]: value };
                }
                return prev;
            });
        }
    };

    const handleChangeDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMeasurements(prev => ({ ...prev, tipoRede: e.target.value }));
    };

    const sendInformation = () => {
        const obj: CD = {
            hidrometro: measurements.hidrometer,
            pressao: measurements.pressure,
            tipo_rede: measurements.tipoRede,
            nomePonto: name,
            idColeta: 1,
        };
        createCdMeasure(obj);
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
        { type: "Pressão", key: "pressure", value: measurements.pressure, isInteger: false },
        { type: "Hidrometro", key: "hidrometer", value: measurements.hidrometer, isInteger: true },
        { type: "Tipo de Rede", key: "tipoRede", value: measurements.tipoRede, isInteger: false },
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
                        item.key === 'tipoRede' ? (
                            <DropdownInput
                                key={index}
                                handleChange={handleChangeDropdown}
                                opcoes={["ETAS", "NA"]}
                                titulo={item.type}
                                valor={measurements[item.key]}
                            />
                        ) : (
                            <InputPoint
                                key={index}
                                titulo={item.type}
                                valor={item.value as number}
                                increment={() => increment(item.key as keyof typeof measurements, item.isInteger)}
                                decrement={() => decrement(item.key as keyof typeof measurements, item.isInteger)}
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

export default CdCard;
