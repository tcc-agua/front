import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useState } from "react";
import { InputPoint } from "../InputPoint";

interface PointNameProps{
    name: string
}

function HorimetroCard({ name }: PointNameProps) {
    const [horimeter, setHorimeter] = useState<number>(1);

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
            <p className={styles.pointName}>Dados de coleta do ponto {name}</p>
            <main className={styles.infoContainer}>
                <InputPoint
                    decrement={() => decrement(setHorimeter, false)}
                    increment={() => increment(setHorimeter, false)}
                    handleChange={(e) => handleChangeNumber(e, setHorimeter)}
                    valor={horimeter}
                    titulo="Horimetro"
                    isInteger={false}
                />
            </main>
        </>
    );
}

export default HorimetroCard;
