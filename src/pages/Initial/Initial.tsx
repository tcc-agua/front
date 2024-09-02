import styles from './Initial.module.css'
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Main } from '../../components/Main/Main';
import React, { useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:5173";

const Initial: React.FC = () =>{
    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const response = await axios.get(`${API_BASE_URL}/userinfo`);
            const { id_token, access_token } = response.data;
    
            localStorage.setItem("id_token", id_token);
            localStorage.setItem("access_token", access_token);
    
            console.log("Tokens armazenados:", { id_token, access_token });
          } catch (error) {
            console.error("Erro ao buscar informações do usuário:", error);
          }
        };
    
        fetchUserInfo();
      }, []);

      return(
            <div className={styles.grid_container}>
            <Sidebar />
            <Navbar />
            <Main>
                <Outlet />
            </Main>
        </div>
      )
}

export default Initial;