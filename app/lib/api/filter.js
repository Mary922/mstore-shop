import {Request} from "./request";
import {BASE_URL} from "@/config";


export const getFilterParams = () => {
    let result = Request.get(`${BASE_URL}/filter/get`);
    return result;
}

export const applyFilterParams = (category, gender, minRangeValue, maxRangeValue, sizes, colors, seasons, brands, countries) => {

    const params = new URLSearchParams();

    if (category) {
        params.append('category', category);
    }
    if (gender) {
        params.append('gender', gender);
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

    if (minRangeValue) {
        params.append('minRangeValue', minRangeValue);
    }
    if (maxRangeValue) {
        params.append('maxRangeValue', maxRangeValue);
    }

    let result = Request.get(`${BASE_URL}/filter/products?${params.toString()}`);
    return result;
}

