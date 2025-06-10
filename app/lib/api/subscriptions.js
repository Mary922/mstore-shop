import {Request} from "./request";
import {BASE_URL} from "@/config";


export const createNewSubscription = (data) => {
    let result = Request.post(`${BASE_URL}/subscription`, data);
    return result;
}