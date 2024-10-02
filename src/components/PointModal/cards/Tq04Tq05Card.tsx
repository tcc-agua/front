import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useEffect, useState } from "react";
import { BooleanInput, InputPoint } from "../InputPoint";
import useTq04Tq05Store from "../../../store/Tq04Tq05Store";
import { TQ04_TQ05 } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string
}

function Tq04Tq05Card({ name }: PointNameProps) {
    const [kgBombonas, setKgBombonas] = useState<number>(1);
    const [qtdBombonas, setQtdBombonas] = useState<number>(1);
    const [horimeter, setHorimeter] = useState<number>(1);
    const [hidrometer, setHidrometer] = useState<number>(1);
    const [preparoSolucao, setPreparoSolucao] = useState<boolean>(false);
    const { createTq04Tq05Measure, isCreated, isError, resetState} = useTq04Tq05Store();

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

    const sendInformation = () => {
        const obj: TQ04_TQ05 ={
            qtd_bombonas: qtdBombonas,
            kg_bombonas: kgBombonas,
            hidrometro: hidrometer,
            horimetro:horimeter,
            houve_preparo_solucao: preparoSolucao,
            nomePonto: name,
            idColeta: 1
        }
        createTq04Tq05Measure(obj);
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
                    decrement={() => decrement(setQtdBombonas, true)}
                    increment={() => increment(setQtdBombonas, true)}
                    handleChange={(e) => handleChange(e, setQtdBombonas)}
                    valor={qtdBombonas}
                    titulo="Qtd Bombonas"
                    isInteger={true}
                />
                <InputPoint
                    decrement={() => decrement(setKgBombonas, false)}
                    increment={() => increment(setKgBombonas, false)}
                    handleChange={(e) => handleChange(e, setKgBombonas)}
                    valor={kgBombonas}
                    titulo="Kg Bombonas"
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
                <BooleanInput
                    handleChange={(e) => handleBooleanChange(e, setPreparoSolucao)}
                    valor={preparoSolucao}
                    titulo="Houve Preparo Solucao?"
                />
                </div>
            
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default Tq04Tq05Card;