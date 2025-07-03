import api from "./constrant"
export const GetAllOffice = async () => {
    try {
        return await api.get("/api/office/selAll");
    } catch (error) {
        throw error
    }
}