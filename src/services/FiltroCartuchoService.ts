import api from "../infra/api"
import { FILTRO_CARTUCHO } from "../interfaces/postParams"


export const postFiltroCartucho = async (data: FILTRO_CARTUCHO) => {
    try {
        const response = await api.post("/filtro_cartucho", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}