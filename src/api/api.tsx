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

export const fetchExport = async () => {
    try {
        const token = localStorage.getItem("id_token")
        const response = await axios.get(`${API_BASE_URL}/exportExcel`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: "blob"
            
        });
        return response.data;

    } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
        throw error;
    }
};

// Get Planilhas

export const fetchSheet = async (sheetName: string) => {
    try {
        const token = localStorage.getItem("id_token")
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

// Get coletas by data (historico)
export const fetchColetasByData = async (token: string, paramsData: { startDate?: string; endDate?: string }) => {
    try {
        const response = await axios.get("http://localhost:5173/coleta/get-by-date", {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: paramsData
          });
          return response.data;
         
    } catch (e) {
    console.log(e);
  }
}

// Get point by Sheet

export const fetchPointBySheet = async (sheetName: string) => {
    try {
        const token = localStorage.getItem("id_token")
        const response = await axios.get(`${API_BASE_URL}/ponto/excel/${sheetName}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        console.error("Erro ao buscar os pontos", error);
        throw error;
    }
};

// Get notificacoes

export const fetchNotif = async () => {
    try {
        const token = localStorage.getItem("id_token")
        const response = await axios.get(`${API_BASE_URL}/notificacoes/getNotif`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar notificações.");
        throw error;
    }
}; // esse ainda nao funciona 

// Post notificacoes

export const postNotif = async (planilha: string | null, tipo: string) => {
    try {

        const token = localStorage.getItem("id_token")
        const response = await axios.post(`${API_BASE_URL}/notificacoes/postNotif`,
            {
                tabela: planilha,
                tipo: tipo
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
    } catch (error) {
        console.error("Erro ao enviar o formulário.");
        throw error; 
    }

};   // esse funciona