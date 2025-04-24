"use client"

import React, {useEffect, useState} from "react";
import {getProductsByIds} from "@/app/lib/api/products";
import ProductCard from "@/app/ui/ProductCard";
import CanvasFilter from "@/app/ui/CanvasFilter";
import {useRouter, useSearchParams} from "next/navigation";
import {useAppSelector} from "@/app/lib/hooks";
import CanvasFiltered from "@/app/ui/CanvasFiltered";
import MainLayout from "@/app/ui/MainLayout";


export default function SearchPage({category}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const productsList = useAppSelector(state => state.common.filteredProductIds);
    const [products, setProducts] = useState([]);

    const categoryFilterParam = searchParams.get('category');
    console.log("categoryFilterParam", categoryFilterParam);

    const sizesFilterParam = JSON.parse(searchParams.get('sizes'));
    console.log("sizesFilterParam", sizesFilterParam);

    const colorsFilterParam = JSON.parse(searchParams.get('colors'));
    console.log("colorsFilterParam", colorsFilterParam);

    const seasonsFilterParam = JSON.parse(searchParams.get('seasons'));
    console.log("seasonsFilterParam", seasonsFilterParam);

    const brandsFilterParam = JSON.parse(searchParams.get('brands'));
    console.log("brandsFilterParam", brandsFilterParam);

    const countriesFilterParam = JSON.parse(searchParams.get('countries'));
    console.log("countriesFilterParam", countriesFilterParam);

    const minPriceFilterParam = searchParams.get('minPrice');
    console.log("minPriceFilterParam", minPriceFilterParam);

    const maxPriceFilterParam = searchParams.get('maxPrice');
    console.log("maxPriceFilterParam", maxPriceFilterParam);

    // let chosenSizes = [];
    // useEffect(()=>{
    //     if (sizesFilterParam) {
    //         sizesFilterParam.forEach((size) => chosenSizes.push(size))
    //     }
    // })
    // console.log('chosenSizes',chosenSizes);


    useEffect(() => {
        (async () => {
            if (productsList && productsList.length > 0) {
                const result = await getProductsByIds(productsList);
                // console.log('result PROD',result);
                if (result?.data) {
                    setProducts(result.data);
                }
            }

            // const url = window.location.href;
            // const searchParams = new URLSearchParams(url);
            // console.log('searchParams',searchParams);

        })();
    }, [productsList]);


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
            <div className='flex flex-col w-full'>
                <div>
                    <div className="drawer mb-5 z-10 flex">
                        <label htmlFor="my-drawer">
                            <svg className="w-full h-full text-gray-800 dark:text-white cursor-pointer"
                                 aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="40" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                      d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
                            </svg>
                        </label>

                        <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                <CanvasFiltered filteredSizes={sizesFilterParam}/>
                            </div>
                        </div>
                        <button className="btn btn-ghost" onClick={handleGoBack}>Очистить фильтры Х</button>
                        {
                            sizesFilterParam ? <div></div> : ''
                        }

                    </div>

                </div>

                <div className="grid grid-cols-4 gap-4">{productCards}</div>
            </div>
            </MainLayout>
        </>
    )
}