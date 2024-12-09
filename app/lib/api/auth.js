import {Request} from "./request";

let baseURL = 'http://127.0.0.1:3001';

export const Auth = (data) => {
    let result = Request.post(`${baseURL}/auth`, data)
    return result;
}

export const authHeader = () => {
    const client = JSON.parse(localStorage.getItem('client'));

    const tempClient = localStorage.getItem('temp-client')

    // console.log('CLIENT & TOKEN from localstorage',client);

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


