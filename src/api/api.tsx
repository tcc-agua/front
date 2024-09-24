import axios from 'axios';
import { API_BASE_URL } from './config';
import dayjs from 'dayjs';

const waitForToken = (): Promise<string> => {
    return new Promise((resolve) => {
        const checkToken = () => {
            const token = localStorage.getItem("id_token");
            if (token) {
                resolve(token); 
            } else {
                setTimeout(checkToken, 100); 
            }
        };
        checkToken(); 
    });
};


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

export const fetchExport = async (startDate: string, endDate: string) => {
    try {
        const token = localStorage.getItem("id_token");

        const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
        const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');

        const response = await axios.get(`${API_BASE_URL}/exportExcel`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
            params: { startDate: formattedStartDate, endDate: formattedEndDate }, // Adiciona os parâmetros
            responseType: "blob" // Define o tipo de resposta como blob
        });
        return response.data; // Retorna o Blob
    } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
        throw error;
    }
};

// Get Planilhas

export const fetchSheet = async (sheetName: string) => {
    try {
        const token = localStorage.getItem("id_token")
        const response = await axios.get(`${API_BASE_URL}/excel/${sheetName}`, {
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
export const fetchColetasByData = async (paramsData: { startDate?: string; endDate?: string }) => {
    try {
        const token = localStorage.getItem("id_token")
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
    const token = await waitForToken();
    try {
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
}; // esse funciona 

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

// get PH
export const fetchPH = async () => {
    const token = await waitForToken();
    try {
        const response = await axios.get(`${API_BASE_URL}/sensor-ph/get-ph`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data;
    } catch (error) {
        console.error("Erro ao encontrar os dados de 'Sensor PH'");
        throw error

    }
};

//GET nivel tq01
export const fetchTQ01 = async () => {
    const token = await waitForToken();
    try {
        const response = await axios.get(`${API_BASE_URL}/TQ01/get`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data;
    } catch (error) {
        console.error("Erro ao encontrar os dados de 'TQ01'");
        throw error

    }
};

