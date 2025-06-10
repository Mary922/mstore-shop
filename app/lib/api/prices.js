import {Request} from "./request";
import {BASE_URL} from "@/config";


export const getMaxPrice = () => {
    let result = Request.get(`${BASE_URL}/prices/max`);
    return result;
}