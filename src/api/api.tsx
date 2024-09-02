import axios from 'axios';
import { API_BASE_URL } from './config';

// Get userInfo

export const fetchUserInfo = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/userinfo`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
        throw error;
    }
};

// Exportar Excel

export const fetchExport = async (token: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/exportExcel`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
        throw error;
    }
};

// Get Planilhas

export const fetchSheet = async (token: string, sheetName: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/exportExcel/data/${sheetName}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os dados da planilha:", error);
        throw error;
    }
};
