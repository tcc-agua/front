import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useEffect, useState } from "react";
import { DropdownInput, InputPoint } from "../InputPoint";
import useCdStore from "../../../store/CdStore";
import { CD } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string
}

function CdCard({ name }: PointNameProps) {
    const [pressure, setPressure] = useState<number>(1);
    const [hidrometer, setHidrometer] = useState<number>(1);
    const [tipoRede, setTipoRede] = useState<string>("ETAS");
    const { createCdMeasure, isCreated, isError, resetState } = useCdStore();

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

    const handleChangeDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoRede(e.target.value);
    };

    const sendInformation = () => {
        const obj: CD = {
            hidrometro: hidrometer,
            pressao: pressure,
            tipo_rede: tipoRede,
            nomePonto: name,
            idColeta: 1
        }
        createCdMeasure(obj);
    };

    useEffect (() =>{
        if(isCreated){
            alert("Criado")
            resetState()
        }
        if(isError){
            alert("ERRO")
        }

    }, [isCreated, resetState, isError])

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                    <div className={styles.infoGrid}>
                        <InputPoint
                            decrement={() => decrement(setPressure, false)}
                            increment={() => increment(setPressure, false)}
                            handleChange={(e) => handleChangeNumber(e, setPressure)}
                            valor={pressure}
                            titulo="Pressão"
                            isInteger={false}
                        />
                        <InputPoint
                            decrement={() => decrement(setHidrometer, true)}
                            increment={() => increment(setHidrometer, true)}
                            handleChange={(e) => handleChangeNumber(e, setHidrometer)}
                            valor={hidrometer}
                            titulo="Hidrometro"
                            isInteger={true}
                        />
                        <DropdownInput
                            handleChange={handleChangeDropdown}
                            opcoes={["ETAS", "NA"]}
                            titulo="Tipo de Rede"
                            valor={tipoRede}
                        />
                    </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default CdCard;
