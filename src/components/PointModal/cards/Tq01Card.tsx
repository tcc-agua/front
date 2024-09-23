import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useState } from "react";
import { InputPoint } from "../InputPoint";

interface PointNameProps{
    name: string
}

function Tq01Card({ name }: PointNameProps) {
    const [nivel, setNivel] = useState<number>(1);

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

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <InputPoint
                    decrement={() => decrement(setNivel, false)}
                    increment={() => increment(setNivel, false)}
                    handleChange={(e) => handleChangeNumber(e, setNivel)}
                    valor={nivel}
                    titulo="Nivel"
                    isInteger={false}
                />
            </main>
        </>
    );
}

export default Tq01Card;
