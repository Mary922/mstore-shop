import {Request} from "./request";
import {BASE_URL} from "@/config";



export const getCart = (cart) => {
    let result = Request.post(`${BASE_URL}/cart`, {
        cart: cart
    })
    return result;
}

export const getCartPreOrder = (cart, sum) => {
    let result = Request.post(`${BASE_URL}/preorder`, {
        cart: cart,
        sum: sum
    })
    return result;
}

export const addProductToCart = (data) => {
    let result = Request.post(`${BASE_URL}/cart/add`, {
        cart: data
    })
    return result;
}


export const getCurrentCart = (clientId) => {
    let result = Request.post(`${BASE_URL}/cart/get`, {
        clientId: clientId,
    });
    return result;
}

export const deleteProduct = (productId, sizeId) => {
    console.log('req', productId, sizeId);


    let result = Request.post(`${BASE_URL}/cart/delete`, {
        productId: productId,
        sizeId: sizeId
    });
    return result;
}

export const increaseCountInCart = (data) => {
    let result = Request.post(`${BASE_URL}/cart/increase`, {
        data: data
    });
    return result;
}
export const decreaseCountInCart = (data) => {
    let result = Request.post(`${BASE_URL}/cart/decrease`, {
        data: data
    });
    return result;
}

export const clearCart = (clientId) => {
    let result = Request.post(`${BASE_URL}/cart/clear`, {
        clientId: clientId,
    });
    return result;
}
