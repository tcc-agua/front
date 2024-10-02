import api from "../infra/api"
import { FASE_LIVRE } from "../interfaces/postParams"


export const postFaseLivre = async (data: FASE_LIVRE) => {
    try {
        const response = await api.post("/faselivre", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}