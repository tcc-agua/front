import styles from './Initial.module.css';
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom"; // Importando useLocation
import { Main } from '../../components/Main/Main';
import React, { useEffect } from 'react';
import useUtilsStore from '../../store/utils';
import PrivateRoute from '../../routes/PrivateRoute';

const Initial: React.FC = () => {

    const { getTokenInfo } = useUtilsStore();

    useEffect(() => {
        getTokenInfo();
    }, [getTokenInfo]);

    return (
        <div className={styles.grid_container}>
            <Sidebar />
            <Navbar />
            <Main>
                <PrivateRoute>
                    <Outlet />
                </PrivateRoute>
            </Main>
        </div>
    );
}

export default Initial;
