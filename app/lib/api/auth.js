import {Request} from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const Auth = (data) => {
    let result = Request.post(`${baseURL}/auth`, data)
    return result;
}

export const authHeader = () => {

    let tempClient;
    let client;
    let clientId;
    if (typeof window !== "undefined") {
        tempClient = localStorage.getItem("temp-client");
        client = localStorage.getItem("client");
        if (client){
            client = JSON.parse(client);
        }
    }

    if (typeof window !== "undefined" && client) {
        clientId = JSON.parse(localStorage.getItem("client")).id;
    }


    // const client = JSON.parse(localStorage.getItem('client'));
    //
    // const tempClient = localStorage.getItem('temp-client')

    // console.log('CLIENT & TOKEN from localstorage', client);

    if (client && client.accessToken) {
        return client.accessToken
    } else if (tempClient) {
        return tempClient;

        // console.log('No access token or client');
        // return ''
    }
}

export const authTemp = () => {
    let result = Request.post(`${baseURL}/auth-temp`)
    return result;
}

export const CheckValidationPassword = (data) => {
    let result = Request.post(`${baseURL}/auth-password/check`, data)
    return result;
}


