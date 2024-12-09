import {Request} from "./request";


let baseURL = 'http://127.0.0.1:3001';

export const getFilterParams = () => {
    let result = Request.get(`${baseURL}/filter/get`);
    return result;
}

export const applyFilterParams = (category,sizes,colors,seasons,brands,countries,minRangeValue,maxRangeValue) => {

    const params = new URLSearchParams();

    if (category) {
        params.append('category', category);
    }

    if (Array.isArray(sizes)) {
        sizes.forEach(size => params.append('sizes', size));
    }
    if (Array.isArray(colors)) {
        colors.forEach(color => params.append('colors', color));
    }
    if (Array.isArray(seasons)) {
        seasons.forEach(season => params.append('seasons', season));
    }
    if (Array.isArray(brands)) {
        brands.forEach(brand => params.append('brands', brand));
    }
    if (Array.isArray(countries)) {
        countries.forEach(country => params.append('countries', country));
    }

    params.append('minRangeValue', minRangeValue);
    params.append('maxRangeValue', maxRangeValue);

    // console.log('PARAMS',params.toString());

    let result = Request.get(`${baseURL}/filter/products?${params.toString()}`);
    return result;
}

