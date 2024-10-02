import { create } from 'zustand';

import { BS01_HIDROMETRO } from '../interfaces/postParams';
import { postBs01Hidrometro } from '../services/Bs01HidrometroService';

interface Bs01HidrometroState{
    createBs01HidrometroMeasure: (data: BS01_HIDROMETRO) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const useBs01HidrometroStore = create<Bs01HidrometroState>((set) => ({

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

    createBs01HidrometroMeasure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postBs01Hidrometro(data) ;

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

export default useBs01HidrometroStore;
