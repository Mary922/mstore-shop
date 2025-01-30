"use client"
import {useEffect, useState} from "react";
import React from 'react';
import {useRouter} from "next/router";

import { useParams } from 'next/navigation';
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {getProductCategories} from "@/app/lib/api/productCategories";
import ProductCard from "@/app/ui/ProductCard";
import CarouselComponent from "@/app/common/CarouselComponent";

export default function CategoryPage() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const categoryId = params.categoryId;


    const [products, setProducts] = useState([]);
    const [imagePath, setImagePath] = useState('');
    const [sizes, setSizes] = useState([]);


    const cartList = useAppSelector((state) => state.cart.cart);

    // const show = useAppSelector((state) => state.common.canvasLeftOnShow);

    useEffect(()=>{
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
    },[categoryId])


    let productName = '';
    let path = '';
    let arrayOfProducts = [];

    for (let i=0; i < products.length; i++) {
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
                <div className="grid grid-cols-3 gap-4">{arrayOfProducts}</div>


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


//
// {/*<div style={{display: 'flex', flexDirection: 'row',alignItems: 'center',gap: '10px'}}>*/}
// {/*    <i onClick={()=>dispatch(changeFilterCanvas(true))} style={{fontSize: '35px',marginLeft: '30px',cursor:'pointer'}} className="bi bi-filter"></i>*/}
// {/*    {*/}
// {/*        show ? <><CanvasFilter category={currentCategoryId} show={show} placement={'start'}/></> : null*/}
// {/*    }*/}
            // {/*    <div>Фильтр</div>*/}
            // {/*</div>*/}
            // {/*<CardGroup className={'productcard-group'}>{arrayOfProducts}</CardGroup>*/}
