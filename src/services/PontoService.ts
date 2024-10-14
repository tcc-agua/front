import api from "../infra/api";

export const updatePontoStatus = async (name: string, status: string) => {
    try {
        const response = await api.patch(`/ponto/${name}`, { status });
        
        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}