import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useEffect, useState } from "react";
import { InputPoint } from "../InputPoint";
import useBombaBc03Store from "../../../store/BombaBc03Store";
import { BOMBA_BC03 } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string
}

function BombaBc03Card({ name }: PointNameProps ) {
    const [pressure, setPressure] = useState<number>(1);
    const [horimeter, setHorimeter] = useState<number>(1);
    const [hidrometer, setHidrometer] = useState<number>(1);
    const { createBombaBc03Measure, isCreated, isError, resetState } = useBombaBc03Store();

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

        const obj: BOMBA_BC03 = {
            hidrometro: hidrometer,
            horimetro: horimeter,
            pressao: pressure,
            nomePonto: name,
            idColeta: 1
        }

        createBombaBc03Measure(obj);

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
                                handleChange={(e) => handleChange(e, setPressure)}
                                valor={pressure}
                                titulo="Pressão"
                                isInteger={false}
                            />
                            <InputPoint
                                decrement={() => decrement(setHorimeter, false)} 
                                increment={() => increment(setHorimeter, false)}  
                                handleChange={(e) => handleChange(e, setHorimeter)}
                                valor={horimeter}
                                titulo="Horimetro"
                                isInteger={false}
                            />
                            <InputPoint
                                decrement={() => decrement(setHidrometer, false)}
                                increment={() => increment(setHidrometer, false)} 
                                handleChange={(e) => handleChange(e, setHidrometer)}
                                valor={hidrometer}
                                titulo="Hidrometro"
                                isInteger={false}
                            />
                    </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default BombaBc03Card;