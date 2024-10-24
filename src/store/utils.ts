import { create } from 'zustand';
import { fetchPointBySheet, fetchUserInfo } from '../api/api';
import { GlobalState } from '../interfaces/auth';
import { Point } from '../pages/PointCollect/PointNames';

interface UtilState{
    token: string | null;
    planilha: string | null;
    setPlanilha: (value: string) => void;

    qtdPontos: number | 0;
    setQtdPontos: (value: number) => void;

    getTokenInfo: () => Promise <void>;

    isTokenExpired: () => boolean;

    setDataToken: () => void;

    fetchPoints: () => void;

    resetState: () => void;


    etasResponse: Point[] | [];
    naResponse: Point[] | [];
    pbResponse: Point[] | [];

    isUpdated: boolean;
}

const useUtilsStore = create<UtilState>((set) => ({
    qtdPontos: 0,
    planilha: null,
    token: null,
    isUpdated: false,
    etasResponse: [],
    naResponse: [],
    pbResponse: [],

    setPlanilha: (value) => {
        set({
            planilha: value 
        })
    },

    resetState: () =>{
        set({
            isUpdated: false
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

        if(!localStorage.getItem("expires_at")){
            const data = new Date();
            // const expiresAt = new Date(data.getTime() + 3600000); // 1 hora
            const expiresAt = new Date(data.getTime() + 120000);
        
            localStorage.setItem("data_token", data.toString());
            localStorage.setItem("expires_at", expiresAt.toString());
        
            console.log(`Token configurado para expirar em: ${expiresAt}`);
        }
    },

    fetchPoints: async () => {
        try {
            const [etasResponse, naResponse, pbResponse]:Point[][] = await Promise.all([
                fetchPointBySheet("DADOS ETAS"),
                fetchPointBySheet("NA"),
                fetchPointBySheet("PBS"),
            ]);
            console.log("Executou bigodera")
            set({
                etasResponse,
                naResponse,
                pbResponse,
                isUpdated: true
            })

        } catch (error) {
            console.error("Erro ao buscar pontos:", error);
            throw new Error("Falha ao buscar pontos");
        }
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
                document.cookie = "SESSION" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            return isExpired;
        }
        return true;  // Considere expirado se não houver expires_at
    }
}));



export default useUtilsStore;