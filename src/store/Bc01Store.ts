import { create } from 'zustand';

import { BC01 } from '../interfaces/postParams';
import { postBc01 } from '../services/Bc01Service';

interface Bc01State{
    createBc01Measure: (data: BC01) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const useBc01Store = create<Bc01State>((set) => ({

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

    createBc01Measure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postBc01(data) ;

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

export default useBc01Store;
