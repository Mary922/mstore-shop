import {Request} from "./request";
import {BASE_URL} from "@/config";


export const getImage = (data) => {
    let result = Request.post(`${BASE_URL}/image/get`, {
        productIds: data
    });
    return result;
}

export const getImages = (ids) => {
    let result = Request.post(`${BASE_URL}/images/get`, {
        productIds: ids
    });
    return result;
}

export const getImagesStatic = (type, destination) => {
    let result = Request.post(`${BASE_URL}/images/get/static`, {
        type: type,
        destination: destination
    });
    return result;
}
