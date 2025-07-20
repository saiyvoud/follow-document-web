import api from "./constrant"

export const SearchDocIn = async (key) => {
    try {
        return await api.get("/api/document_in/search?search=" + key);
    } catch (error) {
        return error
    }
}
export const SearchDocOut = async (key) => {
    try {
        return await api.get("/api/document_out/search?search=" + key);
    } catch (error) {
        return error
    }
}
export const InsertDocIn = async (title, faculty_id, file, numberID,contactName,contactNumber,date,description,destinationName,destinationNumber,sendDoc,document_type_id) => {
    try {
        const data = new FormData();
        data.append('title', title);
        data.append('part_demand_id', '');
        data.append('faculty_id', faculty_id);
        data.append('files', file);
        data.append('numberID', numberID);
        data.append('contactName', contactName);
        data.append('contactNumber', contactNumber);
        data.append('destinationName', destinationName);
        data.append('destinationNumber', destinationNumber);
        data.append('sendDoc', sendDoc);
        data.append('document_type_id', document_type_id);
        data.append('date', date);
        data.append('description', description);
        return await api.post("/api/document_in/insert", data);
    } catch (error) {
        return error
    }
}
export const InsertDocOut = async (title, faculty_id, file, numberID,contactName,contactNumber,date,description,destinationName,destinationNumber,sendDoc,document_type_id) => {
    try {
        const data = new FormData();
        data.append('title', title);
        data.append('part_demand_id', '');
        data.append('faculty_id', faculty_id);
        data.append('files', file);
        data.append('numberID', numberID);
        data.append('contactName', contactName);
        data.append('contactNumber', contactNumber);
        data.append('destinationName', destinationName);
        data.append('destinationNumber', destinationNumber);
        data.append('sendDoc', sendDoc);
        data.append('document_type_id', document_type_id);
        data.append('date', date);
        data.append('description', description);
        return await api.post("/api/document_out/insert", data);
    } catch (error) {
        return error
    }
}


export const GetAllDocIn = async () => {
    try {
        return await api.get("/api/document_in/selAll");
    } catch (error) {
        return error
    }
}

export const GetAllDocOut = async () => {
    try {
        return await api.get("/api/document_out/selAll");
    } catch (error) {
        return error
    }
}
export const UpdateDocIn = async (id, data) => {
    try {
        return await api.put("/api/document_in/update/" + id, data);
    } catch (error) {
        return error
    }
}
export const UpdateDocOut = async (id, data) => {
    try {
        return await api.put("/api/document_out/update/" + id, data);
    } catch (error) {
        return error
    }
}

export const UpdateDocInStatus = async (id, status) => {
    try {
        return await api.put("/api/document_in/updateStatus/" + id, { status: status });
    } catch (error) {
        return error
    }
}
export const UpdateDocOutStatus = async (id, status) => {
    try {
        return await api.put("/api/document_out/updateStatus/" + id, { status: status });
    } catch (error) {
        return error
    }
}

export const DeleteDocIn = async (id) => {
    try {
        return await api.delete("/api/document_in/delete/" + id);
    } catch (error) {
        return error
    }
}

export const DeleteDocOut = async (id) => {
    try {
        return await api.delete("/api/document_out/delete/" + id);
    } catch (error) {
        return error
    }
}