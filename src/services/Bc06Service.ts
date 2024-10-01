import api from "../infra/api"
import { BC06 } from "../interfaces/postParams"


export const postBc06 = async (data: BC06) => {
    try {
        const response = await api.post("/bc06", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}