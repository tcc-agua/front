import api from "../infra/api"
import { PBS } from "../interfaces/postParams"


export const postPbs = async (data: PBS) => {
    try {
        const response = await api.post("/pb", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}