import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useState } from "react";
import { DropdownInput, InputPoint } from "../InputPoint";

function CdCard() {
    const [pressure, setPressure] = useState<number>(1);
    const [hidrometer, setHidrometer] = useState<number>(1);
    const [tipoRede, setTipoRede] = useState<string>("ETAS");

    const increment = (setter: React.Dispatch<React.SetStateAction<number>>) => {
        setter(prev => Math.round((prev + 0.1) * 10) / 10);
    };

    const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
        setter(prev => (prev > 0 ? Math.round((prev - 0.1) * 10) / 10 : 0));
    };

    const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setter(value);
        }
    };

    const handleChangeDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoRede(e.target.value);
    };

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto Bomba BC03</p>
            <main className={styles.infoContainer}>
                <InputPoint
                    decrement={() => decrement(setPressure)}
                    increment={() => increment(setPressure)}
                    handleChange={(e) => handleChangeNumber(e, setPressure)}
                    valor={pressure}
                    titulo="Pressão"
                />
                <InputPoint
                    decrement={() => decrement(setHidrometer)}
                    increment={() => increment(setHidrometer)}
                    handleChange={(e) => handleChangeNumber(e, setHidrometer)}
                    valor={hidrometer}
                    titulo="Hidrometro"
                />
                <DropdownInput
                    handleChange={handleChangeDropdown}
                    opcoes={["ETAS", "NA"]}
                    titulo="Tipo de Rede"
                    valor={tipoRede}
                />
            </main>
        </>
    );
}

export default CdCard;
