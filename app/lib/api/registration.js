import {Request} from "./request";


let baseURL = 'http://127.0.0.1:3001';

export const Registration = (data) => {
    let result = Request.post(`${baseURL}/register`, {
        client: data,
    });
    return result;
}