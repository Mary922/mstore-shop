import {Request} from "./request";
import {BASE_URL} from "@/config";


export const resetPasswordRequest = (email) => {
    let result = Request.post(`${BASE_URL}/forgotPassword`, {
        email: email
    });
    return result;
}

export const changeForgottenPasswordRequest = (token, password) => {
    let result = Request.post(`${BASE_URL}/changeForgottenPassword`, {
        token: token,
        password: password
    });
    return result;
}

export const checkTokenNotExpired = (token) => {
    let result = Request.post(`${BASE_URL}/checkTokenNotExpired`, {
        token: token,
    });
    return result;
}

