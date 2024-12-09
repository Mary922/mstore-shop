import {Request} from "./request";


let baseURL = 'http://127.0.0.1:3001';

export const getProducts = () => {
    let result = Request.get(`${baseURL}/products/get`);
    return result;
}

export const getProductsByIds = (ids) => {
    let result = Request.post(`${baseURL}/products/cart`,{
        ids: ids,
    });
    return result;
}

export const getProduct = (id) => {
    let result = Request.get(`${baseURL}/product/get?productId=${id}`);
    return result;
}

export const getProductsInSearch = (searchValue) => {
    let result = Request.get(`${baseURL}/products/search?searchValue=${searchValue}`);
    return result;
}

export const getProductsFiltered = (data) => {
    let result = Request.post(`${baseURL}/products/filter`,{
        data: data,
    });
    return result;
}
