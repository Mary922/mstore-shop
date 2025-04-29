import {Request} from "./request";


let baseURL = 'http://127.0.0.1:3001';

export const getFilterParams = () => {
    let result = Request.get(`${baseURL}/filter/get`);
    return result;
}

export const applyFilterParams = (category,gender,minRangeValue,maxRangeValue,sizes,colors,seasons,brands,countries) => {

    const params = new URLSearchParams();

    //
    // console.log('apply sizes',sizes)
    // console.log('categoryyyyyy',category);


    // if (category) params.set('category', category);

    // if (Array.isArray(sizes)){
    //     sizes.forEach(size => params.set('sizes', size));
    // }
    // params.set('sizes', JSON.stringify(sizes));

    //
    // if (colors.length > 0) params.set('colors', JSON.stringify(colors));
    // if (seasons.length > 0) params.set('seasons', JSON.stringify(seasons));
    // if (brands.length > 0) params.set('brands', JSON.stringify(brands));
    // if (countries.length > 0) params.set('countries', JSON.stringify(countries));
    // if (minRangeValue) params.set('minPrice', minRangeValue.toString());
    // if (maxRangeValue) params.set('maxPrice', maxRangeValue.toString());


    // if (category) {
    //     // params.append('category', category);
    //     params.set('category', category);
    // }
    // if (gender) {
    //     // params.append('category', category);
    //     params.set('gender', gender);
    // }
    //
    // if (Array.isArray(sizes)) {
    //     params.set('sizes', JSON.stringify(sizes));
    //     // sizes.forEach(size => params.append('sizes', size));
    // }
    // if (Array.isArray(colors)) {
    //     colors.forEach(color => params.append('colors', color));
    // }
    // if (Array.isArray(seasons)) {
    //     seasons.forEach(season => params.append('seasons', season));
    // }
    // if (Array.isArray(brands)) {
    //     brands.forEach(brand => params.append('brands', brand));
    // }
    // if (Array.isArray(countries)) {
    //     countries.forEach(country => params.append('countries', country));
    // }
    //
    // params.append('minRangeValue', minRangeValue);
    // params.append('maxRangeValue', maxRangeValue);

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

    // if (minRangeValue) params.set('minPrice', minRangeValue.toString());
    // if (maxRangeValue) params.set('maxPrice', maxRangeValue.toString());

    console.log('PARAMS',params.toString());

    let result = Request.get(`${baseURL}/filter/products?${params.toString()}`);
    return result;
}

