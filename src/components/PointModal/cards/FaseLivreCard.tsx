import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { BooleanInput, InputPoint } from "../InputPoint";
import useFaseLivreStore from "../../../store/FaseLivreStore";
import { FASE_LIVRE } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string;
    idColeta: number;
    preencher: (pointName: string) => void;
}

function FaseLivreCard({ name, idColeta, preencher }: PointNameProps) {
    const [volume, setVolume] = useState<number>(1);
    const [houveTroca, setHouveTroca] = useState<boolean>(false);
    const { createFaseLivreMeasure, isCreated, isError, resetState } = useFaseLivreStore();

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
        const obj: FASE_LIVRE ={
            houve_troca: houveTroca,
            volume: volume,
            nomePonto: name,
            idColeta: idColeta
        }
        createFaseLivreMeasure(obj);
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
        }
    }, [isCreated, resetState, isError, preencher, name]);

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div className={styles.infoGrid}>
                    <InputPoint
                        decrement={() => decrement(setVolume, false)}
                        increment={() => increment(setVolume, false)}
                        handleChange={(e) => handleChange(e, setVolume)}
                        valor={volume}
                        titulo="Volume"
                        isInteger={false}
                    />
                    <BooleanInput
                        handleChange={(e) => handleBooleanChange(e, setHouveTroca)}
                        valor={houveTroca}
                        titulo="Houve Troca?"
                    />
                </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default FaseLivreCard;