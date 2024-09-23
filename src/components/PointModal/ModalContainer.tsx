import { ReactNode } from 'react';
import styles from "../../pages/PointCollect/PointCollect.module.css"


interface ModalContainerProps{
    children: ReactNode;
    closeModal: () => void;

}

export default function ModalContainer({children, closeModal}:ModalContainerProps){
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button className={styles.close} onClick={closeModal}>x</button>
                    {children}
            </div>
        </div>
    )
}