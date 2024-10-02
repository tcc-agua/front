import api from "../infra/api"
import { TQ02 } from "../interfaces/postParams"


export const postTq02 = async (data: TQ02) => {
    try {
        const response = await api.post("/tq02", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}