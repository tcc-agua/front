import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useEffect, useState } from "react";
import { InputPoint } from "../InputPoint";
import useBs01PressaoStore from "../../../store/Bs01PressaoStore";
import { BS01_PRESSAO } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string
}

function Bs01PressaoCard({ name }: PointNameProps) {
    const [pressure, setPressure] = useState<number>(1);
    const { createBs01PressaoMeasure, isCreated, isError, resetState } = useBs01PressaoStore();

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

    const sendInformation = () => {
        
        const obj: BS01_PRESSAO = {
            pressao: pressure,
            nomePonto: name,
            idColeta: 1
        }
        createBs01PressaoMeasure(obj);
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
                <div>
                    <InputPoint
                        decrement={() => decrement(setPressure, false)}
                        increment={() => increment(setPressure, false)}
                        handleChange={(e) => handleChange(e, setPressure)}
                        valor={pressure}
                        titulo="Pressão"
                        isInteger={false}
                    />
                    </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default Bs01PressaoCard;