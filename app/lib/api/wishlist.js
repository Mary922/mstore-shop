import {Request} from "./request";
import {BASE_URL} from "@/config";


export const getWishlist = (data) => {
    let result = Request.get(`${BASE_URL}/wishlist/get`);
    return result;
}

export const getProductsInWishlistByIds = (data) => {
    let result = Request.post(`${BASE_URL}/wishlist/getProducts`, {
        ids: data
    });
    return result;
}


export const updateWishlist = (data) => {
    let result = Request.post(`${BASE_URL}/wishlist/update`, {
        wishlist: data,
    });
    return result;
}

export const deleteWishlistProduct = (data) => {
    let result = Request.post(`${BASE_URL}/wishlist/delete`, {
        wishlist: data,
    });
    return result;
}