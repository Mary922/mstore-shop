"use client"

import React, {useEffect, useRef, useState} from "react";
import ProductCard from "@/app/ui/ProductCard";
import {useRouter, useSearchParams} from "next/navigation";
import {useAppSelector} from "@/app/lib/hooks";
import MainLayout from "@/app/ui/MainLayout";
import {applyFilterParams} from "@/app/lib/api/filter";
import CanvasFilter from "@/app/ui/CanvasFilter";
import {getMaxPrice} from "@/app/lib/api/prices";


export default function CatalogPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const drawerToggleRef = useRef(null);


    const productsList = useAppSelector(state => state.common.filteredProductIds);
    // console.log('productsList',productsList);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [gender, setGender] = useState(null);

    const [activeProductId, setActiveProductId] = useState(null);
    const [filterApplied, setFilterApplied] = useState(false);

    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [countries, setCountries] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(null);
    const [initialMaxPrice, setInitialMaxPrice] = useState(null);

    useEffect(()=> {
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
    },[])

    const updateQueryParameter = (key, value) => {
        const nextParams = new URLSearchParams(searchParams.toString()); // Копия текущих параметров

        if (value === '') {
            nextParams.delete(key); // Удаляем параметр, если значение пустое
        } else {
            nextParams.set(key, value); // Иначе устанавливаем новое значение
        }
        router.push(`?${nextParams.toString()}`, undefined, { scroll: false });
    };


    const clearFilter = (type) => {
        switch(type) {
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
                updateQueryParameter('maxPrice', initialMaxPrice);
                break;
            default:
                break;
        }
    };

    const toggleSizeDropdown = (id) => {
        if(activeProductId === id){
            setActiveProductId(null);   // Закрываем список, если кликнули повторно на открытом товаре
        } else{
            setActiveProductId(id);     // Открываем список для нового товара
        }
    };


    // let chosenSizes = [];
    // useEffect(()=>{
    //     if (sizesFilterParam) {
    //         sizesFilterParam.forEach((size) => chosenSizes.push(size))
    //     }
    // })
    // console.log('chosenSizes',chosenSizes);



    useEffect(() => {
        (async () => {
            const categoryFilterParam = searchParams.get('category');
            // console.log("categoryFilterParam22", categoryFilterParam);
            setCategory(categoryFilterParam);

            const genderFilterParam = searchParams.get('gender');
            // console.log("genderFilterParam4444", genderFilterParam);
            setGender(genderFilterParam);

            const sizesFilterParam = JSON.parse(searchParams.get('sizes'));
            setSizes(sizesFilterParam || []);
            // console.log("sizesFilterParam", sizesFilterParam);

            const colorsFilterParam = JSON.parse(searchParams.get('colors'));
            setColors(colorsFilterParam || []);
            // console.log("colorsFilterParam", colorsFilterParam);

            const seasonsFilterParam = JSON.parse(searchParams.get('seasons'));
            setSeasons(seasonsFilterParam || []);
            // console.log("seasonsFilterParam", seasonsFilterParam);

            const brandsFilterParam = JSON.parse(searchParams.get('brands'));
            setBrands(brandsFilterParam || []);

            // console.log("brandsFilterParam", brandsFilterParam);

            const countriesFilterParam = JSON.parse(searchParams.get('countries'));
            setCountries(countriesFilterParam || []);
            // console.log("countriesFilterParam", countriesFilterParam);

            const minPriceFilterParam = searchParams.get('minPrice');
            setMinPrice(minPriceFilterParam);
            // console.log("minPriceFilterParam", minPriceFilterParam);

            const maxPriceFilterParam = searchParams.get('maxPrice');
            setMaxPrice(maxPriceFilterParam);
            // console.log("maxPriceFilterParam", maxPriceFilterParam);

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
            // console.log("result of FILTERRR", result);

            if (result?.data) {
                setProducts(result.data);
            }
            // if (colorsFilterParam) {
            //     // setFilterApplied(true);
            //     // console.log('dadada')
            //     setColors(colorsFilterParam);
            // }

        })();
    }, [productsList,searchParams]);


    // const handleClearAllFilters = () => {
    //     setColors([]);
    //     // очищаем другие состояния фильтров
    //     router.push(router.asPath.split('?')[0], undefined, { scroll: false });
    // };

    // const handleClearColors = () => {
    //     setColors([]);
    //     updateQueryParameter('colors', ''); // Очищаем параметр цвета
    // };


    const productCards = [];
    products.map(product => {
        productCards.push(<ProductCard key={product.product_id}
                                       id={product.product_id}
                                       price={product.price}
                                       text={product.product_name}
                                       images={product.Images}
                                       isOpen={activeProductId === product.product_id}
                                       onClick={() => toggleSizeDropdown(product.product_id)}
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
                                <div className="drawer z-10 flex">
                                    <label htmlFor="my-drawer">
                                        <svg className="w-full h-full text-gray-800 dark:text-white cursor-pointer"
                                             aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="40" height="24" fill="none"
                                             viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                                  d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
                                        </svg>
                                    </label>

                                    <input ref={drawerToggleRef} id="my-drawer" type="checkbox"
                                           className="drawer-toggle"/>
                                    <div className="drawer-side">
                                        <label htmlFor="my-drawer" aria-label="close sidebar"
                                               className="drawer-overlay"></label>
                                        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                            <CanvasFilter drawerToggleRef={drawerToggleRef} category={category}
                                                          gender={gender}/>
                                        </div>
                                    </div>
                                    {
                                        category || gender ? null
                                            :
                                            <button className="btn btn-ghost" onClick={handleGoBack}>Очистить фильтры
                                                Х</button>

                                    }

                                    {/*{*/}
                                    {/*    filterApplied && (*/}
                                    {/*        <button className="btn btn-ghost" onClick={handleGoBack}>Цвет*/}
                                    {/*            Х</button>)*/}
                                    {/*}*/}

                                    {
                                        sizes && sizes.length > 0 && (
                                            <button className="btn btn-ghost" onClick={() => clearFilter('size')}>
                                                Очистить размеры Х
                                            </button>
                                        )
                                    }
                                    {
                                        brands && brands.length > 0 && (
                                            <button className="btn btn-ghost" onClick={() => clearFilter('brand')}>
                                                Очистить бренды Х
                                            </button>
                                        )
                                    }
                                    {
                                        countries && countries.length > 0 && (
                                            <button className="btn btn-ghost" onClick={() => clearFilter('country')}>
                                                Очистить страны Х
                                            </button>
                                        )
                                    }
                                    {
                                        colors && colors.length > 0 && (
                                            <button className="btn btn-ghost" onClick={() => clearFilter('color')}>
                                                Очистить цвета Х
                                            </button>
                                        )
                                    }
                                    {
                                        seasons && seasons.length > 0 && (
                                            <button className="btn btn-ghost" onClick={() => clearFilter('season')}>
                                                Очистить сезон Х
                                            </button>
                                        )
                                    }
                                    {
                                        minPrice && (
                                            <button className="btn btn-ghost" onClick={() => clearFilter('minPrice')}>
                                                Очистить min цену Х
                                            </button>
                                        )
                                    }
                                    {
                                        maxPrice ?
                                            <button className="btn btn-ghost" onClick={() => clearFilter('maxPrice')}>
                                                Очистить max цену Х
                                            </button> : null
                                    }
                                {/*    {*/}
                                {/*        maxPrice && maxPrice > 0 ? 'f' :*/}
                                {/*            <button className="btn btn-ghost" onClick={() => clearFilter('maxPrice')}>*/}
                                {/*    Очистить max цену Х*/}
                                {/*</button>*/}
                                {/*    }*/}


                                    {/*{*/}
                                    {/*    colors &&*/}
                                    {/*    <button className="btn btn-ghost" onClick={handleClearColors}>*/}
                                    {/*        Очистить цвета*/}
                                    {/*    </button>*/}
                                    {/*}*/}


                                    {/*{*/}
                                    {/*    sizesFilterParam ? <div></div> : ''*/}
                                    {/*}*/}

                                </div>

                            </div>

                            <div className="grid grid-cols-4 mb-10 gap-5 p-10">{productCards}</div>
                        </div>
                        :
                        <>
                            <div className='flex flex-col w-full bg-gray-100 items-center my-10'>
                                <div className="mx-5 mt-2 text-lg p-5 flex flex-col items-center">
                                    <div>Не найдено товаров удовлетворяющих условиям поиска</div>
                                    <button style={{ width: 'auto', maxWidth: 'fit-content' }} className="btn btn-primary text-white mt-1" onClick={handleGoBack}>Вернуться назад</button>
                                </div>
                            </div>
                                </>
                                }
                            </MainLayout>
                        </>
                    )
                }