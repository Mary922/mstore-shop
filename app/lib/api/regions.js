import {Request} from "./request";
import {BASE_URL} from "@/config";


export const getRegions = () => {
    let result = Request.get(`${BASE_URL}/regions`);
    return result;
}