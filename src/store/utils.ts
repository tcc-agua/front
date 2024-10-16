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

            const data = new Date();

            const expiresAt = new Date(data.getTime() + 3600000);

            localStorage.setItem("id_token", response.id_token);
            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("data_token", data.toString());
            localStorage.setItem("expires_at", expiresAt.toString())

            if(localStorage.getItem("id_token") != null){
                set({
                    token: response.id_token,
                })
            }
        } catch (error) {
            throw new Error("Erro");
        }
    },

    isTokenExpired: () => {
        const idToken = localStorage.getItem("id_token");

        if(!idToken){
            return true;
        }

        const currentTime = new Date();

        const expiresAtString = localStorage.getItem("expires_at")

        if(expiresAtString !== null){
            const expiresAt = new Date(expiresAtString);

            const isExpired = currentTime > expiresAt; // se o tempo atual for maior que o tempo armazenado no expiresAt, o token está expirado.
    
            console.log(`Token expirado: ${isExpired}`)
    
            if(isExpired) {
                localStorage.removeItem("id_token");
                localStorage.removeItem("access_token");
                localStorage.removeItem("expires_at");
            }
            return isExpired;
        }
        return true; // Caso não haja expires_at, considere como expirado
    }
}));



export default useUtilsStore;
