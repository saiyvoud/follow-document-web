import api from "./constrant"
export const UpdatePermissionUser = async (data) => {
    try {
        return await api.put("/api/permission/update",data);
    } catch (error) {
        throw error
    }
}