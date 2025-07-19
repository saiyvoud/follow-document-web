import api from "./constrant"
export const InsertFollowDocumentOut = async (data) => {
    try {
        return await api.post("/api/follow_document_out/insert", data);
    } catch (error) {
        return error
    }
}