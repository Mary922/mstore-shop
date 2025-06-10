import {Request} from "./request";
import {BASE_URL} from "@/config";



export const makeOrder = (orderInfo, cart, orderSum) => {
    let result = Request.post(`${BASE_URL}/order/create`, {
        order: orderInfo,
        cart: cart,
        orderSum: orderSum
    });
    return result;
}

export const getOrders = (clientId, limit, offset) => {
    let result = Request.post(`${BASE_URL}/orders/get`, {
        clientId: clientId,
        limit: limit,
        offset: offset
    });
    return result;
}

export const getOrderById = (orderId) => {
    let result = Request.post(`${BASE_URL}/order/get`, {
        orderId: orderId,
    });
    return result;
}
