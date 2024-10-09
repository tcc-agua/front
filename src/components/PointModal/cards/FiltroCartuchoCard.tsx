import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { InputPoint } from "../InputPoint";
import useFiltroCartuchoStore from "../../../store/FiltroCartuchoStore";
import { FILTRO_CARTUCHO } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string;
    idColeta: number;
    preencher: (pointName: string) => void;

}

function FiltroCartuchoCard({ name, idColeta, preencher }:PointNameProps) {
    const [outletPressure, setOutletPressure] = useState<number>(1);
    const [inletPressure, setInletPressure] = useState<number>(1);
    const { createFiltroCartuchoMeasure, isCreated, isError, resetState } = useFiltroCartuchoStore();

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
        const obj: FILTRO_CARTUCHO = {
            pressao_saida: outletPressure,
            pressao_entrada: inletPressure,
            nomePonto: name,
            idColeta: idColeta
        }
        createFiltroCartuchoMeasure(obj);
    };

    useEffect(() => {
        if (isCreated) {
            Swal.fire({
                title: 'Sucesso!',
                icon: 'success',
                text: 'Coleta inserida com sucesso!',
                showConfirmButton: false,
                timer: 2000,
                width: '30%'
            });
            resetState();
            preencher(name);
        }
        if (isError) {
            Swal.fire({
                title: 'Erro ao criar',
                icon: 'error',
                text: 'Ocorreu um erro durante a criação. Tente novamente!',
            });
            resetState();
        }
    }, [isCreated, resetState, isError, name, preencher]);

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div className={styles.infoGrid}>
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
                </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default FiltroCartuchoCard;