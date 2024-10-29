import React from 'react';
import styles from './UserModal.module.css';

interface UserModalProps {
    name: string | undefined;
    onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ name, onClose }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <p className={styles.name}>{name}</p>
                <p className={styles.email}>felipinho.ribas@bosch.com</p>
            </div>
        </div>
    );
};
