import {Request} from "./request";


let baseURL = 'http://127.0.0.1:3001';

export const getClient = (id) => {
    let result = Request.post(`${baseURL}/client`,{
        clientId: id,
    });
    return result;
}

export const updateClient = (data) => {
    let result = Request.post(`${baseURL}/client/update`,{
        client: data,
    });
    return result;
}