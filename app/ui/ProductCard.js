"use client"
import {createCartThunk} from "@/app/store/slices/cartSlice";
import {wishlistUpdateThunk, wishlistDeleteThunk} from "@/app/store/slices/wishlistSlice";
import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {getProduct} from "@/app/lib/api/products";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import Link from "next/link";
import CarouselComponentWithDots from "@/app/common/CarouselComponentWithDots";
import {toast, Toaster} from "react-hot-toast";

const sortImages = (a, b) => a.ProductImages.order_index - b.ProductImages.order_index;


const ProductCard = ({id, text, images, price, isOpen, onClick}) => {

    images.sort(sortImages);
    const dispatch = useAppDispatch();

    const [chosenSize, setChosenSize] = useState('');
    const [currentProduct, setCurrentProduct] = useState([]);


    let tempClient = '';
    let client;
    let clientId;

    if (typeof window !== "undefined") {
        tempClient = localStorage.getItem("temp-client");
        client = localStorage.getItem("client");
    }

    if (typeof window !== "undefined" && client) {
        clientId = JSON.parse(localStorage.getItem("client")).id;
    }

    const cart = useAppSelector(state => state.cart.cart);
    const wish = useAppSelector(state => state.wishlist.wishlist);

    useEffect(() => {
        (async () => {
            if (id) {
                const result = await getProduct(id);
                if (result?.data) {
                    setCurrentProduct(result.data);
                }
            }
        })()
    }, [id])

    let sizes = [];
    if (currentProduct.Sizes) {
        const sortedSizes = [...currentProduct.Sizes].sort((a, b) =>
            parseInt(a.size_name) - parseInt(b.size_name)
        );


        for (let i = 0; i < sortedSizes.length; i++) {
            let isSelected = false;
            let sizeClass = 'btn btn-ghost btn-sm';
            if (sortedSizes[i].size_name === chosenSize) {
                isSelected = true;
                if (isSelected) {
                    sizeClass = 'btn btn-ghost btn-sm underline';
                }
            }
            sizes.push(<div className={`${sizeClass}`} key={i}
                            onClick={() => setChosenSize(sortedSizes[i].size_name)}>
                {sortedSizes[i].size_name}
            </div>);
        }
    }

    const checkIfProductExistInWishlist = async () => {
        if (tempClient) {
            toast('Для добавления в wishlist необходима авторизация!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        textAlign: 'center'
                    },
                }
            );
            return;
        }
        let found = false;
        for (let i = 0; i < wish.length; i++) {
            if (wish[i] === id) {
                found = true;
                break;
            }
        }

        if (found) {
            await dispatch(wishlistDeleteThunk({id}));
        } else {
            await dispatch(wishlistUpdateThunk({id}));
        }
    }

    const classes = {
        heart: clsx(
            {'bi bi-heart': wish.indexOf(id) < 0},
            {'bi bi-heart-fill': wish.indexOf(id) > -1},
        ),
    }

    let quantity = 0;
    if (cart && cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === id) {
                quantity = cart[i].count;
            }
        }
    }

    let imagePathsInCarousel = [];
    if (images && images.length > 0) {
        images.map(image => imagePathsInCarousel.push(image.image_path));
    }

    return (
        <>
            <div className="card shadow-xl z-0 group relative">
                <div className="cursor-pointer" onClick={(event) => {
                    event.stopPropagation();
                }}>
                    {
                        images && images.length > 0
                            ?
                            <>
                                <Link href={`/product/${id}`}>
                                    <div><CarouselComponentWithDots paths={imagePathsInCarousel}
                                    /></div>
                                </Link>
                            </>
                            : null
                    }
                </div>

                <div
                    className="absolute -top-2 right-9 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <h1>
                        <i className={classes.heart} onClick={async (event) => {
                            event.stopPropagation();
                            await checkIfProductExistInWishlist();
                        }}></i>
                    </h1>
                </div>
                <div className="flex flex-col pb-12">
                    <div className="flex flex-col">

                        <div className="flex flex-col items-center p-2.5 text-lg">
                            <div>{text}</div>
                            <div className="text-lg">{price}<span className="ml-1">₽</span></div>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="flex flex-row items-center justify-center p-1 mb-3">
                            <div className="flex flex-row flex-wrap">{sizes}</div>
                        </div>
                    )
                    }
                    <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100
                transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <button
                            className="btn w-full bg-white/20 hover:bg-white/30 text-neutral
              backdrop-blur-md border border-white/20 hover:border-white/30
              shadow-sm hover:shadow-md
              transition-all duration-200 ease-in-out
              hover:scale-[1.02] active:scale-100"
                            onClick={async (event) => {
                                await onClick();
                                event.stopPropagation();
                                if (chosenSize && client) {
                                    await dispatch(createCartThunk({
                                        clientId: clientId,
                                        productId: id,
                                        productSize: chosenSize,
                                        quantity: 1
                                    }));
                                    setChosenSize('');
                                }
                                if (chosenSize && tempClient) {
                                    await dispatch(createCartThunk({
                                        productId: id,
                                        productSize: chosenSize,
                                        quantity: 1
                                    }));
                                    setChosenSize('');
                                }
                            }}>
                            Добавить в корзину
                        </button>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}
export default ProductCard;