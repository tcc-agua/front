import api from "../infra/api"
import { SENSOR_PH } from "../interfaces/postParams"


export const postSensorPh = async (data: SENSOR_PH) => {
    try {
        const response = await api.post("/sensor-ph", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}