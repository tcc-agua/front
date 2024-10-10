import styles from "../../../pages/PointCollect/PointCollect.module.css";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { BooleanInput, InputPoint } from "../InputPoint";
import useTq04Tq05Store from "../../../store/Tq04Tq05Store";
import { TQ04_TQ05 } from "../../../interfaces/postParams";
import usePontoState from "../../../store/PontoStore";

const itemsPerPage = 2; // Define the number of items to show per page

interface PointNameProps {
    name: string;
    idColeta: number;
}

// Define um tipo que representa os setters para diferentes tipos de estado
type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

interface InfoContentData {
    key: string;
    title: string;
    value: number | string;
    isInteger?: boolean;
    isBoolean?: boolean;
    setter: Setter<number> | Setter<boolean>; // Define o setter como um tipo de união
}

function Tq04Tq05Card({ name, idColeta }: PointNameProps) {
    const { setStatus } = usePontoState();
    const [kgBombonas, setKgBombonas] = useState<number>(1);
    const [qtdBombonas, setQtdBombonas] = useState<number>(1);
    const [horimeter, setHorimeter] = useState<number>(1);
    const [hidrometer, setHidrometer] = useState<number>(1);
    const [preparoSolucao, setPreparoSolucao] = useState<boolean>(false);
    const { createTq04Tq05Measure, isCreated, isError, resetState } = useTq04Tq05Store();
    
    const [currentIndex, setCurrentIndex] = useState(0); // State for current index

    const increment = (setter: Setter<number>, isInteger?: boolean) => {
        setter(prev => isInteger ? prev + 1 : Math.round((prev + 0.1) * 10) / 10);
    };
    
    const decrement = (setter: Setter<number>, isInteger?: boolean) => {
        setter(prev => isInteger ? Math.max(prev - 1, 0) : Math.max(Math.round((prev - 0.1) * 10) / 10, 0));
    };

    const handleBooleanChange = (event: React.ChangeEvent<HTMLSelectElement>, setter: Setter<boolean>) => {
        setter(event.target.value === "Sim");
    };    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setter: Setter<number>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setter(value);
        }
    };

    const sendInformation = () => {
        const obj: TQ04_TQ05 = {
            qtd_bombonas: qtdBombonas,
            kg_bombonas: kgBombonas,
            hidrometro: hidrometer,
            horimetro: horimeter,
            houve_preparo_solucao: preparoSolucao,
            nomePonto: name,
            idColeta: idColeta
        };
        createTq04Tq05Measure(obj);
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
            setStatus(name, "NAO_COLETADO");
            resetState();
        }
    }, [isCreated, resetState, isError, name, setStatus]);

    // Data to be displayed in the modal
    const infoContentData: InfoContentData[] = [
        { key: 'qtdBombonas', title: "Qtd Bombonas", value: qtdBombonas, isInteger: true, setter: setQtdBombonas },
        { key: 'kgBombonas', title: "Kg Bombonas", value: kgBombonas, isInteger: false, setter: setKgBombonas },
        { key: 'horimeter', title: "Horímetro", value: horimeter, isInteger: false, setter: setHorimeter },
        { key: 'hidrometer', title: "Hidrometro", value: hidrometer, isInteger: false, setter: setHidrometer },
        { key: 'preparoSolucao', title: "Houve Preparo Solução?", value: preparoSolucao ? "Sim" : "Não", isBoolean: true, setter: setPreparoSolucao }
    ];

    // Navigation functions
    const nextPage = () => {
        if (currentIndex + itemsPerPage < infoContentData.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const prevPage = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    return (
        <>
            <p className={styles.pointName}>Dados de coleta do ponto '{name}'</p>
            <main className={styles.infoContainer}>
                <div className={styles.infoGrid}>
                    {infoContentData.slice(currentIndex, currentIndex + itemsPerPage).map((item, index) => (
                        item.isBoolean ? (
                            <BooleanInput
                                key={index}
                                handleChange={(e) => handleBooleanChange(e, item.setter as Setter<boolean>)} // Cast para Setter<boolean>
                                valor={item.value as unknown as boolean}
                                titulo={item.title}
                            />
                        ) : (
                            <InputPoint
                                key={index}
                                decrement={() => decrement(item.setter as Setter<number>, item.isInteger)} // Cast para Setter<number>
                                increment={() => increment(item.setter as Setter<number>, item.isInteger)} // Cast para Setter<number>
                                handleChange={(e) => handleChange(e, item.setter as Setter<number>)} // Cast para Setter<number>
                                valor={item.value as number}
                                titulo={item.title}
                                isInteger={item.isInteger}
                            />
                        )
                    ))}
                </div>
                <div className={styles.button_container_modal}>
                    <button
                        className={styles.arrow_modal}
                        onClick={prevPage}
                        disabled={currentIndex === 0}
                    >
                        &lt;
                    </button>
                    <button
                        className={styles.arrow_modal}
                        onClick={nextPage}
                        disabled={currentIndex + itemsPerPage >= infoContentData.length}
                    >
                        &gt;
                    </button>
                </div>
                <button className={styles.buttonEnviar} onClick={sendInformation}>Enviar</button>
            </main>
        </>
    );
}

export default Tq04Tq05Card;
