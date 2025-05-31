import {Request} from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const makeOrder = (orderInfo, cart, orderSum) => {
    let result = Request.post(`${baseURL}/order/create`, {
        order: orderInfo,
        cart: cart,
        orderSum: orderSum
    });
    return result;
}

export const getOrders = (clientId, limit, offset) => {
    let result = Request.post(`${baseURL}/orders/get`, {
        clientId: clientId,
        limit: limit,
        offset: offset
    });
    return result;
}

export const getOrderById = (orderId) => {
    let result = Request.post(`${baseURL}/order/get`, {
        orderId: orderId,
    });
    return result;
}
