import { create } from "zustand";
import { updatePontoStatus } from "../services/PontoService"; 

export enum STATUS_OPT {
  COLETADO,
  NAO_COLETADO,
  INATIVO,
}

interface PontoState {
  setStatus: (name: string, status: string) => Promise<void>;
  status: STATUS_OPT;
}

const usePontoState = create<PontoState>((set) => ({
  status: STATUS_OPT.NAO_COLETADO, 

  setStatus: async (name: string, status: string) => {
    try {
      await updatePontoStatus(name, status); 

      set({ 
        status: STATUS_OPT.COLETADO 
      }); 

    } catch (error) {
      console.error("Erro ao atualizar status:", error);

      set({
        status: STATUS_OPT.NAO_COLETADO
      }); 
    }
  },
}));


export default usePontoState;
