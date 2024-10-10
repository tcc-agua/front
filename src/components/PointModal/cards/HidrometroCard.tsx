import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { InputPoint } from "../InputPoint";
import useHidrometroStore from "../../../store/HidrometroStore";
import { HIDROMETRO } from "../../../interfaces/postParams";
import usePontoState from "../../../store/PontoStore";

interface PointNameProps{
    name: string;
    idColeta: number;
}

function HidrometroCard({ name, idColeta }: PointNameProps) {
    const { setStatus } = usePontoState();
    const [volume, setVolume] = useState<number>(1);
    const { createHidrometroMeasure, isCreated, isError, resetState } = useHidrometroStore();

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
        const obj: HIDROMETRO = {
            volume: volume,

            nomePonto: name,
            idColeta: idColeta
        }
        createHidrometroMeasure(obj);
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
            setStatus(name, "COLETADO");
        }
        if (isError) {
            Swal.fire({
                title: 'Erro ao criar',
                icon: 'error',
                text: 'Ocorreu um erro durante a criação. Tente novamente!',
            });
            resetState();
            setStatus(name, "NAO_COLETADO");
        }
    }, [isCreated, resetState, isError, name, setStatus]);

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div>
                    <InputPoint
                        decrement={() => decrement(setVolume)}
                        increment={() => increment(setVolume)}
                        handleChange={(e) => handleChange(e, setVolume)}
                        valor={volume}
                        titulo="Pressão"
                        isInteger={false}
                    />
                </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default HidrometroCard;