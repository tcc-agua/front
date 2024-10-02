import styles from './Initial.module.css';
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import { Main } from '../../components/Main/Main';
import React, { useEffect } from 'react';
import useUtilsStore from '../../store/utils';

const Initial: React.FC = () => {
    const { getTokenInfo } = useUtilsStore();
    const token = localStorage.getItem('id_token');

    useEffect(() => {
        const fetchTokenInfo = async () => {
            try {
                await getTokenInfo();
            } catch (error) {
                console.error('Erro ao obter informações do token:', error);
            }
        };

        fetchTokenInfo();
    }, [getTokenInfo]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className={styles.grid_container}>
            <Sidebar />
            <Navbar />
            <Main>
                <Outlet />
            </Main>
        </div>
    );
}

export default Initial;