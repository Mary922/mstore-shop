"use client"

import React, {useEffect, useRef, useState} from "react";
import ProductCard from "@/app/ui/ProductCard";
import {useRouter, useSearchParams} from "next/navigation";
import {useAppSelector} from "@/app/lib/hooks";
import MainLayout from "@/app/ui/MainLayout";
import {applyFilterParams, getFilterParams} from "@/app/lib/api/filter";
import CanvasFilter from "@/app/ui/CanvasFilter";
import {getMaxPrice} from "@/app/lib/api/prices";
import {Suspense} from "react";

export default function CatalogLoadingPage() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <CatalogPage/>
        </Suspense>
    );
};

function CatalogPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const drawerToggleRef = useRef(null);


    const productsList = useAppSelector(state => state.common.filteredProductIds);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [gender, setGender] = useState(null);

    const [activeProductId, setActiveProductId] = useState(null);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [countries, setCountries] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(null);
    const [initialMaxPrice, setInitialMaxPrice] = useState(null);

    const [checkedOptionsSizes, setCheckedOptionsSizes] = useState([]);
    const [checkedOptionsColors, setCheckedOptionsColors] = useState([]);
    const [checkedOptionsSeasons, setCheckedOptionsSeasons] = useState([]);
    const [checkedOptionsBrands, setCheckedOptionsBrands] = useState([]);
    const [checkedOptionsCountries, setCheckedOptionsCountries] = useState([]);

    const [chosenFilters, setChosenFilters] = useState({
        sizes: [],
        colors: [],
        seasons: [],
        brands: [],
        countries: [],
    });

    useEffect(() => {
        (async () => {
            try {
                const result = await getMaxPrice();
                if (result?.data) {
                    setInitialMaxPrice(result.data.maxPrice);
                }
            } catch (error) {
                console.log('Error fetching max price:', error);
            }

        })()
    }, [maxPrice])

    useEffect(() => {
        (async () => {
            const filterRes = await getFilterParams();
            let sizesFromApi = filterRes?.data?.sizes || [];
            const numericSizes = sizes.map(Number);

            const matchingSizes = sizesFromApi.filter(appSize => {
                return numericSizes.includes(appSize.size_id);
            }).map(matchingSize => matchingSize.size_name);
            if (matchingSizes && matchingSizes.length > 0) {
                setChosenFilters(prevState => ({
                    ...prevState,
                    sizes: matchingSizes
                }))
            }


            let colorsFromApi = filterRes?.data?.colors || [];
            const numericColors = colors.map(Number);
            const matchingColors = colorsFromApi.filter(appColor => {
                return numericColors.includes(appColor.color_id);
            }).map(matchingColor => matchingColor.color_name);

            if (matchingColors && matchingColors.length > 0) {
                setChosenFilters(prevState => ({
                    ...prevState,
                    colors: matchingColors
                }))
            }

            let seasonsFromApi = filterRes?.data?.seasons || [];
            const numericSeasons = seasons.map(Number);
            const matchingSeasons = seasonsFromApi.filter(appSeason => {
                return numericSeasons.includes(appSeason.season_id);
            }).map(matchingSeason => matchingSeason.season_name);

            if (matchingSeasons && matchingSeasons.length > 0) {
                setChosenFilters(prevState => ({
                    ...prevState,
                    seasons: matchingSeasons
                }))
            }

            let brandsFromApi = filterRes?.data?.brands || [];
            const numericBrands = brands.map(Number);
            const matchingBrands = brandsFromApi.filter(appBrand => {
                return numericBrands.includes(appBrand.brand_id);
            }).map(matchingBrand => matchingBrand.brand_name);

            if (matchingBrands && matchingBrands.length > 0) {
                setChosenFilters(prevState => ({
                    ...prevState,
                    brands: matchingBrands
                }))
            }

            let countriesFromApi = filterRes?.data?.countries || [];
            const numericCountries = countries.map(Number);
            const matchingCountries = countriesFromApi.filter(appCountry => {
                return numericCountries.includes(appCountry.country_id);
            }).map(matchingCountry => matchingCountry.country_name);

            if (matchingCountries && matchingCountries.length > 0) {
                setChosenFilters(prevState => ({
                    ...prevState,
                    countries: matchingCountries
                }))
            }

        })()
    }, [sizes, colors, seasons, brands, countries]);

    const updateQueryParameter = (key, value) => {
        const nextParams = new URLSearchParams(searchParams.toString());

        if (value === '') {
            nextParams.delete(key);
        } else {
            nextParams.set(key, value);
        }
        router.push(`?${nextParams.toString()}`, undefined, {scroll: false});
    };


    const clearFilter = (type) => {
        switch (type) {
            case 'color':
                setColors([]);
                updateQueryParameter('colors', '');
                break;
            case 'size':
                setSizes([]);
                updateQueryParameter('sizes', '');
                break;
            case 'brand':
                setBrands([]);
                updateQueryParameter('brands', '');
                break;
            case 'country':
                setCountries([]);
                updateQueryParameter('countries', '');
                break;
            case 'season':
                setSeasons([]);
                updateQueryParameter('seasons', '');
                break;
            case 'minPrice':
                setMinPrice(0);
                updateQueryParameter('minPrice', '');
                break;
            case 'maxPrice':
                setMaxPrice(null);
                updateQueryParameter('maxPrice', '');
                break;
            default:
                break;
        }
    };

    const clearAllFilters = async () => {
        setColors([]);
        setSizes([]);
        setBrands([]);
        setCountries([]);
        setSeasons([]);
        setMinPrice(null);
        setMaxPrice(null);

        setCheckedOptionsColors([]);
        setCheckedOptionsSeasons([]);
        setCheckedOptionsSizes([]);
        setCheckedOptionsBrands([]);
        setCheckedOptionsCountries([]);

        const nextParams = await new URLSearchParams(searchParams.toString());
        [
            'colors',
            'sizes',
            'brands',
            'countries',
            'seasons',
            'minPrice',
            'maxPrice'
        ].forEach(paramKey => nextParams.delete(paramKey));

        router.push(`?${nextParams}`, undefined, {scroll: false});
    }

    const toggleSizeDropdown = (id) => {
        if (activeProductId === id) {
            setActiveProductId(null);
        } else {
            setActiveProductId(id);
        }
    };

    useEffect(() => {
        (async () => {
            const categoryFilterParam = searchParams.get('category');
            setCategory(categoryFilterParam);

            const genderFilterParam = searchParams.get('gender');
            setGender(genderFilterParam);

            const sizesFilterParam = JSON.parse(searchParams.get('sizes'));
            setSizes(sizesFilterParam || []);

            const colorsFilterParam = JSON.parse(searchParams.get('colors'));
            setColors(colorsFilterParam || []);

            const seasonsFilterParam = JSON.parse(searchParams.get('seasons'));
            setSeasons(seasonsFilterParam || []);

            const brandsFilterParam = JSON.parse(searchParams.get('brands'));
            setBrands(brandsFilterParam || []);

            const countriesFilterParam = JSON.parse(searchParams.get('countries'));
            setCountries(countriesFilterParam || []);

            const minPriceFilterParam = searchParams.get('minPrice');
            setMinPrice(minPriceFilterParam);

            const maxPriceFilterParam = searchParams.get('maxPrice');
            setMaxPrice(maxPriceFilterParam);

            const result = await applyFilterParams(
                categoryFilterParam,
                genderFilterParam,
                minPriceFilterParam,
                maxPriceFilterParam,
                sizesFilterParam,
                colorsFilterParam,
                seasonsFilterParam,
                brandsFilterParam,
                countriesFilterParam,
            )

            if (result?.data) {
                setProducts(result.data);
            }

        })();
    }, [productsList, searchParams]);


    const productCards = [];
    products.map(product => {
        productCards.push(<ProductCard key={product.product_id}
                                       id={product.product_id}
                                       price={product.price}
                                       text={product.product_name}
                                       images={product.Images}
                                       isOpen={activeProductId === product.product_id}
                                       onClickBtn={() => toggleSizeDropdown(product.product_id)}
        />);
    })
    const handleGoBack = () => {
        router.back();
    }

    return (

        <>
            <MainLayout>
                {
                    products && products.length > 0
                        ?
                        <div className='flex flex-col w-full bg-gray-100'>
                            <div className="mx-5 mt-2">
                                    <label htmlFor="my-drawer">
                                        <svg className="w-10 h-10 pl-1 text-gray-800 dark:text-white cursor-pointer filter-icon"
                                             aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="40" height="24" fill="none"
                                             viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                                  d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
                                        </svg>
                                    </label>
                                <div className="drawer z-10 flex filter-block pl-2 ">

                                    <input ref={drawerToggleRef} id="my-drawer" type="checkbox"
                                           className="drawer-toggle"/>
                                    <div className="drawer-side">
                                        <label htmlFor="my-drawer" aria-label="close sidebar"
                                               className="drawer-overlay"></label>
                                        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 drawer-block">
                                            <CanvasFilter drawerToggleRef={drawerToggleRef} category={category}
                                                          gender={gender}
                                                          checkedOptionsColors={checkedOptionsColors}
                                                          setCheckedOptionsColors={setCheckedOptionsColors}
                                                          checkedOptionsSizes={checkedOptionsSizes}
                                                          setCheckedOptionsSizes={setCheckedOptionsSizes}
                                                          checkedOptionsSeasons={checkedOptionsSeasons}
                                                          setCheckedOptionsSeasons={setCheckedOptionsSeasons}
                                                          checkedOptionsBrands={checkedOptionsBrands}
                                                          setCheckedOptionsBrands={setCheckedOptionsBrands}
                                                          checkedOptionsCountries={checkedOptionsCountries}
                                                          setCheckedOptionsCountries={setCheckedOptionsCountries}
                                            />
                                        </div>
                                    </div>
                                    {
                                        category || gender ? null
                                            :
                                            <button className="btn btn-ghost" onClick={handleGoBack}>Очистить
                                                фильтры
                                                Х</button>

                                    }

                                    {
                                        sizes && sizes.length > 0 && (
                                            <button className="btn btn-md btn-outline filterBtn"
                                                    onClick={() => clearFilter('size')}>
                                                <div className='flex flex-row gap-2 p-1 items-center'>
                                                    {
                                                        chosenFilters.sizes.length === 1 ?
                                                            <span className='flex flex-row'>Размер: <div
                                                                className='mx-1'>{chosenFilters.sizes}</div></span>
                                                            :
                                                            <span>Размеры: {chosenFilters.sizes.length}</span>
                                                    }
                                                    <div className='text-xl font-thin ml-2'
                                                         style={{color: 'lightgray'}}>X
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    }
                                    {
                                        colors && colors.length > 0 && (
                                            <button className="btn btn-md btn-outline filterBtn"
                                                    onClick={() => clearFilter('color')}>
                                                <div className='flex flex-row gap-2 p-1 items-center'>
                                                    {
                                                        chosenFilters.colors.length === 1 ?
                                                            <span className='flex flex-row'>Цвет: <div
                                                                className='mx-1'>{chosenFilters.colors}</div></span>
                                                            :
                                                            <span>Цвета: {chosenFilters.colors.length}</span>
                                                    }
                                                    <div className='text-xl font-thin ml-2'
                                                         style={{color: 'lightgray'}}>X
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    }
                                    {
                                        seasons && seasons.length > 0 && (
                                            <button className="btn btn-md btn-outline filterBtn"
                                                    onClick={() => clearFilter('season')}>
                                                <div className='flex flex-row gap-2 p-1 items-center'>
                                                    {
                                                        chosenFilters.seasons.length === 1 ?
                                                            <span className='flex flex-row'>Сезон: <div
                                                                className='mx-1'>{chosenFilters.seasons}</div></span>
                                                            :
                                                            <span>Сезоны: {chosenFilters.seasons.length}</span>
                                                    }
                                                    <div className='text-xl font-thin ml-2'
                                                         style={{color: 'lightgray'}}>X
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    }
                                    {
                                        brands && brands.length > 0 && (
                                            <button className="btn btn-md btn-outline filterBtn"
                                                    onClick={() => clearFilter('brand')}>
                                                <div className='flex flex-row gap-2 p-1 items-center'>
                                                    {
                                                        chosenFilters.brands.length === 1 ?
                                                            <span className='flex flex-row'>Бренд: <div
                                                                className='mx-1'>{chosenFilters.brands}</div></span>
                                                            :
                                                            <span>Бренды: {chosenFilters.brands.length}</span>
                                                    }
                                                    <div className='text-xl font-thin ml-2'
                                                         style={{color: 'lightgray'}}>X
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    }
                                    {
                                        countries && countries.length > 0 && (
                                            <button className="btn btn-md btn-outline filterBtn"
                                                    onClick={() => clearFilter('country')}>
                                                <div className='flex flex-row gap-2 p-1 items-center'>
                                                    {
                                                        chosenFilters.countries.length === 1 ?
                                                            <span className='flex flex-row'>Страна: <div
                                                                className='mx-1'>{chosenFilters.countries}</div></span>
                                                            :
                                                            <span>Страны: {chosenFilters.countries.length}</span>
                                                    }
                                                    <div className='text-xl font-thin ml-2'
                                                         style={{color: 'lightgray'}}>X
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    }

                                    {
                                        minPrice && (
                                            <button className="btn btn-md btn-outline filterBtn"
                                                    onClick={() => clearFilter('minPrice')}>
                                                <div className='flex flex-row gap-2 p-1 items-center'>
                                                    <div className='flex flex-row gap-2 p-1 items-center'>
                                                    <span className='flex flex-row'>Min цена: {minPrice}
                                                        <div
                                                            className='mx-1'></div></span>
                                                        <div className='text-xl font-thin ml-2'
                                                             style={{color: 'lightgray'}}>X
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    }

                                    {
                                        !maxPrice && Number(maxPrice) !== initialMaxPrice
                                            ? ''
                                            :
                                            <button className="btn btn-md btn-outline filterBtn"
                                                    onClick={() => clearFilter('maxPrice')}>
                                                <div className='flex flex-row gap-2 p-1 items-center'>
                                                    <span className='flex flex-row'>Max цена: {maxPrice}
                                                        <div
                                                            className='mx-1'></div></span>
                                                    <div className='text-xl font-thin ml-2'
                                                         style={{color: 'lightgray'}}>X
                                                    </div>
                                                </div>
                                            </button>

                                    }

                                    {colors.length > 0 || sizes.length > 0 || brands.length > 0 || seasons.length > 0 || countries.length > 0 || minPrice || maxPrice
                                        ?
                                        (
                                            <button className="btn btn-md btn-outline filterBtn"
                                                    onClick={() => clearAllFilters()}>
                                                <div className='flex flex-row gap-2 p-1 items-center'>
                                                    Очистить все фильтры
                                                    <div className='text-xl font-thin ml-2'
                                                         style={{color: 'lightgray'}}>
                                                        X
                                                    </div>
                                                </div>
                                            </button>
                                        ) : null
                                    }
                                </div>

                            </div>
                            <div className="grid grid-cols-4 mb-10 gap-5 p-10 prod_cards">{productCards}</div>
                        </div>
                        :
                        <>
                            <div className='flex flex-col w-full bg-gray-100 items-center my-10 filter-not-found'>
                                <div className="mx-5 mt-2 text-lg p-5 flex flex-col items-center">
                                    <div>Не найдено товаров удовлетворяющих условиям поиска</div>
                                    <button style={{width: 'auto', maxWidth: 'fit-content'}}
                                            className="btn btn-primary text-white mt-1"
                                            onClick={handleGoBack}>Вернуться
                                        назад
                                    </button>
                                </div>
                            </div>
                        </>
                }
            </MainLayout>
        </>

    )
}