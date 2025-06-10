import {Request} from "./request";
import {BASE_URL} from "@/config";



export const Auth = async (data) => {
    let result = await Request.post(`${BASE_URL}/auth`, data)
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
    let result = await Request.post(`${BASE_URL}/auth-temp`)
    return result;
}

export const CheckValidationPassword = async (data) => {
    let result = await Request.post(`${BASE_URL}/auth-password/check`, data)
    return result;
}


