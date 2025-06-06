import {Request} from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const Auth = async (data) => {
    let result = await Request.post(`${baseURL}/auth`, data)
    console.log('auth result request', result);
    return result;
}

export const authHeader = () => {

    let tempClient;
    let client;
    let clientId;
    if (typeof window !== "undefined") {
        tempClient = localStorage.getItem("temp-client");
        client = localStorage.getItem("client");
        if (client) {
            client = JSON.parse(client);
        }
    }

    if (typeof window !== "undefined" && client) {
        clientId = JSON.parse(localStorage.getItem("client")).id;
    }

    if (client && client.accessToken) {
        return client.accessToken
    } else if (tempClient) {
        return tempClient;
    }
}

export const authTemp = async () => {
    let result = await Request.post(`${baseURL}/auth-temp`)
    return result;
}

export const CheckValidationPassword = async (data) => {
    let result = await Request.post(`${baseURL}/auth-password/check`, data)
    return result;
}


