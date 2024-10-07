import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useEffect, useState } from "react";
import { InputPoint } from "../InputPoint";
import usePmPtStore from "../../../store/PmPtStore";
import { PMPT } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string
}

function PmPtCard({ name }: PointNameProps) {
    const [oilLevel, setOilLevel] = useState<number>(1);
    const [waterLevel, setWaterLevel] = useState<number>(1);
    const [flRemoManual, setFlRemoManual] = useState<number>(1);
    const { createPmPtMeasure, isCreated, isError, resetState } = usePmPtStore();

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
        const obj: PMPT = {
             flRemoManual: flRemoManual,
             nivelAgua: waterLevel,
             nivelOleo: oilLevel,
             nomePonto: name,
             idColeta: 1
        }
        createPmPtMeasure(obj);
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
                    decrement={() => decrement(setOilLevel, false)}
                    increment={() => increment(setOilLevel, false)}
                    handleChange={(e) => handleChange(e, setOilLevel)}
                    valor={oilLevel}
                    titulo="Nível do óleo"
                    isInteger={false}
                />
                <InputPoint
                    decrement={() => decrement(setWaterLevel, false)}
                    increment={() => increment(setWaterLevel, false)}
                    handleChange={(e) => handleChange(e, setWaterLevel)}
                    valor={waterLevel}
                    titulo="Nível da água"
                    isInteger={false}
                />
                <InputPoint
                    decrement={() => decrement(setFlRemoManual, false)}
                    increment={() => increment(setFlRemoManual, false)}
                    handleChange={(e) => handleChange(e, setFlRemoManual)}
                    valor={flRemoManual}
                    titulo="Fl remo Manual"
                    isInteger={false}
                />
                </div>
            
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default PmPtCard;