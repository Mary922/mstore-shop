import {Request} from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const getDivisionInfo = () => {
    let result = Request.get(`${baseURL}/division/get`);
    return result;
}

