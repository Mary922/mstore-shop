"use client"

import React, {useEffect, useRef, useState} from "react";
import ProductCard from "@/app/ui/ProductCard";
import {useRouter, useSearchParams} from "next/navigation";
import {useAppSelector} from "@/app/lib/hooks";
import MainLayout from "@/app/ui/MainLayout";
import {applyFilterParams} from "@/app/lib/api/filter";
import CanvasFilter from "@/app/ui/CanvasFilter";


export default function CatalogPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const drawerToggleRef = useRef(null);


    const productsList = useAppSelector(state => state.common.filteredProductIds);
    console.log('productsList',productsList);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [gender, setGender] = useState(null);


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
            console.log("categoryFilterParam22", categoryFilterParam);
            setCategory(categoryFilterParam);

            const genderFilterParam = searchParams.get('gender');
            console.log("genderFilterParam4444", genderFilterParam);
            setGender(genderFilterParam);

            const sizesFilterParam = JSON.parse(searchParams.get('sizes'));
            // console.log("sizesFilterParam", sizesFilterParam);

            const colorsFilterParam = JSON.parse(searchParams.get('colors'));
            // console.log("colorsFilterParam", colorsFilterParam);

            const seasonsFilterParam = JSON.parse(searchParams.get('seasons'));
            // console.log("seasonsFilterParam", seasonsFilterParam);

            const brandsFilterParam = JSON.parse(searchParams.get('brands'));
            // console.log("brandsFilterParam", brandsFilterParam);

            const countriesFilterParam = JSON.parse(searchParams.get('countries'));
            // console.log("countriesFilterParam", countriesFilterParam);

            const minPriceFilterParam = searchParams.get('minPrice');
            // console.log("minPriceFilterParam", minPriceFilterParam);

            const maxPriceFilterParam = searchParams.get('maxPrice');
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
            console.log("result of FILTERRR", result);

            if (result?.data) {
                setProducts(result.data);
            }



            // if (productsList && productsList.length > 0) {



                // const result = await getProductsByIds(productsList);
                // // console.log('result PROD',result);
                // if (result?.data) {
                //     setProducts(result.data);
                // }
            // }

            // const url = window.location.href;
            // const searchParams = new URLSearchParams(url);
            // console.log('searchParams',searchParams);

        })();
    }, [productsList,searchParams]);


    // console.log('products', products);

    const productCards = [];
    products.map(product => {
        productCards.push(<ProductCard key={product.product_id}
                                       id={product.product_id}
                                       price={product.price}
                                       text={product.product_name}
                                       images={product.Images}
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

                                            {/*<CanvasFiltered filteredSizes={sizesFilterParam}/>*/}

                                            <CanvasFilter drawerToggleRef={drawerToggleRef} category={category}
                                                          gender={gender}/>
                                        </div>
                                    </div>
                                    <button className="btn btn-ghost" onClick={handleGoBack}>Очистить фильтры Х</button>


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