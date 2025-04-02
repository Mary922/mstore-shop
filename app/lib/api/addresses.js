import {Request} from "@/app/lib/api/request";


let baseURL = 'http://127.0.0.1:3001';

export const createAddress = (data) => {
    let result = Request.post(`${baseURL}/address/create`,data);
    return result;
}

export const getAddresses = (id) => {
    let result = Request.get(`${baseURL}/addresses/get?clientId=${id}`);
    return result;
}

export const updateAddress = (data) => {
    let result = Request.post(`${baseURL}/address/update`,data);
    return result;
}

export const deleteAddress = (data) => {
    let result = Request.post(`${baseURL}/address/delete`,data);
    return result;
}

