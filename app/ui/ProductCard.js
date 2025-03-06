"use client"
import {createCartThunk} from "@/app/store/slices/cartSlice";
import {wishlistUpdateThunk, wishlistDeleteThunk} from "@/app/store/slices/wishlistSlice";
import React, {useEffect, useState} from "react";
import clsx from "clsx";
import CarouselComponent from "../common/CarouselComponent";
import {getProduct} from "@/app/lib/api/products";
import {getImagesStatic} from "@/app/lib/api/images";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import Link from "next/link";

const ProductCard = ({id, text, images, price, path}) => {
    const dispatch = useAppDispatch();
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

    const [chosenSize, setChosenSize] = useState('');
    const [currentProduct, setCurrentProduct] = useState([]);

    const [sizesIsShowing, setSizesIsShowing] = useState(false);

    const [index, setIndex] = useState(0);

    let clientId, tempClient;
    const client = JSON.parse(localStorage.getItem("client"));
    tempClient = localStorage.getItem("temp-client");
    if (client) {
        clientId = client.id;
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
    // console.log('CURRENT PRODUCT',currentProduct);

    const checkFilledSize = (size) => {
        // console.log(size);
        if (size) {
            setChosenSize(size.size_name);
        }
    }

    let sizes = [];
    if (currentProduct.Sizes) {
        for (let i = 0; i < currentProduct.Sizes.length; i++) {
            let isSelected = false;
            let sizeClass = 'btn btn-ghost btn-sm';
            if (currentProduct.Sizes[i].size_name === chosenSize) {
                isSelected = true;
                if (isSelected) {
                    sizeClass = 'btn btn-ghost btn-sm underline';
                }
            }
            sizes.push(<div className={`${sizeClass}`} key={i}
                            onClick={() => checkFilledSize(currentProduct.Sizes[i])}>{currentProduct.Sizes[i].size_name}</div>)
        }
    }

    const checkIfProductExistInWishlist = async () => {
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


    const payload = {
        id: id,
        price: price,
        size: chosenSize,
    }

    let imagePathsInCarousel = [];
    images.map(image => imagePathsInCarousel.push(image.image_path));

    // hover:scale-105 transition-all duration-2000

    return (
        <>
            <div className="card bg-fuchsia-400 shadow-xl z-0">
                <div className="cursor-pointer" onClick={(event) => {
                    event.stopPropagation();
                }}>
                    {
                        images && images.length > 0
                            ?
                            <>
                                <Link href={`/product/${id}`}>
                                    <div><CarouselComponent paths={imagePathsInCarousel}
                                                            activeIndex={index}
                                        // className={'d-block w-100'}
                                    /></div>
                                </Link>
                            </>
                            : null
                    }
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <div className="flex justify-end">
                            <h1><i className={classes.heart} onClick={event => {
                                event.stopPropagation();
                                checkIfProductExistInWishlist();
                            }}></i></h1>
                        </div>
                        <div className="flex flex-col items-center">
                            <div>
                                {id}
                                {text}
                            </div>
                            <div>{price}Р</div>
                        </div>
                    </div>

                    {
                        sizesIsShowing ? <>
                            <div className="flex flex-row bg-yellow-200 items-center justify-center">
                                <div className="flex flex-row flex-wrap">{sizes}</div>
                                <div className="cursor-pointer" onClick={() => setSizesIsShowing(false)}>X</div>
                            </div>
                        </> : null
                    }
                    <button className="btn btn-primary w-full" onClick={async (event) => {
                        setSizesIsShowing(true);
                        event.stopPropagation();
                        if (chosenSize && client) {
                            await dispatch(createCartThunk({
                                clientId: clientId,
                                productId: id,
                                productSize: chosenSize,
                                quantity: 1
                            }));
                            setChosenSize('');
                            setSizesIsShowing(false);
                        }
                        if (chosenSize && tempClient) {
                            await dispatch(createCartThunk({
                                productId: id,
                                productSize: chosenSize,
                                quantity: 1
                            }));
                            setChosenSize('');
                            setSizesIsShowing(false);
                        }
                    }}>Добавить в
                        корзину
                    </button>
                </div>
                <div>
                </div>
            </div>
        </>
    )
}
export default ProductCard;