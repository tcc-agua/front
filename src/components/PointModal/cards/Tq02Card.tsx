import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useState } from "react";
import Swal from 'sweetalert2';
import { InputPoint } from "../InputPoint";
import useTq02Store from "../../../store/Tq02Store";
import { TQ02 } from "../../../interfaces/postParams";
import usePontoState from "../../../store/PontoStore";
import useUtilsStore from "../../../store/utils";

interface PointNameProps{
    name: string;
    idColeta: number;
}

function Tq02Card({ name, idColeta,  }: PointNameProps) {
    const { setStatus } = usePontoState();
    const [ph, setPh] = useState<number>(1);
    const [lt_02_1, setLt_02_1] = useState<number>(1);
    const { createTq02Measure } = useTq02Store();
    const { fetchPoints } = useUtilsStore();


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

    const sendInformation = async () => {
        const obj: TQ02 = {
            sensor_ph: ph,
            Lt_02_1: lt_02_1,
            nomePonto: name,
            idColeta: idColeta
        }
        try{
            await createTq02Measure(obj);
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Medida enviada com sucesso!',
                showConfirmButton: false,
                timer: 2000,
                width: getModalWidth(),
                customClass: {
                    popup: 'custom-swal-popup', 
                },
            });
    
            setStatus(name, 'COLETADO');
            fetchPoints();
        }
        catch(error){
            console.error("Erro ao enviar medida:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao enviar a medida.',
                showConfirmButton: false,
                timer: 2000,
                width: getModalWidth(),
                customClass: {
                    popup: 'custom-swal-popup', 
                },
            });
        }
        fetchPoints();
    };

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div className={styles.infoGrid}>
                <InputPoint
                    decrement={() => decrement(setPh, false)}
                    increment={() => increment(setPh, false)}
                    handleChange={(e) => handleChangeNumber(e, setPh)}
                    valor={ph}
                    titulo="Sensor PH"
                    isInteger={false}
                />
                <InputPoint
                    decrement={() => decrement(setLt_02_1, false)}
                    increment={() => increment(setLt_02_1, false)}
                    handleChange={(e) => handleChangeNumber(e, setLt_02_1)}
                    valor={lt_02_1}
                    titulo="Lt 02 1"
                    isInteger={false}
                />
                </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default Tq02Card;
