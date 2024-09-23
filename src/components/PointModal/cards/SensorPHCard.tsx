import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useState } from "react";
import { InputPoint } from "../InputPoint";

interface PointNameProps{
    name: string
}

function SensorPHCard({ name }: PointNameProps) {
    const [ph, setPh] = useState<number>(1);

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
            <p className={styles.pointName}>Dados de coleta do Ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div>
                <InputPoint
                    decrement={() => decrement(setPh, false)}
                    increment={() => increment(setPh, false)}
                    handleChange={(e) => handleChange(e, setPh)}
                    valor={ph}
                    titulo="Ph"
                    isInteger={false}
                />
                </div>

                <button className={styles.buttonEnviar} onClick={() => console.log("Dados enviados")}>Enviar</button>
            </main>
        </>
    );
}

export default SensorPHCard;