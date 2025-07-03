import api from "./constrant"

export const GetAllPartSuppile = async () => {
    try {
        return await api.get("/api/part_suppile/selAll");
    } catch (error) {
         return error
    }
}
export const InserPartSuppile = async (data) => {
    try {
        return await api.post("/api/part_suppile/insert", data);
    } catch (error) {
        return error
    }
}
export const UpdatePartSuppile = async (id, data) => {
    try {
        return await api.put("/api/part_suppile/update/" + id, data);
    } catch (error) {
         return error
    }
}

export const DeletePartSuppile = async (id) => {
    try {
        return await api.delete("/api/part_suppile/delete/" + id);
    } catch (error) {
        return error
    }
}