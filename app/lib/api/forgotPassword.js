import {Request} from "./request";


let baseURL = 'http://127.0.0.1:3001';

export const resetPasswordRequest = (email) => {
    let result = Request.post(`${baseURL}/forgotPassword`,{
        email: email
    });
    return result;
}

export const changeForgottenPasswordRequest = (token,password) => {
    let result = Request.post(`${baseURL}/changeForgottenPassword`,{
        token: token,
        password: password
    });
    return result;
}

