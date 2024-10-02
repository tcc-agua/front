import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useEffect, useState } from "react";
import { InputPoint } from "../InputPoint";
import useBc06Store from "../../../store/Bc06Store";
import { BC06 } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string
}

function Bc06Card({ name }: PointNameProps) {
    const [pressure, setPressure] = useState<number>(1);
    const [horimeter, setHorimeter] = useState<number>(1);
    const { createBc06Measure, isCreated, isError, resetState } = useBc06Store();

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

        const obj: BC06 = {
            horimetro : horimeter,
            pressao : pressure,
            nomePonto : name,
            idColeta : 1,
        }

        createBc06Measure(obj);

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
                </div>
                
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default Bc06Card;