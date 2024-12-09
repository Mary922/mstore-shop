import {Request} from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const getCart = (cart) => {
    let result = Request.post(`${baseURL}/cart`, {
        cart: cart
    })
    return result;
}

export const getCartPreOrder = (cart,sum) => {
    let result = Request.post(`${baseURL}/preorder`, {
        cart: cart,
        sum: sum
    })
    return result;
}

export const addProductToCart = (data) => {
    let result = Request.post(`${baseURL}/cart/add`, {
        cart: data
    })
    return result;
}


export const getCurrentCart = (clientId) => {
    let result = Request.post(`${baseURL}/cart/get`,{
        clientId: clientId,
    });
    return result;
}

export const deleteProduct = (productId,sizeId) => {
    let result = Request.post(`${baseURL}/cart/delete`,{
        productId: productId,
        sizeId: sizeId
    });
    return result;
}

export const increaseCountInCart = (data) => {
    let result = Request.post(`${baseURL}/cart/increase`,{
        data: data
    });
    return result;
}
export const decreaseCountInCart = (data) => {
    let result = Request.post(`${baseURL}/cart/decrease`,{
        data: data
    });
    return result;
}

export const clearCart = (clientId) => {
    let result = Request.post(`${baseURL}/cart/clear`,{
        clientId: clientId,
    });
    return result;
}
