"use client"
import React, {useEffect, useState} from 'react';
import {getProductsInWishlistByIds, getWishlist} from "@/app/lib/api/wishlist";
import Link from "next/link";
import {wishlistDeleteThunk} from "@/app/store/slices/wishlistSlice";
import {useAppDispatch} from "@/app/lib/hooks";

export default function Wishlist() {
    const dispatch = useAppDispatch();
    let baseUrl = 'http://localhost:3001/images';
    const [wishlistProductIds, setWishlistProductIds] = useState([]);
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await getWishlist();

            let prodIds = [];
            if (res && res.data) {
                res.data.map(prod => prodIds.push(prod.product_id));
                setWishlistProductIds(prodIds);
            }
        })();
    }, [])

    useEffect(() => {
        if (wishlistProductIds && wishlistProductIds.length > 0) {
            (async () => {
                const productsListInWishlist = await getProductsInWishlistByIds(wishlistProductIds);
                console.log('productsListInWishlist', productsListInWishlist)

                setProducts(productsListInWishlist?.data);


                if (productsListInWishlist?.data) {
                    productsListInWishlist.data.map(prod => {
                        setImages(prod.Images)
                    })
                    // setImages(productsListInWishlist?.data.Images);
                }
            })();
        }
    }, [wishlistProductIds]);

    console.log('products', products);
    console.log('images', images);

    // useEffect(()=>{
    //     if (products && products.length > 0) {
    //         (async () => {
    //             setImages(products.Images);
    //         })()
    //     }
    // }, [products]);
    // console.log('images',images);

    let productsInWishlist = [];

    if (products) {
        productsInWishlist = products.map(product => {
            return (
                <div key={product.product_id} className='card bg-base-100 shadow-xl'>
                    <div className="flex flex-row mb-5 items-center">
                        <button className="btn btn-square btn-sm mr-2" onClick={async ()=>{
                            await dispatch(wishlistDeleteThunk({id: product.product_id}));
                            window.location.reload();
                        }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <div>Удалить</div>
                    </div>
                    <img className={'w-full h-auto'} src={`${baseUrl}/${product.Images[0].image_path}`}/>
                    <div className='card-body'>
                        <h2 className="card-title">
                            <div>{product.product_name}</div>
                        </h2>
                        <p>{product.price}Р</p>
                        <div className="card-actions justify-end">
                            <Link href={`/product/${product.product_id}`}>
                                <button className="btn btn-primary">Купить сейчас</button></Link>
                        </div>
                    </div>
                </div>
            )
        })
    }


    return (
        <>
            <div className={'grid grid-cols-3 gap-4'}>{productsInWishlist}</div>
        </>
    )
}