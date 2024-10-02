import api from "../infra/api"
import { PMPT } from "../interfaces/postParams"


export const postPmPt = async (data: PMPT) => {
    try {
        const response = await api.post("/pmpt", data)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}