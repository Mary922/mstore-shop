import {Request} from "./request";
import {BASE_URL} from "@/config";



export const getProductCategories = (categoryId) => {
    let result = Request.get(`${BASE_URL}/productCategories/?categoryId=${categoryId}`);
    return result;
}
