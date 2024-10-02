import { create } from 'zustand';

import { FILTRO_CARTUCHO } from '../interfaces/postParams';
import { postFiltroCartucho } from '../services/FiltroCartuchoService';


interface FiltroCartuchoState{
    createFiltroCartuchoMeasure: (data: FILTRO_CARTUCHO) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const useFiltroCartuchoStore = create<FiltroCartuchoState>((set) => ({

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

    createFiltroCartuchoMeasure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postFiltroCartucho(data) ;

            console.log(response)
            
            set({
                isCreated: true,
                isLoading:false

            })

        } catch (error) {
            set({
                isError:true,
                isLoading:false,
                isCreated:false
            });
        }
    }
}));

export default useFiltroCartuchoStore;
