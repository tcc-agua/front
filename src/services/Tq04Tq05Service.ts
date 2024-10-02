import api from "../infra/api"
import { TQ04_TQ05 } from "../interfaces/postParams"


export const postTq04Tq05 = async (data: TQ04_TQ05) => {
    try {
        const response = await api.post("/tq04tq05", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}