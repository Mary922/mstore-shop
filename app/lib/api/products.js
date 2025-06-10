import {Request} from "./request";
import {BASE_URL} from "@/config";


export const getProducts = () => {
    let result = Request.get(`${BASE_URL}/products/get`);
    return result;
}

export const getProductsByIds = (ids) => {
    let result = Request.post(`${BASE_URL}/products/cart`, {
        ids: ids,
    });
    return result;
}

export const getProduct = (id) => {
    let result = Request.get(`${BASE_URL}/product/get?productId=${id}`);
    return result;
}

export const getProductsInSearch = (searchValue) => {
    let result = Request.get(`${BASE_URL}/products/search?searchValue=${searchValue}`);
    return result;
}

export const getProductsFiltered = (data) => {
    let result = Request.post(`${BASE_URL}/products/filter`, {
        data: data,
    });
    return result;
}

export const getProductsBoys = (data) => {
    let result = Request.get(`${BASE_URL}/boys`);
    return result;
}
export const getProductsGirls = (data) => {
    let result = Request.get(`${BASE_URL}/girls`);
    return result;
}
export const getProductsBabies = (data) => {
    let result = Request.get(`${BASE_URL}/babies`);
    return result;
}
