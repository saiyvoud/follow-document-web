import api from "./constrant"

export const Login = async (email, password) => {
    try {
        return await api.post("/api/user/login", { email: email, password: password });
    } catch (error) {
        return await error
    }
}