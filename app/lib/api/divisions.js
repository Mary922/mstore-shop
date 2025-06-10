import {Request} from "./request";
import {BASE_URL} from "@/config";



export const getDivisionInfo = () => {
    let result = Request.get(`${BASE_URL}/division/get`);
    return result;
}

