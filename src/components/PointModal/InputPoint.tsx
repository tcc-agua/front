import styles from "../../pages/PointCollect/PointCollect.module.css"
import ArrowUp from '../../assets/images/arrow-up.svg';
import ArrowDown from '../../assets/images/arrow-down.svg';

interface InputPointProps{
    titulo: string;
    valor: number;
    increment: () => void;
    decrement: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputPoint({ decrement, handleChange, increment, titulo, valor} : InputPointProps){

    return (
                <div className={styles.infoContent}>
                    <p className={styles.type}>{titulo}</p>
                    <div className={styles.information}>
                        <button className={styles.arrow} onClick={increment}><img src={ArrowUp} alt="Arrow Up" /></button>
                        <input
                            type="number"
                            value={valor.toFixed(1)}
                            onChange={handleChange}
                            step="0.1"
                            min="0"
                            className={styles.numberInput}
                        />
                    <button className={styles.arrow} onClick={decrement}><img src={ArrowDown} alt="Arrow Down" /></button>
                </div>
            </div>
        )
}