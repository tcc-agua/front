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
export const fetchExport = async (startDate: string, endDate: string, endpoint: string) => {
    try {
        const token = localStorage.getItem("id_token");

        const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
        const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');

        const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
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
export const fetchSheet = async (sheetName: string, startDate: string, endDate: string) => {
    try {
        const token = localStorage.getItem("id_token")
        const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
        const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');

        const endpoint = sheetName === 'CA' ? `${API_BASE_URL}/excel/${sheetName}/hidrometro` : `${API_BASE_URL}/excel/${sheetName}`;

        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { startDate: formattedStartDate, endDate: formattedEndDate },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os dados da planilha:", error);
        throw error;
    }
};

// Get coletas by data (historico)
export const fetchColetasByData = async (paramsData: { startDate?: string; endDate?: string; page?: number; size?: number }) => {
    try {
        const token = localStorage.getItem("id_token");        
        if (!paramsData.startDate) {
            throw new Error("startDate é obrigatório");
        }
        if (paramsData.endDate && new Date(paramsData.endDate) < new Date(paramsData.startDate)) {
            throw new Error("endDate deve ser maior ou igual a startDate");
        }
        const response = await axios.get("http://localhost:5173/coleta/get-by-date", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                startDate: paramsData.startDate,
                endDate: paramsData.endDate,
                page: paramsData.page || 0,
                size: paramsData.size || 6  
            }
        });
        if (!response.data || !response.data.content) {
            throw new Error("Formato de resposta inválido");
        }
        return {
            page: response.data.page,      
            content: response.data.content 
        };

    } catch (e) {
        console.error("Erro ao buscar coletas por data:", e);
        throw e; 
    }
}

// const resultado = await fetchColetasByData({
//     startDate: "2024-09-19", 
//     endDate: "2024-09-24", 
//     page: 1,
//     size: 6
// });
// console.log(resultado.page);    
// console.log(resultado.content);

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
        const response = await axios.get(`${API_BASE_URL}/notificacoes`, {
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
        const response = await axios.post(`${API_BASE_URL}/notificacoes`,
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
        const response = await axios.get(`${API_BASE_URL}/sensor-ph`, 
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
        const response = await axios.get(`${API_BASE_URL}/tq01`, 
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


//get hidrometro by ponto
export const fetchHidrometro = async (ponto: string, year: string) => {
    const token = await waitForToken();
    try {
        const StartDate = `${year}-01-01`;
        const EndDate = `${year}-12-25`;
        const FormattedStartDate = dayjs(StartDate).format('YYYY-MM-DD')
        const FormattedEndDate = dayjs(EndDate).format('YYYY-MM-DD')
        const response = await axios.get(`${API_BASE_URL}/hidrometro/ponto/${ponto}`,
            {
                params: {
                    startDate: FormattedStartDate,
                    endDate: FormattedEndDate
                },           
            
                headers: {
                    Authorization: `Bearer ${token}`
                },
                
            });
            return response.data;
         } catch (error) {
            console.error("Erro ao encontrar os dados do hidrômetro")
            console.error(error)
            throw error
         }
};
