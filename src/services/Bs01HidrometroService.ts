import api from "../infra/api"
import { BS01_HIDROMETRO } from "../interfaces/postParams"


export const postBs01Hidrometro = async (data: BS01_HIDROMETRO) => {
    try {
        const response = await api.post("/bs01-hidrometro", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}