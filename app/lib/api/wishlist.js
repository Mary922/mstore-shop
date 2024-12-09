import {Request} from "./request";


let baseURL = 'http://127.0.0.1:3001';

export const getWishlist = (data) => {
    let result = Request.get(`${baseURL}/wishlist/get`);
    return result;
}


export const updateWishlist = (data) => {
    let result = Request.post(`${baseURL}/wishlist/update`,{
        wishlist: data,
    });
    return result;
}

export const deleteWishlistProduct = (data) => {
    let result = Request.post(`${baseURL}/wishlist/delete`,{
        wishlist: data,
    });
    return result;
}