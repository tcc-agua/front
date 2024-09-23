import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useState } from "react";
import { InputPoint } from "../InputPoint";

interface PointNameProps{
    name: string
}

function Bh02Card({ name }: PointNameProps) {
    const [pressure, setPressure] = useState<number>(1);
    const [horimeter, setHorimeter] = useState<number>(1);
    const [frequency, setFrequency] = useState<number>(1);

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
            <p className={styles.pointName}>Dados de coleta do ponto {name}</p>
            <main className={styles.infoContainer}>
                <InputPoint
                    decrement={() => decrement(setPressure, true)}
                    increment={() => increment(setPressure, true)}
                    handleChange={(e) => handleChange(e, setPressure)}
                    valor={pressure}
                    titulo="Pressão"
                    isInteger={true}
                />
                <InputPoint
                    decrement={() => decrement(setHorimeter, true) }
                    increment={() => increment(setHorimeter, true)}
                    handleChange={(e) => handleChange(e, setHorimeter)}
                    valor={horimeter}
                    titulo="Horimetro"
                    isInteger={true}
                />
                <InputPoint
                    decrement={() => decrement(setFrequency, true)}
                    increment={() => increment(setFrequency, true)}
                    handleChange={(e) => handleChange(e, setFrequency)}
                    valor={frequency}
                    titulo="Frequência"
                    isInteger={true}
                />
            </main>
        </>
    );
}

export default Bh02Card;