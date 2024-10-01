import { create } from 'zustand';

import { HORIMETRO } from '../interfaces/postParams';
import { postHorimetro } from '../services/HorimetroService';


interface HorimetroState{
    createHorimetroMeasure: (data: HORIMETRO) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const useHorimetroStore = create<HorimetroState>((set) => ({

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

    createHorimetroMeasure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postHorimetro(data) ;

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

export default useHorimetroStore;
