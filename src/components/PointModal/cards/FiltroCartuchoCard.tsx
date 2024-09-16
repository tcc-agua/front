import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useState } from "react";
import { BooleanInput, InputPoint } from "../InputPoint";

function FiltroCartuchoCard() {
    const [outletPressure, setOutletPressure] = useState<number>(1);
    const [inletPressure, setInletPressure] = useState<number>(1);

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
            <p className={styles.pointName}>Dados de coleta do ponto Filtro Cartucho</p>
            <main className={styles.infoContainer}>
                <InputPoint
                    decrement={() => decrement(setInletPressure, false)}
                    increment={() => increment(setInletPressure, false)}
                    handleChange={(e) => handleChange(e, setInletPressure)}
                    valor={inletPressure}
                    titulo="Pressão de entrada"
                    isInteger={false}
                />
                <InputPoint
                    decrement={() => decrement(setOutletPressure, false)}
                    increment={() => increment(setOutletPressure, false)}
                    handleChange={(e) => handleChange(e, setOutletPressure)}
                    valor={outletPressure}
                    titulo="Pressão de Saída"
                    isInteger={false}
                />
            </main>
        </>
    );
}

export default FiltroCartuchoCard;