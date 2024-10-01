import { create } from 'zustand';

import { COLUNAS_CARVAO } from '../interfaces/postParams';
import { postColunasCarvao } from '../services/ColunasCarvaoService';


interface ColunasCarvaoState{
    createColunasCarvaoMeasure: (data: COLUNAS_CARVAO) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const useColunasCarvaoStore = create<ColunasCarvaoState>((set) => ({

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

    createColunasCarvaoMeasure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postColunasCarvao(data) ;

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

export default useColunasCarvaoStore;
