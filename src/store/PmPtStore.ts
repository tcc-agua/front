import { create } from 'zustand';

import { PMPT } from '../interfaces/postParams';
import { postPmPt } from '../services/PmPtService';


interface PmPtState{
    createPmPtMeasure: (data: PMPT) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const usePmPtStore = create<PmPtState>((set) => ({

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

    createPmPtMeasure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postPmPt(data) ;

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

export default usePmPtStore;
