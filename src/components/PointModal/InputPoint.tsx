import styles from "../../pages/PointCollect/PointCollect.module.css"
import ArrowUp from '../../assets/images/arrow-up.svg';
import ArrowDown from '../../assets/images/arrow-down.svg';


export interface DropdownProps {
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    titulo: string;
    valor: string;
    opcoes: string[];
  }
  interface InputPointProps{
    titulo: string;
    valor: number;
    increment: () => void;
    decrement: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isInteger?: boolean;  
}

export function InputPoint({ decrement, handleChange, increment, titulo, valor, isInteger }: InputPointProps) {

    return (
        <div className={styles.infoContent}>
            <p className={styles.type}>{titulo}</p>
            <div className={styles.information}>
                <button className={styles.arrow} onClick={increment}>
                    <img src={ArrowUp} alt="Arrow Up" />
                </button>
                <input
                    type="number"
                    value={isInteger ? valor.toFixed(0) : valor.toFixed(1)}  
                    onChange={handleChange}
                    step={isInteger ? 1 : 0.1}  
                    min="0"
                    className={styles.numberInput}
                />
                <button className={styles.arrow} onClick={decrement}>
                    <img src={ArrowDown} alt="Arrow Down" />
                </button>
            </div>
        </div>
    );
}

export function DropdownInput({ handleChange, titulo, valor, opcoes }: DropdownProps) {
  return (
    <div className={styles.infoContent}>
      <p className={styles.type}>{titulo}</p>
      <div className={styles.information}>
        <select 
          value={valor} 
          onChange={handleChange} 
          className={styles.dropdownInput}
        >
          {opcoes.map((opcao, index) => (
            <option key={index} value={opcao}>
              {opcao}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
