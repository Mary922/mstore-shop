import {Request} from "./request";
import {BASE_URL} from "@/config";


export const getCities = (regionId) => {
    let result = Request.post(`${BASE_URL}/cities`, {
        regionId: regionId,
    });
    return result;
}