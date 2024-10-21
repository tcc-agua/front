import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useEffect, useState, useCallback } from "react";
import Swal from 'sweetalert2';
import { InputPoint } from "../InputPoint";
import useHidrometroStore from "../../../store/HidrometroStore";
import { HIDROMETRO } from "../../../interfaces/postParams";
import usePontoState from "../../../store/PontoStore";

interface PointNameProps {
    name: string;
    idColeta: number;
}

function HidrometroCard({ name, idColeta }: PointNameProps) {
    const { setStatus } = usePontoState();
    const { createHidrometroMeasure, isCreated, isError, resetState } = useHidrometroStore();
    const [volume, setVolume] = useState<number>(1);

    const increment = useCallback((isInteger: boolean) => {
        setVolume(prev =>
            isInteger ? prev + 1 : parseFloat((prev + 0.1).toFixed(1))
        );
    }, []);

    const decrement = useCallback((isInteger: boolean) => {
        setVolume(prev =>
            isInteger ? Math.max(prev - 1, 0) : Math.max(parseFloat((prev - 0.1).toFixed(1)), 0)
        );
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setVolume(value);
        }
    };

    const sendInformation = () => {
        const obj: HIDROMETRO = {
            volume: volume,
            nomePonto: name,
            idColeta: idColeta,
        };
        createHidrometroMeasure(obj);
    };

    useEffect(() => {
        const getModalWidth = () => {
            const width = window.innerWidth;
            if (width <= 540) return '95%';
            if (width <= 680) return '90%';
            if (width <= 750) return '85%';
            if (width <= 865) return '75%';
            if (width <= 1300) return '40%';
            if (width <= 1500) return '30%';
            return '30%';
        };

        if (isCreated) {
            Swal.fire({
                title: 'Sucesso!',
                icon: 'success',
                text: 'Coleta inserida com sucesso!',
                showConfirmButton: false,
                timer: 2000,
                width: getModalWidth(),
                customClass: {
                    popup: 'custom-swal-popup',
                },
            });
            resetState();
            setStatus(name, "COLETADO");
        }

        if (isError) {
            Swal.fire({
                title: 'Erro ao criar',
                icon: 'error',
                text: 'Ocorreu um erro durante a criação. Tente novamente!',
                width: getModalWidth(),
                customClass: {
                    popup: 'custom-swal-popup',
                },
            });
            resetState();
            setStatus(name, "NAO_COLETADO");
        }
    }, [isCreated, resetState, isError, name, setStatus]);

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div className={styles.infoGrid}>
                    <InputPoint
                        decrement={() => decrement(false)}
                        increment={() => increment(false)}
                        handleChange={handleChange}
                        valor={volume}
                        titulo="Volume"
                        isInteger={false}
                    />
                </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default HidrometroCard;
