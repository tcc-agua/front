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
    }
}));



export default useUtilsStore;
