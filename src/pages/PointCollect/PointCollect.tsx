import React, { useState } from "react";
import styles from './PointCollect.module.css'
import ArrowUp from '../../assets/images/arrow-up.svg'
import ArrowDown from '../../assets/images/arrow-down.svg'


export function PointCollect(){
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedPoint, setSelectedPoint] = useState<string>('');
    const [numberValue, setNumberValue] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const openModal = (point: string) => {
        setSelectedPoint(point);
        setModalOpen(true);
        setErrorMessage('');
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedPoint('');
        setErrorMessage('');
    };

    const incrementValue = () => {
        setNumberValue(prev => Math.round((prev + 0.1) * 10) / 10);
    };

    const decrementValue = () => {
        setNumberValue(prev => (prev > 0 ? Math.round((prev - 0.1) * 10) / 10 : 0));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setNumberValue(value);
        }
    };

    const handleEnviar = () => {
        if (numberValue > 3.0) {
            setErrorMessage('Este dado não corresponde ');
        } else {
            console.log("Dados enviados");
            closeModal();
        }
    };

    return(
        <>
        <main className={styles.container}>
            <p className={styles.title}>Estações de Tratamento de Águas Subterrâneas</p>
            <div className={styles.main_information}>
                <div className={styles.left_side}>
                    <div className={styles.select_point_container}>
                        <p className={styles.select_point_title}>Selecione um ponto:</p>
                        <div className={styles.select_point_grid}>
                            <button className={styles.select_point} onClick={() => openModal('AG - 02')} >
                                <p className={styles.name_point}><span className={styles.name_point_type}>AG</span> - 02</p>
                                <pre className={styles.status_point}>Não preenchido    ⟶</pre>
                            </button>
                            <button className={styles.select_point} onClick={() => openModal('AG - 04')}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>AG</span> - 04</p>
                                <pre className={styles.status_point}>Não preenchido    ⟶</pre>
                            </button>
                            <button className={styles.select_point} onClick={() => openModal('AG - 05')}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>AG</span> - 05</p>
                                <pre className={styles.status_point}>Não preenchido    ⟶</pre>
                            </button>
                            <button className={styles.select_point} onClick={() => openModal('BC - 01')}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>BC</span> - 01</p>
                                <pre className={styles.status_point}>preenchido    ⟶</pre>
                            </button>
                            <button className={styles.select_point} onClick={() => openModal('BH - 02')}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>BH</span> - 02</p>
                                <pre className={styles.status_point}>Não preenchido    ⟶</pre>
                            </button>
                            <button className={styles.select_point} onClick={() => openModal('BS - 01')}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>BS</span> - 01</p>
                                <pre className={styles.status_point}>preenchido    ⟶</pre>
                            </button>
                            <button className={styles.select_point} onClick={() => openModal('BS - 01')}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>BS</span> - 01</p>
                                <pre className={styles.status_point}>preenchido    ⟶</pre>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.right_side}>
                    <div className={styles.point_information}>
                        <p className={styles.point_information_text}>Ainda restam <span className={styles.point_information_number}>22</span> pontos para completar o arquivo ETAS</p>
                    </div>
                    <div className={styles.map_container}>
                        <p className={styles.map_title}>Localize seus pontos no mapa:</p>
                        <div className={styles.map}></div>
                    </div>
                    <div className={styles.button_container}>
                       <button className={styles.button_complete} onClick={() => console.log("Dados enviados")}>Salvar dados</button> 
                    </div>
                    
                </div>
            </div>
        </main>

        {isModalOpen && (
            <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button className={styles.close} onClick={closeModal}>x</button>
                <p className={styles.pointName}>Dados de coleta do ponto {selectedPoint}</p>
                <main className={styles.infoContainer}>
                    <div className={styles.infoContent}>
                        <p className={styles.type}>Pressão</p>
                        <div className={styles.information}>
                            <button className={styles.arrow} onClick={incrementValue}><img src={ArrowUp} alt="Arrow Up" /></button>
                            <input
                                type="number"
                                value={numberValue.toFixed(1)}
                                onChange={handleInputChange}
                                step="0.1"
                                min="0"
                                className={styles.numberInput}
                            />
                            <button className={styles.arrow} onClick={decrementValue}><img src={ArrowDown} alt="Arrow Down" /></button>
                        </div>
                    </div>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    <button className={styles.buttonEnviar} onClick={handleEnviar}>Enviar</button>
                </main>
            </div>
        </div>
        )}

        </>
    )
}