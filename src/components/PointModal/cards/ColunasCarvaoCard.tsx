import styles from "../../../pages/PointCollect/PointCollect.module.css";
import React, { useEffect, useState } from "react";
import { BooleanInput, InputPoint } from "../InputPoint";
import useColunasCarvaoStore from "../../../store/ColunasCarvaoStore";
import { COLUNAS_CARVAO } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string
}

function ColunasCarvaoCard({ name }: PointNameProps) {
    const [pressure_c01, setPressure_c01] = useState<number>(1);
    const [pressure_c02, setPressure_c02] = useState<number>(1);
    const [pressure_c03, setPressure_c03] = useState<number>(1);
    const [outletPressure, setOutletPressure] = useState<number>(1);
    const [trocaCarvao, setTrocaCarvao] = useState<boolean>(false);
    const [retroLavagem, setRetroLavagem] = useState<boolean>(false);
    const { createColunasCarvaoMeasure, isCreated, isError, resetState } = useColunasCarvaoStore();

    const handleBooleanChange = (event: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(event.target.value === "Sim");
    };    

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

    const sendInformation = () => {
        const obj: COLUNAS_CARVAO ={
            houve_retrolavagem: retroLavagem,
            houve_troca_carvao: trocaCarvao,
            pressao_c01: pressure_c01,
            pressao_c02: pressure_c02,
            pressao_c03: pressure_c03,
            pressao_saida: outletPressure,
            nomePonto: name,
            idColeta: 1
        }
        createColunasCarvaoMeasure(obj);
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
                        decrement={() => decrement(setPressure_c01, false)}
                        increment={() => increment(setPressure_c01, false)}
                        handleChange={(e) => handleChangeNumber(e, setPressure_c01)}
                        valor={pressure_c01}
                        titulo="Pressão C01"
                        isInteger={false}
                    />
                    <InputPoint
                        decrement={() => decrement(setPressure_c02, false)}
                        increment={() => increment(setPressure_c02, false)}
                        handleChange={(e) => handleChangeNumber(e, setPressure_c02)}
                        valor={pressure_c02}
                        titulo="Pressão C02"
                        isInteger={false}
                    />
                    <InputPoint
                        decrement={() => decrement(setPressure_c03, false)}
                        increment={() => increment(setPressure_c03, false)}
                        handleChange={(e) => handleChangeNumber(e, setPressure_c03)}
                        valor={pressure_c03}
                        titulo="Pressão C03"
                        isInteger={false}
                    />
                    <InputPoint
                        decrement={() => decrement(setOutletPressure, false)}
                        increment={() => increment(setOutletPressure, false)}
                        handleChange={(e) => handleChangeNumber(e, setOutletPressure)}
                        valor={outletPressure}
                        titulo="Pressão de Saída"
                        isInteger={false}
                    />
                    <BooleanInput
                        handleChange={(e) => handleBooleanChange(e, setTrocaCarvao)}
                        valor={trocaCarvao}
                        titulo="Houve troca de carvão?"
                    />
                    <BooleanInput
                        handleChange={(e) => handleBooleanChange(e, setRetroLavagem)}
                        valor={retroLavagem }
                        titulo="Houve retrolavagem?"
                    />
                </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default ColunasCarvaoCard;