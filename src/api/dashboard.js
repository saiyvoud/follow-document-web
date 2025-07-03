import api from "./constrant"

export const Dashboard = async () => {
    try {
        return await api.get("/api/dashboard");
    } catch (error) {
        return error
    }
}