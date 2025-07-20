import api from "./constrant"
export const InsertDocType = async (data) => {
    try {
        return await api.post("/api/document_type/insert", data);
    } catch (error) {
        return error
    }
}
export const UpdateDocType = async (id, data) => {
    try {
        return await api.put("/api/document_type/update/" + id, data);
    } catch (error) {
       return error
    }
}
export const DeleteDocType = async (id) => {
    try {
        return await api.delete("/api/document_type/delete/" + id);
    } catch (error) {
       return error
    }
}
export const GetDocumentType = async () => {
    try {
        return await api.get("/api/document_type/selAll");
    } catch (error) {
        return error
    }
}