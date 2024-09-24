import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useEffect, useState } from "react";
import { InputPoint } from "../InputPoint";
import { BC01 } from "../../../interfaces/postParams";
import useBc01Store from "../../../store/Bc01Store";

interface PointNameProps{
    name: string
}

function Bc01Card({ name }: PointNameProps) {
    const [pressure, setPressure] = useState<number>(1);
    const [frequency, setFrequency] = useState<number>(1);
    const [horimeter, setHorimeter] = useState<number>(1);
    const [leak, setLeak] = useState<number>(1);
    const [volume, setVolume] = useState<number>(1);
    const { createBc01Measure,  isCreated, isError, resetState } = useBc01Store();

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

        const obj: BC01 = {
            horimetro: horimeter,
            pressao: pressure,
            frequencia: frequency,
            vazao: leak,
            volume: volume,
            nomePonto: name,
            idColeta: 1
        }

        createBc01Measure(obj);

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
                <div style={{display: "flex"}}>
                    <InputPoint
                        decrement={() => decrement(setPressure, false)} 
                        increment={() => increment(setPressure, false)}  
                        handleChange={(e) => handleChange(e, setPressure)}
                        valor={pressure}
                        titulo="Pressão"
                        isInteger={false}
                    />
                    <InputPoint
                        decrement={() => decrement(setFrequency, true)}
                        increment={() => increment(setFrequency, true)}
                        handleChange={(e) => handleChange(e, setFrequency)}
                        valor={frequency}
                        titulo="Frequência"
                        isInteger={true}
                    />
                    <InputPoint
                        decrement={() => decrement(setHorimeter, true) }
                        increment={() => increment(setHorimeter, true)}
                        handleChange={(e) => handleChange(e, setHorimeter)}
                        valor={horimeter}
                        titulo="Horimetro"
                        isInteger={true}
                    />
                    <InputPoint
                        decrement={() => decrement(setLeak, false)}
                        increment={()=> increment(setLeak, false)}
                        handleChange={(e)=> handleChange(e, setLeak)}
                        valor={leak}
                        titulo="Vazão"
                        isInteger={false}
                    />
                    <InputPoint
                        decrement={()=> decrement(setVolume, true)}
                        increment={()=> increment(setVolume, true)}
                        handleChange={(e)=> handleChange(e, setVolume)}
                        valor={volume}
                        titulo="Volume"
                        isInteger={true}
                    />
                </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>

            </main>
        </>
    );
}

export default Bc01Card;
