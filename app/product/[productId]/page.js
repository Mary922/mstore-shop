"use client"
import {useParams} from "next/navigation";
import React, {useState, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {getProduct} from "@/app/lib/api/products";
import CarouselComponent from "@/app/common/CarouselComponent";


export default function ProductPage() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const productId = params.productId;
    console.log('productId', productId);

    const [currentProduct, setCurrentProduct] = useState([]);
    const [productPrice, setProductPrice] = useState([]);
    const [chosenSize, setChosenSize] = useState('');
    const [images, setImages] = useState([]);
    const [sizesIsShowing, setSizesIsShowing] = useState(false);

    console.log('currentProduct', currentProduct);

    const cartList = useAppSelector((state) => state.cart.cart);

    let clientId;
    const tempClient = localStorage.getItem("temp-client");
    const client = JSON.parse(localStorage.getItem("client"));
    if (client) {
        clientId = client.id;
    }

    useEffect(() => {
        if (cartList && cartList.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cartList));
        }
    },[cartList]);


    useEffect(() => {
        (async () => {
            if (productId) {
                const result = await getProduct(productId);
                console.log('one product',result.data);
                if (result?.data) {
                    setCurrentProduct(result.data);
                }
                if (result?.data?.price) {
                    setProductPrice(result.data.price);
                }
                if (result?.data?.Images) {
                    setImages(result.data.Images);
                }
            }
        })()
    },[])


    const wish = useAppSelector(state => state.wishlist.wishlist);

    const checkIfProductExistInWishlist = async () => {
        const found = wish.includes(currentProduct.product_id);

        if (found) {
            await dispatch(wishlistDeleteThunk({id: productId}));
        } else {
            await dispatch(wishlistUpdateThunk({id: productId}));
        }
    }

    // const classes = {
    //     heart: clsx(
    //         {'bi bi-heart': wish.indexOf(currentProduct.product_id) < 0},
    //         {'bi bi-heart-fill': wish.indexOf(currentProduct.product_id) > -1},
    //     ),
    //     size: clsx(
    //         {'chosen-size': chosenSize},
    //     )
    // }

    let colors = [];
    if (currentProduct.Colors) {
        for (let i = 0; i < currentProduct.Colors.length; i++) {
            colors.push(currentProduct.Colors[i].color_name.toLowerCase()+' ');
        }
    }

    let sizes = [];
    if (currentProduct.Sizes) {
        for (let i = 0; i < currentProduct.Sizes.length; i++) {
            let isSelected = false;
            let sizeClass = '';
            if (currentProduct.Sizes[i].size_name === chosenSize) {
                isSelected = true;
                if (isSelected) {
                    sizeClass = 'chosen-size'
                }
            }
            sizes.push(<div className={`${sizeClass}`} key={i} onClick={()=>checkFilledSize(currentProduct.Sizes[i])}>{currentProduct.Sizes[i].size_name}</div>)
        }
    }

    const cart = useAppSelector(state => state.cart.cart);

    let quantity = 0;
    if (cart && cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === currentProduct.product_id) {
                quantity += cart[i].count;
            }
        }
    }
    console.log('quantity',quantity);
    console.log('cart',cart);

    const payload = {
        id: currentProduct.product_id ,
        price: currentProduct.price,
    }

    const checkFilledSize = (size) => {
        if (size) {
            setChosenSize(size.size_name);
        }
    }

    let imagePathsInCarousel = [];
    if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            imagePathsInCarousel.push(images[i].image_path);
        }
    }

    const increaseCount = async (productId, sizeId) => {
        await dispatch(increaseCartThunk({productId: productId, sizeId: sizeId}));
        if (tempClient) {
            await dispatch(getCartThunk(tempClient));
        }
        await dispatch(getCartThunk(clientId));
    }
    const decreaseCount = async (productId, sizeId) => {
        await dispatch(decreaseCartThunk({productId: productId, sizeId: sizeId}));
        if (tempClient) {
            await dispatch(getCartThunk(tempClient));
        }
        await dispatch(getCartThunk(clientId));
    }

    return (
        <>
            <div className="grid grid-cols-[400px_1fr] bg-yellow-50 h-screen w-full">
                <div className="flex bg-blue-400 w-full h-full ">
                    {
                        images && images.length > 0
                            ? (
                                <div className="bg-orange-400 w-full h-auto rounded-box">
                            <CarouselComponent paths={imagePathsInCarousel}
                            />
                                </div>
                            ) : null
                    }
                </div>
                <div className="p-4 text-xl">
                    <div>{currentProduct.product_id}</div>
                    <div>Название: {currentProduct.product_name}</div>
                    <div>{currentProduct.price} P</div>
                    <div>Цвет: {colors}</div>
                    <div>Производитель: {currentProduct?.Brand ? currentProduct.Brand.brand_name : ''} </div>
                    <div>Страна: {currentProduct?.Country ? currentProduct.Country.country_name : ''} </div>
                    {/*<div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>Размер: {sizes}</div>*/}

                    {/*{productsListInCart}*/}
                    {
                        sizesIsShowing ? <>
                            <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>{sizes}</div>
                            <div onClick={() => setSizesIsShowing(false)}>X</div>
                        </> : null
                    }

                    {/*<div className={'minus-zero-plus'}>*/}
                    {/*    <div style={{cursor: 'pointer'}} onClick={() => {*/}
                    {/*             decreaseCount(currentProduct.product_id, currentProduct.product_size)*/}
                    {/*         }}>-*/}
                    {/*    </div>*/}
                    {/*    {quantity}*/}
                    {/*    <div style={{cursor: 'pointer'}} onClick={() => {*/}
                    {/*        setSizesIsShowing(true);*/}
                    {/*        increaseCount(currentProduct.product_id, chosenSize);*/}
                    {/*    }}>+*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <button
                        className="h-10 mt-3 flex justify-center items-center cursor-pointer rounded-md
                                bg-primary px-4 py-3 text-center text-sm font-semibold uppercase text-white
                                transition duration-200 ease-in-out hover:bg-gray-900"
                        onClick={
                            async (event) => {
                                setSizesIsShowing(true);
                                if (chosenSize && client) {
                                    await dispatch(createCartThunk({
                                        clientId: clientId,
                                        productId: currentProduct.product_id,
                                        productSize: chosenSize,
                                        quantity: 1
                                    }));
                                    setChosenSize('');
                                    setSizesIsShowing(false);
                                }
                                if (chosenSize && tempClient) {
                                    await dispatch(createCartThunk({
                                        productId: currentProduct.product_id,
                                        productSize: chosenSize,
                                        quantity: 1
                                    }));
                                    setChosenSize('');
                                    setSizesIsShowing(false);
                                }
                            }
                        }>
                        Добавить в
                        корзину
                    </button>
                </div>
            </div>
        </>
    )


}