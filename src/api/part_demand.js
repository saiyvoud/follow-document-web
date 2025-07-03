import api from "./constrant"

export const GetAllPartDemand = async () => {
    try {
        return await api.get("/api/part_demand/selAll");
    } catch (error) {
        return error
    }
}
export const InserPartDemand = async (data) => {
    try {
        return await api.post("/api/part_demand/insert", data);
    } catch (error) {
        return error

    }
}
export const UpdatePartDemand = async (id, data) => {
    try {
        return await api.put("/api/part_demand/update/" + id, data);
    } catch (error) {
        return error

    }
}

export const DeletePartDemand = async (id) => {
    try {
        return await api.delete("/api/part_demand/delete/" + id);
    } catch (error) {
        return error
    }
}