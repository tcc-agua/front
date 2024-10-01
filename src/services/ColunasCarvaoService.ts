import api from "../infra/api"
import { COLUNAS_CARVAO } from "../interfaces/postParams"


export const postColunasCarvao = async (data: COLUNAS_CARVAO) => {
    try {
        const response = await api.post("/colunas-carvao", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}