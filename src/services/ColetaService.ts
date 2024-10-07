import api from "../infra/api"
import { COLETA } from "../interfaces/postParams"


export const postColeta = async (data: COLETA) => {
    try {
        const response = await api.post("/coleta", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}