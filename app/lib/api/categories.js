import {Request} from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const getCategories = () => {
    let result = Request.get(`${baseURL}/categories/gender`);
    return result;
}