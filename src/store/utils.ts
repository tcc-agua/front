import { create } from 'zustand';
import { fetchUserInfo } from '../api/api';
import { GlobalState } from '../interfaces/auth';

interface UtilState{
    token: string | null;
    planilha: string | null;
    setPlanilha: (value: string) => void;

    qtdPontos: number | 0;
    setQtdPontos: (value: number) => void;

    getTokenInfo: () => Promise <void>;

    isTokenExpired: () => boolean;

    setDataToken: () => void;
}

const useUtilsStore = create<UtilState>((set) => ({
    qtdPontos: 0,
    planilha: null,
    token: null,

    setPlanilha: (value) => {
        set({
            planilha: value 
        })
    },

    setQtdPontos: (value) => {
        set({
            qtdPontos: value
        })
    },

    getTokenInfo: async () => {
        try {
            const response: GlobalState = await fetchUserInfo();

            console.log(response.id_token)

            localStorage.setItem("id_token", response.id_token);
            localStorage.setItem("access_token", response.access_token);

            if(localStorage.getItem("id_token") != null){
                set({
                    token: response.id_token,
                })
            }
        } catch (error) {
            throw new Error("Erro");
        }
    },

    setDataToken: () => {
        const data = new Date();
        const expiresAt = new Date(data.getTime() + 3600000); // 1 hora
    
        localStorage.setItem("data_token", data.toString());
        localStorage.setItem("expires_at", expiresAt.toString());
    
        console.log(`Token configurado para expirar em: ${expiresAt}`);
    },

    isTokenExpired: () => {
        const idToken = localStorage.getItem("id_token");
        
        if (!idToken) {
            return true;
        }
        
        const currentTime = Date.now();
        const expiresAtString = localStorage.getItem("expires_at");
        
        if (expiresAtString !== null) {
            const expiresAt = new Date(expiresAtString).getTime();
            const isExpired = currentTime > expiresAt;
    
            console.log(`Token expirado: ${isExpired}`);
        
            if (isExpired) {
                localStorage.clear();  // Remove tudo relacionado ao token de uma vez
            }
            return isExpired;
        }
        return true;  // Considere expirado se não houver expires_at
    }
}));



export default useUtilsStore;
