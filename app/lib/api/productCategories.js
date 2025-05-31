import {Request} from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const getProductCategories = (categoryId) => {
    let result = Request.get(`${baseURL}/productCategories/?categoryId=${categoryId}`);
    return result;
}
