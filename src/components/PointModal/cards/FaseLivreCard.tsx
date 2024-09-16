import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useState } from "react";
import { BooleanInput, InputPoint } from "../InputPoint";

function FaseLivreCard() {
    const [volume, setVolume] = useState<number>(1);
    const [houveTroca, setHouveTroca] = useState<boolean>(false);

    const increment = (setter: React.Dispatch<React.SetStateAction<number>>, isInteger?: boolean) => {
        setter(prev => isInteger ? prev + 1 : Math.round((prev + 0.1) * 10) / 10);
    };
    
    const decrement = (setter: React.Dispatch<React.SetStateAction<number>>, isInteger?: boolean) => {
        setter(prev => isInteger ? Math.max(prev - 1, 0) : Math.max(Math.round((prev - 0.1) * 10) / 10, 0));
    };

    const handleBooleanChange = (event: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(event.target.value === "Sim");
    };    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setter(value);
        }
    };

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto Fase Livre</p>
            <main className={styles.infoContainer}>
                <InputPoint
                    decrement={() => decrement(setVolume, false)}
                    increment={() => increment(setVolume, false)}
                    handleChange={(e) => handleChange(e, setVolume)}
                    valor={volume}
                    titulo="Volume"
                    isInteger={false}
                />
                <BooleanInput
                    handleChange={(e) => handleBooleanChange(e, setHouveTroca)}
                    valor={houveTroca}
                    titulo="Houve Troca?"
                />
            </main>
        </>
    );
}

export default FaseLivreCard;