import api from "./constrant"
export const InsertFollowDocumentIn = async (data) => {
    try {
        return await api.post("/api/follow_document_in/insert", data);
    } catch (error) {
        return error
    }
}