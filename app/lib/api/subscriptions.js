import {Request} from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const createNewSubscription = (data) => {
    let result = Request.post(`${baseURL}/subscription`, data);
    return result;
}