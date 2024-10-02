import { create } from 'zustand';

import {  BS01_PRESSAO } from '../interfaces/postParams';
import { postBs01Pressao } from '../services/Bs01PressaoService';

interface Bs01PressaoState{
    createBs01PressaoMeasure: (data: BS01_PRESSAO) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const useBs01PressaoStore = create<Bs01PressaoState>((set) => ({

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

    createBs01PressaoMeasure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postBs01Pressao(data) ;

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

export default useBs01PressaoStore;
