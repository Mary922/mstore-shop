import {Request} from "./request";
import {BASE_URL} from "@/config";



export const getClient = (id) => {
    let result = Request.post(`${BASE_URL}/client`, {
        clientId: id,
    });
    return result;
}

export const updateClient = (data) => {
    let result = Request.post(`${BASE_URL}/client/update`, {
        client: data,
    });
    return result;
}