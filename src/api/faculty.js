import api from "./constrant"

export const InsertFaculty = async (data) => {
    try {
        return await api.post("/api/faculty/insert", data);
    } catch (error) {
        return error
    }
}
export const GetAllFaculty = async () => {
    try {
        return await api.get("/api/faculty/selAll");
    } catch (error) {
        return error
    }
}

export const UpdateFaculty = async (id, data) => {
    try {
        return await api.put("/api/faculty/update/" + id, data);
    } catch (error) {
       return error
    }
}
export const DeleteFaculty = async (id) => {
    try {
        return await api.delete("/api/faculty/delete/" + id);
    } catch (error) {
        return error
    }
}