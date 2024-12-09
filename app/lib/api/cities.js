import {Request} from "./request";


let baseURL = 'http://127.0.0.1:3001';

export const getCities= (regionId) => {
    let result = Request.post(`${baseURL}/cities`,{
        regionId: regionId,
    });
    return result;
}