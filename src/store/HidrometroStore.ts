import { create } from 'zustand';

import { HIDROMETRO } from '../interfaces/postParams';
import { postHidrometro } from '../services/HidrometroService';


interface HidrometroState{
    createHidrometroMeasure: (data: HIDROMETRO) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const useHidrometroStore = create<HidrometroState>((set) => ({

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

    createHidrometroMeasure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postHidrometro(data) ;

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

export default useHidrometroStore;
