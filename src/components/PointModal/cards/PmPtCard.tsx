import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useState } from "react";
import { InputPoint } from "../InputPoint";

interface PointNameProps{
    name: string
}

function PmPtCard({ name }: PointNameProps) {
    const [oilLevel, setOilLevel] = useState<number>(1);
    const [waterLevel, setWaterLevel] = useState<number>(1);
    const [volRemOleo, setVolRemOleo] = useState<number>(1);

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

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div>
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
                    decrement={() => decrement(setVolRemOleo, false)}
                    increment={() => increment(setVolRemOleo, false)}
                    handleChange={(e) => handleChange(e, setVolRemOleo)}
                    valor={volRemOleo}
                    titulo="Vol Rem Óleo"
                    isInteger={false}
                />
                </div>
            
                <button className={styles.buttonEnviar} onClick={() => console.log("Dados enviados")}>Enviar</button>
            </main>
        </>
    );
}

export default PmPtCard;