import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useState } from "react";
import { InputPoint } from "../InputPoint";

function Bc06Card() {
    const [pressure, setPressure] = useState<number>(1);
    const [horimeter, setHorimeter] = useState<number>(1);

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
            <p className={styles.pointName}>Dados de coleta do ponto BC06</p>
            <main className={styles.infoContainer}>
                <InputPoint
                    decrement={() => decrement(setPressure)}
                    increment={() => increment(setPressure)}
                    handleChange={(e) => handleChange(e, setPressure)}
                    valor={pressure}
                    titulo="Pressão"
                    isInteger={false}
                />

                <InputPoint
                    decrement={() => decrement(setHorimeter) }
                    increment={() => increment(setHorimeter)}
                    handleChange={(e) => handleChange(e, setHorimeter)}
                    valor={horimeter}
                    titulo="Horimetro"
                />
            </main>
        </>
    );
}

export default Bc06Card;