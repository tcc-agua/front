import { create } from 'zustand';

import { BOMBA_BC03 } from '../interfaces/postParams';
import { postBombaBc03 } from '../services/BombaBc03Service';


interface BombaBc03State{
    createBombaBc03Measure: (data: BOMBA_BC03) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const useBombaBc03Store = create<BombaBc03State>((set) => ({

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

    createBombaBc03Measure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postBombaBc03(data) ;

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

export default useBombaBc03Store;
