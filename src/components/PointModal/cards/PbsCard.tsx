import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useEffect, useState } from "react";
import { InputPoint } from "../InputPoint";
import usePbsStore from "../../../store/PbsStore";
import { PBS } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string
}

function PbsCard({ name }: PointNameProps) {
    const [pressure, setPressure] = useState<number>(1);
    const [pulses, setPulses] = useState<number>(1);
    const [oilLevel, setOilLevel] = useState<number>(1);
    const [waterLevel, setWaterLevel] = useState<number>(1);
    const [volRemOleo, setVolRemOleo] = useState<number>(1);
    const { createPbsMeasure, isCreated, isError, resetState } = usePbsStore();

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
        const obj: PBS ={
            vol_rem_oleo: volRemOleo,
            pulsos: pulses,
            pressao: pressure,
            nivel_agua: waterLevel,
            nivel_oleo: oilLevel,
            nomePonto: name,
            idColeta: 1
        } 
        createPbsMeasure(obj);
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
                <InputPoint
                    decrement={() => decrement(setPulses, false)}
                    increment={() => increment(setPulses, false)}
                    handleChange={(e) => handleChange(e, setPulses)}
                    valor={pulses}
                    titulo="Pulsos"
                    isInteger={false}
                />
                <InputPoint
                    decrement={() => decrement(setOilLevel, false)}
                    increment={() => increment(setOilLevel, false)}
                    handleChange={(e) => handleChange(e, setOilLevel)}
                    valor={oilLevel}
                    titulo="Nível do óleo"
                    isInteger={false}
                />
                <InputPoint
                    decrement={() => decrement(setWaterLevel, false)}
                    increment={() => increment(setWaterLevel, false)}
                    handleChange={(e) => handleChange(e, setWaterLevel)}
                    valor={waterLevel}
                    titulo="Nível da água"
                    isInteger={false}
                />
                <InputPoint
                    decrement={() => decrement(setVolRemOleo, false)}
                    increment={() => increment(setVolRemOleo, false)}
                    handleChange={(e) => handleChange(e, setVolRemOleo)}
                    valor={volRemOleo}
                    titulo="Vol Rem Óleo"
                    isInteger={false}
                />
                </div>
                
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>

            </main>
        </>
    );
}

export default PbsCard;