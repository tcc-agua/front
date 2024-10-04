import api from "../infra/api"
import { HIDROMETRO } from "../interfaces/postParams"


export const postHidrometro= async (data: HIDROMETRO) => {
    try {
        const response = await api.post("/hidrometro", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}