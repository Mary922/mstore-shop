import {Request} from "./request";


let baseURL = 'http://127.0.0.1:3001';

export const getImage = (data) => {
    let result = Request.post(`${baseURL}/image/get`,{
        productIds: data
    });
    return result;
}

export const getImages = (ids) => {
    let result = Request.post(`${baseURL}/images/get`,{
        productIds: ids
    });
    return result;
}

export const getImagesStatic = (type,destination) => {
    let result = Request.post(`${baseURL}/images/get/static`,{
        type: type,
        destination: destination
    });
    return result;
}
