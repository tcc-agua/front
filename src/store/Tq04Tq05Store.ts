import { create } from 'zustand';

import { TQ04_TQ05 } from '../interfaces/postParams';
import { postTq04Tq05 } from '../services/Tq04Tq05Service';


interface Tq04Tq05State{
    createTq04Tq05Measure: (data: TQ04_TQ05) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const useTq04Tq05Store = create<Tq04Tq05State>((set) => ({

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

    createTq04Tq05Measure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postTq04Tq05(data) ;

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

export default useTq04Tq05Store;
