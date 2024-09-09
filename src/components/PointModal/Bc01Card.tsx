import styles from "../../pages/PointCollect/PointCollect.module.css"
import { useState } from "react";
import { InputPoint } from "./InputPoint";

function Bc01Card() {
    const [pressure, setPressure] = useState<number>(1);
    const [frequency, setFrequency] = useState<number>(1);

    const increment = (setter: React.Dispatch<React.SetStateAction<number>>) => {
        setter(prev => Math.round((prev + 0.1) * 10) / 10);
    };

    const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
        setter(prev => (prev > 0 ? Math.round((prev - 0.1) * 10) / 10 : 0));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setter(value);
        }
    };

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto BC01</p>
            <main className={styles.infoContainer}>
                <InputPoint
                    decrement={() => decrement(setPressure)}
                    increment={() => increment(setPressure)}
                    handleChange={(e) => handleChange(e, setPressure)}
                    valor={pressure}
                    titulo="Pressão"
                />
                <InputPoint
                    decrement={() => decrement(setFrequency)}
                    increment={() => increment(setFrequency)}
                    handleChange={(e) => handleChange(e, setFrequency)}
                    valor={frequency}
                    titulo="Frequência"
                />
            </main>
        </>
    );
}

export default Bc01Card;
