import api from "../infra/api"
import { BH02 } from "../interfaces/postParams"

// Post BH02

export const postBh02 = async (data: BH02) => {
    try {
        const response = await api.post("/bh02", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}