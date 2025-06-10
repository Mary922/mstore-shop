import {Request} from "./request";
import {BASE_URL} from "@/config";



export const getCategories = () => {
    let result = Request.get(`${BASE_URL}/categories/gender`);
    return result;
}