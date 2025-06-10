import {Request} from "./request";
import {BASE_URL} from "@/config";


export const Registration = (data) => {
    let result = Request.post(`${BASE_URL}/register`, {
        client: data,
    });
    return result;
}