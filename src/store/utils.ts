import { create } from 'zustand';
import { fetchColetasByData, fetchPointBySheet, fetchUserInfo } from '../api/api';
import { GlobalState } from '../interfaces/auth';
import { Point } from '../pages/PointCollect/PointNames';
import { calculatePercentageCollected } from '../pages/PointCollect/PointCollectUtils/renderCardInfo';
import { ParamsDataInterface, ResponseColeta } from '../components/Colects/CollectItem';

interface UtilState{
    token: string | null;
    getTokenInfo: () => Promise <void>;
    isTokenExpired: () => boolean;
    setDataToken: () => void;

    planilha: string | null;
    setPlanilha: (value: string) => void;

    qtdPontos: number | 0;
    setQtdPontos: (value: number) => void;

    fetchPoints: () => void;

    etasResponse: Point[] | [];
    naResponse: Point[] | [];
    pbResponse: Point[] | [];
    caResponse: Point[] | [];
    
    etasPercentage: string | "0%";
    naPercentage: string | "0%";
    pbPercentage: string | "0%";
    caPercentage: string | "0%";

    currentPage: number | 0;
    setCurrentPage: (value: number) => void;

    historicContent: ResponseColeta | 0;
    setHistoricContent: (data: ParamsDataInterface) => Promise<ResponseColeta>;
}

const useUtilsStore = create<UtilState>((set) => ({
    qtdPontos: 0,
    planilha: null,
    token: null,
  
    etasResponse: [],
    naResponse: [],
    pbResponse: [],
    caResponse: [],
  
    etasPercentage: "0%",
    naPercentage: "0%",
    pbPercentage: "0%",
    caPercentage: "0%",

    currentPage: 0,

    historicContent:  0,

    setHistoricContent: async (data) => {
      const fetchData = await fetchColetasByData({
          startDate: data.startDate,
          endDate: data.endDate,
          page: data.page,
          size: data.size,
      });
      set({ historicContent: fetchData });
      return fetchData; 
  },
  
    setPlanilha: (value) => {
      set({
        planilha: value 
      });
    },
  
    setQtdPontos: (value) => {
      set({
        qtdPontos: value
      });
    },
  
    getTokenInfo: async () => {
      try {
        const response: GlobalState = await fetchUserInfo();
        localStorage.setItem("id_token", response.id_token);
        localStorage.setItem("access_token", response.access_token);
  
        if(localStorage.getItem("id_token") != null){
          set({
            token: response.id_token,
          });
        }
      } catch (error) {
        throw new Error("Erro");
      }
    },
  
    setDataToken: () => {

        if(!localStorage.getItem("expires_at")){
            const data = new Date();
            const expiresAt = new Date(data.getTime() + 3600000); // 1 hora
            // const expiresAt = new Date(data.getTime() + 120000);
        
            localStorage.setItem("data_token", data.toString());
            localStorage.setItem("expires_at", expiresAt.toString());
        
            console.log(`Token configurado para expirar em: ${expiresAt}`);
        }
    },
  
    fetchPoints: async () => {
      try {
        const [etasResponse, naResponse, pbResponse, caResponse]: Point[][] = await Promise.all([
          fetchPointBySheet("DADOS ETAS"),
          fetchPointBySheet("NA"),
          fetchPointBySheet("PBS"),
          fetchPointBySheet("CA"),
        ]);
  
        const etasPercentage = calculatePercentageCollected(etasResponse);
        const naPercentage = calculatePercentageCollected(naResponse);
        const pbPercentage = calculatePercentageCollected(pbResponse);
        const caPercentage = calculatePercentageCollected(caResponse);
  
        set({
          etasResponse,
          naResponse,
          pbResponse,
          caResponse,

          etasPercentage,
          naPercentage,
          pbPercentage,
          caPercentage,
        });
  
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
                document.cookie = "SESSION" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Tirar o cookie da sessão
            }
            return isExpired;
        }
        return true;  // Considere expirado se não houver expires_at
    },

    setCurrentPage: (value) => {
      set({
        currentPage: value
      });
    }
}));



export default useUtilsStore;