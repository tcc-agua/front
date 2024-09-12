import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useState } from "react";
import { InputPoint } from "../InputPoint";

function Bs01HidrometroCard() {
    const [volume, setVolume] = useState<number>(1);

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
            <p className={styles.pointName}>Dados de coleta do ponto BS01 Hidrometro</p>
            <main className={styles.infoContainer}>
                <InputPoint
                    decrement={()=> decrement(setVolume)}
                    increment={()=> increment(setVolume)}
                    handleChange={(e)=> handleChange(e, setVolume)}
                    valor={volume}
                    titulo="Volume"                
                />
            </main>
        </>
    );
}

export default Bs01HidrometroCard;
