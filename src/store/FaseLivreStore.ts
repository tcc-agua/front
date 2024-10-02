import { create } from 'zustand';

import { FASE_LIVRE } from '../interfaces/postParams';
import { postFaseLivre } from '../services/FaseLivreService';


interface FaseLivreState{
    createFaseLivreMeasure: (data: FASE_LIVRE) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const useFaseLivreStore = create<FaseLivreState>((set) => ({

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

    createFaseLivreMeasure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postFaseLivre(data) ;

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

export default useFaseLivreStore;
