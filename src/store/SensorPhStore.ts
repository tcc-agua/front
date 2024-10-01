import { create } from 'zustand';

import { SENSOR_PH } from '../interfaces/postParams';
import { postSensorPh } from '../services/SensorPhService';


interface SensorPhState{
    createSensorPhMeasure: (data: SENSOR_PH) => Promise <void>
    resetState: () => void

    isCreated: boolean
    isError: boolean
    isLoading: boolean
}

const useSensorPhStore = create<SensorPhState>((set) => ({

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

    createSensorPhMeasure: async (data) => {

        set({
            isLoading: true,
            isError: false,
            isCreated:false
        })

        try {
            const response = await postSensorPh(data) ;

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

export default useSensorPhStore;
