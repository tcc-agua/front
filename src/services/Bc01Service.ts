import api from "../infra/api"
import { BC01 } from "../interfaces/postParams"

// POST BC01

export const postBc01 = async (data: BC01) => {
    try {
        const response = await api.post("/bc01", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}
