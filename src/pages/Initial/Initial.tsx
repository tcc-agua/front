import styles from './Initial.module.css';
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Main } from '../../components/Main/Main';
import React from 'react';

const Initial: React.FC = () => {

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