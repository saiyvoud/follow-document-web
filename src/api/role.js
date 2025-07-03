import api from "./constrant"

export const GetAllRole = async () => {
    try {
        return await api.get("/api/role/selAll");
    } catch (error) {
        throw error
    }
}

export const GetAllRoleUser = async () => {
    try {
        return await api.get("/api/role_user/selAll");
    } catch (error) {
        throw error
    }
}
export const UpdateRoleUser = async (data) => {
    try {
        return await api.put("/api/role_user/update",data);
    } catch (error) {
        throw error
    }
}