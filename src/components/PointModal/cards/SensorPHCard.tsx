import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useEffect, useState } from "react";
import { InputPoint } from "../InputPoint";
import useSensorPhStore from "../../../store/SensorPhStore";
import { SENSOR_PH } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string;
    idColeta: number
}

function SensorPHCard({ name, idColeta }: PointNameProps) {
    const [ph, setPh] = useState<number>(1);
    const { createSensorPhMeasure, isCreated, isError, resetState } = useSensorPhStore();

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
        const obj: SENSOR_PH = {
            ph: ph,
            nomePonto: name,
            idColeta: idColeta
        }
        createSensorPhMeasure(obj);
    };

    useEffect (() =>{
        if(isCreated){
            alert("Criado")
            resetState()
        }
        if(isError){
            alert("ERRO")
        }

    }, [isCreated, resetState, isError])

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do Ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div className={styles.infoGrid}>
                <InputPoint
                    decrement={() => decrement(setPh, false)}
                    increment={() => increment(setPh, false)}
                    handleChange={(e) => handleChange(e, setPh)}
                    valor={ph}
                    titulo="Ph"
                    isInteger={false}
                />
                </div>

                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default SensorPHCard;