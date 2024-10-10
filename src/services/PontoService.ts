import api from "../infra/api";
import { STATUS_OPT } from "../store/PontoStore";


export const updatePontoStatus = async (name: string, status: STATUS_OPT) => {
    try {
        const response = await api.patch(`/ponto/${name}`, status)

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}