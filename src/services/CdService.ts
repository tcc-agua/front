import api from "../infra/api"
import { CD } from "../interfaces/postParams"


export const postCd = async (data: CD) => {
    try {
        const response = await api.post("/cd", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}