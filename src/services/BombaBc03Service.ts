import api from "../infra/api"
import { BOMBA_BC03 } from "../interfaces/postParams"

// Post BH02

export const postBombaBc03 = async (data: BOMBA_BC03) => {
    try {
        const response = await api.post("/bombabc03", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}