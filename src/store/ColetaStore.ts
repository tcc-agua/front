import { create } from 'zustand';

import { COLETA } from '../interfaces/postParams';
import { postColeta } from '../services/ColetaService';


interface ColetaState{
    createColetaMeasure: (data: COLETA) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
    coletaId: number | null
}

const useColetaStore = create<ColetaState>((set) => ({
    coletaId: null,
    isCreated: false,
    isError: false,
    isLoading: false,

    resetState: () => {
        set({
            isLoading: false,
            isError: false,
            isCreated:false
        })
    },

    createColetaMeasure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postColeta(data) ;

            console.log(response)
            
            set({
                coletaId: response.id,
                isCreated: true,
                isLoading:false

            })

        } catch (error) {
            set({
                coletaId: null,
                isError:true,
                isLoading:false,
                isCreated:false
            });
        }
    }
}));

export default useColetaStore;
