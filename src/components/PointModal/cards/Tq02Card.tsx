import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useState } from "react";
import { InputPoint } from "../InputPoint";

interface PointNameProps{
    name: string
}

function Tq02Card({ name }: PointNameProps) {
    const [ph, setPh] = useState<number>(1);
    const [lt_02_1, setLt_02_1] = useState<number>(1);

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
            </main>
        </>
    );
}

export default Tq02Card;
