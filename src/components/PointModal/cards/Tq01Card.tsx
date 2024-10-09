import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { InputPoint } from "../InputPoint";
import useTq01Store from "../../../store/Tq01Store";
import { TQ01 } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string;
    idColeta: number
}

function Tq01Card({ name, idColeta }: PointNameProps) {
    const [nivel, setNivel] = useState<number>(1);
    const { createTq01Measure, isCreated, isError, resetState } = useTq01Store();

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
        const obj: TQ01 = {
            nivel: nivel,
            nomePonto: name,
            idColeta: idColeta
        }
        createTq01Measure(obj);
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
        }
        if (isError) {
            Swal.fire({
                title: 'Erro ao criar',
                icon: 'error',
                text: 'Ocorreu um erro durante a criação. Tente novamente!',
            });
        }
    }, [isCreated, resetState, isError]);
    
    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div className={styles.infoGrid}>
                <InputPoint
                    decrement={() => decrement(setNivel, false)}
                    increment={() => increment(setNivel, false)}
                    handleChange={(e) => handleChangeNumber(e, setNivel)}
                    valor={nivel}
                    titulo="Nivel"
                    isInteger={false}
                />
                </div>
                
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default Tq01Card;
