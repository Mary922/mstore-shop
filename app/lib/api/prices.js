import {Request} from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const getMaxPrice = () => {
    let result = Request.get(`${baseURL}/prices/max`);
    return result;
}