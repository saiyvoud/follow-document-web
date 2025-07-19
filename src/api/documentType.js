import api from "./constrant"
export const GetDocumentType = async () => {
    try {
        return await api.get("/api/document_type/selAll");
    } catch (error) {
        return error
    }
}