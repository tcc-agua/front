import api from "../infra/api"
import { HORIMETRO } from "../interfaces/postParams"


export const postHorimetro = async (data: HORIMETRO) => {
    try {
        const response = await api.post("/horimetro", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}