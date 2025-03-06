"use client"
import {useEffect, useState} from "react";
import React from 'react';

import {useParams} from 'next/navigation';
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {getProductCategories} from "@/app/lib/api/productCategories";
import ProductCard from "@/app/ui/ProductCard";
import CarouselComponent from "@/app/common/CarouselComponent";
import FilterComponent from "@/app/ui/FilterComponent";
import CanvasFilter from "@/app/ui/CanvasFilter";

export default function CategoryPage() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const categoryId = params.categoryId;

    const [show, setShow] = useState(false);


    const [products, setProducts] = useState([]);
    const [imagePath, setImagePath] = useState('');
    const [sizes, setSizes] = useState([]);


    const cartList = useAppSelector((state) => state.cart.cart);

    // const show = useAppSelector((state) => state.common.canvasLeftOnShow);

    useEffect(() => {
        (async () => {
            if (categoryId) {
                try {
                    const result = await getProductCategories(categoryId);
                    // console.log('responseRes',result);
                    const products = result.data;
                    setProducts(products);

                } catch (error) {
                    console.log(error);
                }
            }

        })();
    }, [categoryId])


    let productName = '';
    let path = '';
    let arrayOfProducts = [];

    for (let i = 0; i < products.length; i++) {
        arrayOfProducts.push(<ProductCard key={products[i].product_id}
                                          images={products[i].Images}
                                          id={products[i].product_id}
                                          text={products[i].product_name}
                                          price={products[i].price}
                                          path={imagePath}
        />);
    }


//     // const handleFilterShow = () => {
//     //     console.log('handleFilterShow',filterIsShow);
//     //     setFilterIsShow(!filterIsShow);
//     // }
//

    return (
        <>
            <div className="flex flex-col w-full">
                <div>
                    <div className="drawer mb-5 z-10 flex">
                        <label htmlFor="my-drawer">
                            <svg className="w-full h-10 text-gray-800 dark:text-white cursor-pointer"
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
                                <CanvasFilter category={categoryId}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/*<FilterComponent category={categoryId}/>*/}

                {/*<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>*/}
                    {/*    <i onClick={() => setShow(!show)}*/}
                    {/*       style={{fontSize: '35px', marginLeft: '30px', cursor: 'pointer'}} className="bi bi-filter"></i>*/}
                    {/*</div>*/}


                    {/*{*/}
                    {/*    show ? <><CanvasFilter category={categoryId} show={show} placement={'start'}/></> : null*/}
                    {/*}*/}
                    {/*<div>Фильтр</div>*/}


                    <div className="grid grid-cols-4 mb-10 gap-4">{arrayOfProducts}</div>
                </div>
                <div>

                </div>


                {/*<div className="card-body">*/}
                {/*    <h2 className="card-title">Shoes!</h2>*/}
                {/*    <p>If a dog chews shoes whose shoes does he choose?</p>*/}
                {/*    <div className="card-actions justify-end">*/}
                {/*        <button className="btn btn-primary">Buy Now</button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </>
            )
            }
