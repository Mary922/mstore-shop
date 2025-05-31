"use client"
import {useParams} from "next/navigation";
import React, {useState, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {getProduct} from "@/app/lib/api/products";
import CarouselComponentWithDots from "@/app/common/CarouselComponentWithDots";
import {createCartThunk} from "@/app/store/slices/cartSlice";
import MainLayout from "@/app/ui/MainLayout";


export default function ProductPage() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const productId = params.productId;

    const [currentProduct, setCurrentProduct] = useState([]);
    const [chosenSize, setChosenSize] = useState('');
    const [images, setImages] = useState([]);
    const [showSelectWarning, setShowSelectWarning] = useState(false);

    const cartList = useAppSelector((state) => state.cart.cart);

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

    useEffect(() => {
        if (cartList && cartList.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cartList));
        }
    }, [cartList]);


    useEffect(() => {
        (async () => {
            if (productId) {
                const result = await getProduct(productId);
                if (result?.data) {
                    setCurrentProduct(result.data);
                }
                if (result?.data?.Images) {
                    setImages(result.data.Images);
                }
            }
        })()
    }, [])

    let colors = [];
    if (currentProduct.Colors) {
        for (let i = 0; i < currentProduct.Colors.length; i++) {
            colors.push(currentProduct.Colors[i].color_name.toLowerCase() + ' ');
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
                    sizeClass = 'btn btn-ghost btn-sm underline'
                }
            }
            sizes.push(<div className={`${sizeClass}`} key={i}
                            onClick={() => checkFilledSize(currentProduct.Sizes[i])}>{currentProduct.Sizes[i].size_name}</div>)
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

    const checkFilledSize = (size) => {
        if (size) {
            setChosenSize(size.size_name);
            setShowSelectWarning(false);
        }
    }

    let imagePathsInCarousel = [];
    if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            imagePathsInCarousel.push(images[i].image_path);
        }
    }

    return (
        <>
            <MainLayout>
                <div className="grid grid-cols-[400px_1fr] px-5 gap-20 py-10 w-full">
                    <div className="flex w-full h-full mx-auto">
                        {
                            images && images.length > 0
                                ? (
                                    <div className=" w-full h-auto rounded-box">
                                        <CarouselComponentWithDots paths={imagePathsInCarousel}
                                        />
                                    </div>
                                ) : null
                        }
                    </div>
                    <div className="px-4 text-xl ">
                        <div className='font-bold'>{currentProduct.product_name}</div>
                        <div><span className='font-bold'>Цена: </span>{currentProduct.price} ₽</div>
                        <div><span className='font-bold'>Цвет: </span> {colors}</div>
                        <div><span
                            className='font-bold'>Производитель: </span> {currentProduct?.Brand ? currentProduct.Brand.brand_name : ''}
                        </div>
                        <div><span
                            className='font-bold'>Страна:</span> {currentProduct?.Country ? currentProduct.Country.country_name : ''}
                        </div>
                        <div><span
                            className='font-bold'>Сезон:</span> {currentProduct?.Season ? currentProduct.Season.season_name : ''}
                        </div>
                        {
                            currentProduct?.product_description ?
                                <div><span
                                    className='font-bold'>Дополнительная информация: </span>{currentProduct?.product_description ? currentProduct.product_description : ''}
                                </div>
                                : null

                        }

                        <div className='flex flex-row'><span>Размер</span>
                            <div className='flex flex-row gap-2 cursor-pointer'>{sizes}</div>
                        </div>
                        <div className='flex flex-row items-center'>
                            <div className="flex flex-col">
                                {showSelectWarning && (
                                    <label className="text-red-500 text-sm">Выберите размер</label>
                                )}

                                <button
                                    className="h-10 mt-1 flex justify-center items-center cursor-pointer rounded-md
                                bg-neutral px-4 py-3 text-center text-sm uppercase text-white
                                transition duration-200 ease-in-out hover:bg-gray-600"
                                    onClick={
                                        async () => {
                                            if (!chosenSize) {
                                                setShowSelectWarning(true);
                                                return;
                                            }
                                            if (chosenSize && client) {
                                                await dispatch(createCartThunk({
                                                    clientId: clientId,
                                                    productId: currentProduct.product_id,
                                                    productSize: chosenSize,
                                                    quantity: 1
                                                }));
                                                setChosenSize('');
                                            }
                                            if (chosenSize && tempClient) {
                                                await dispatch(createCartThunk({
                                                    productId: currentProduct.product_id,
                                                    productSize: chosenSize,
                                                    quantity: 1
                                                }));
                                                setChosenSize('');
                                            }
                                        }
                                    }>
                                    Добавить в
                                    корзину
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}