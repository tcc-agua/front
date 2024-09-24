import { create } from 'zustand';

import { BH02 } from '../interfaces/postParams';
import { postBh02 } from '../services/Bh02Service';

interface Bh02State{
    createBh02Measure: (data: BH02) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const useBh02Store = create<Bh02State>((set) => ({

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

    createBh02Measure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postBh02(data) ;

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

export default useBh02Store;
