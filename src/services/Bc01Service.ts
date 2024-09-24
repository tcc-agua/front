import api from "../infra/api"
import { BC01 } from "../interfaces/postParams"

// Post BH02

export const postBc01 = async (data: BC01) => {
    try {
        const response = await api.post("/BC01", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}