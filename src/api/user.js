import api from "./constrant"

export const GetAllUser = async () => {
    try {
        return await api.get("/api/user/selAll");
    } catch (error) {
        return await error
    }
}
export const GetAllUserRolePerMission = async () => {
    try {
        return await api.get("/api/user/allUserRolePermission");
    } catch (error) {
        return await error
    }
}
export const UpdateUser = async (id, data) => {
    try {
        return await api.put("/api/user/update/" + id, data);
    } catch (error) {
        return await error
    }
}
export const InserUser = async (data) =>{
     try {
        return await api.post("/api/user/register", data);
    } catch (error) {
        return await error
    }
}