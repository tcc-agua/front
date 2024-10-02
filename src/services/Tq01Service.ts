import api from "../infra/api"
import { TQ01 } from "../interfaces/postParams"


export const postTq01 = async (data: TQ01) => {
    try {
        const response = await api.post("/tq01", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}