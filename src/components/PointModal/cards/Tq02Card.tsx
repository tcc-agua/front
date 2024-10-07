import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useEffect, useState } from "react";
import { InputPoint } from "../InputPoint";
import useTq02Store from "../../../store/Tq02Store";
import { TQ02 } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string
}

function Tq02Card({ name }: PointNameProps) {
    const [ph, setPh] = useState<number>(1);
    const [lt_02_1, setLt_02_1] = useState<number>(1);
    const { createTq02Measure, isCreated, isError, resetState } = useTq02Store();

    const increment = (setter: React.Dispatch<React.SetStateAction<number>>, isInteger?: boolean) => {
        setter(prev => isInteger ? prev + 1 : Math.round((prev + 0.1) * 10) / 10);
    };
    
    const decrement = (setter: React.Dispatch<React.SetStateAction<number>>, isInteger?: boolean) => {
        setter(prev => isInteger ? Math.max(prev - 1, 0) : Math.max(Math.round((prev - 0.1) * 10) / 10, 0));
    };

    const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setter(value);
        }
    };

    const sendInformation = () => {
        const obj: TQ02 = {
            sensor_ph: ph,
            Lt_02_1: lt_02_1,
            nomePonto: name,
            idColeta: 1 
        }
        createTq02Measure(obj);
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
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div className={styles.infoGrid}>
                <InputPoint
                    decrement={() => decrement(setPh, false)}
                    increment={() => increment(setPh, false)}
                    handleChange={(e) => handleChangeNumber(e, setPh)}
                    valor={ph}
                    titulo="Sensor PH"
                    isInteger={false}
                />
                <InputPoint
                    decrement={() => decrement(setLt_02_1, false)}
                    increment={() => increment(setLt_02_1, false)}
                    handleChange={(e) => handleChangeNumber(e, setLt_02_1)}
                    valor={lt_02_1}
                    titulo="Lt 02 1"
                    isInteger={false}
                />
                </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default Tq02Card;
