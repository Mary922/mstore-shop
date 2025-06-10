import {Request} from "@/app/lib/api/request";
import {BASE_URL} from "@/config";


export const createAddress = (data) => {
    let result = Request.post(`${BASE_URL}/address/create`, data);
    return result;
}

export const getAddresses = (id) => {
    let result = Request.get(`${BASE_URL}/addresses/get?clientId=${id}`);
    return result;
}

export const updateAddress = (data) => {
    let result = Request.post(`${BASE_URL}/address/update`, data);
    return result;
}

export const deleteAddress = (data) => {
    let result = Request.post(`${BASE_URL}/address/delete`, data);
    return result;
}

