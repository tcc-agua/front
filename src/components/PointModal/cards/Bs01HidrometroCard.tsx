import styles from "../../../pages/PointCollect/PointCollect.module.css"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { InputPoint } from "../InputPoint";
import useBs01HidrometroStore from "../../../store/Bs01HidrometroStore";
import { BS01_HIDROMETRO } from "../../../interfaces/postParams";

interface PointNameProps{
    name: string;
    idColeta: number;
}

function Bs01HidrometroCard({ name , idColeta}:PointNameProps ) {
    const [volume, setVolume] = useState<number>(1);
    const { createBs01HidrometroMeasure, isCreated, isError, resetState } = useBs01HidrometroStore();

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

        const obj: BS01_HIDROMETRO = {
            volume: volume,
            nomePonto: name,
            idColeta: idColeta
        }

        createBs01HidrometroMeasure(obj);

    };
    
    useEffect (() =>{
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
            resetState();
        }

    }, [isCreated, resetState, isError, name])

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div className={styles.infoGrid}>
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

export default Bs01HidrometroCard;
