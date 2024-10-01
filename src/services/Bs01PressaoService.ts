import api from "../infra/api"
import { BS01_PRESSAO } from "../interfaces/postParams"


export const postBs01Pressao = async (data: BS01_PRESSAO) => {
    try {
        const response = await api.post("/bs01-pressao", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}