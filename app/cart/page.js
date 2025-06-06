"use client"
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import React, {useEffect, useState} from "react";
import {
    decreaseCartThunk,
    getCartThunk,
    increaseCartThunk,
    clearCartThunk,
    deleteProductInCartThunk,
} from "@/app/store/slices/cartSlice";
import {getCartPreOrder} from "@/app/lib/api/cart";
import {getProductsByIds} from "@/app/lib/api/products";
import ConfirmModal from "@/app/ui/modals/ConfirmModal";
import Link from "next/link";
import {toast, Toaster} from "react-hot-toast";
import MainLayout from "@/app/ui/MainLayout";
import OrderButton from "@/app/ui/OrderButton";
import {BASE_URL} from "@/config";


export default function CartPage() {
    let baseUrl = `${BASE_URL}/images`;
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
    const [products, setProducts] = useState([]);

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

    const getIdsFromCart = () => {
        const idsList = [];
        if (cart && cart.length > 0) {
            for (let i = 0; i < cart.length; i++) {
                idsList.push(cart[i].product_id);
            }
            return idsList;
        }
    }
    useEffect(() => {
        if (cart && cart.length > 0 && products.length == 0) {
            (async () => {
                let ids = getIdsFromCart();
                const productsList = await getProductsByIds(ids);
                setProducts(productsList?.data);
            })();
        }
    }, [cart]);


    let sum = 0;
    if (products && products.length > 0 && cart && cart.length > 0) {
        cart.forEach(cartItem => {
            const product = products.find(product => product.product_id === cartItem.product_id);

            if (product) {
                sum += cartItem.product_count * product.price;
            }
        });
    }

    const deleteProductFromCart = async (id, size) => {
        await dispatch(deleteProductInCartThunk({productId: id, sizeId: size}));
        if (tempClient) {
            await dispatch(getCartThunk(tempClient));
        }
        await dispatch(getCartThunk(clientId));
    }

    const increaseCount = async (productId, sizeId) => {
        if (tempClient) {
            await dispatch(increaseCartThunk({productId: productId, sizeId: sizeId, clientId: tempClient}));
            await dispatch(getCartThunk(tempClient));
        }
        if (clientId) {
            await dispatch(increaseCartThunk({productId: productId, sizeId: sizeId, clientId: clientId}));
            await dispatch(getCartThunk(clientId));
        }
    }

    const decreaseCount = async (productId, sizeId) => {
        await dispatch(decreaseCartThunk({productId: productId, sizeId: sizeId}));
        if (tempClient) {
            await dispatch(getCartThunk(tempClient));
        }
        await dispatch(getCartThunk(clientId));
    }

    const clearProductsInCart = async () => {
        if (tempClient) {
            await dispatch(clearCartThunk(tempClient));
            await dispatch(getCartThunk(tempClient));
        }
        await dispatch(clearCartThunk(clientId));
        await dispatch(getCartThunk(clientId));

        setConfirmModalIsOpen(false)
    }

    const checkIsAuthorized = async () => {
        if (clientId) {
            const result = await getCartPreOrder({cart: cart, sum: total});
            if (result?.data?.status === 200) {
                router.push(`preorder?sum=${total}`);
            }
        }
        if (tempClient) {
            toast.success('Чтобы оформить заказ нужно авторизоваться', {
                position: "top-center"
            })

            setTimeout(() => {
                router.push('/registration?from=/cart');
            }, 3000)
        }
    }


    let total = 0;
    let productsListInCart = [];
    if (cart && cart.length > 0 && products.length > 0) {
        productsListInCart = cart.map(item => {
            const product = products.find((product) => product.product_id === item.product_id);
            if (product) {
                total += item.product_count * product.price;

                return (
                    <div key={item.id} className='flex flex-row mb-2 cart-list-all'>
                        <div>
                            <img className={'w-36 h-auto p-2'} src={`${baseUrl}/${product.Images[0].image_path}`}/>
                        </div>

                        <div className={'flex flex-col ml-5 text-base w-full p-1 justify-around cart-prod-info'}>
                            <div className='flex justify-between'>
                                <div className='font-bold mb-5'>{product.product_name}</div>
                                <div className='cursor-pointer font-bold'
                                     onClick={() => deleteProductFromCart(product.product_id, item.product_size)}
                                >
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="1"
                                              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                    </svg>

                                </div>
                            </div>
                            <div><span className='text-gray-500 mr-2'>Цена</span> {product.price}</div>
                            <div><span className='text-gray-500 mr-2'>Размер</span> {item.product_size}</div>

                            <div className="join border border-base-300 rounded-full flex items-center justify-center cart-plus-minus">
                                <button
                                    className="join-item btn btn-ghost text-xl w-12 h-12 min-h-0"
                                    onClick={() => decreaseCount(product.product_id, item.product_size)
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M20 12H4"/>
                                    </svg>
                                </button>
                                <div className="join-item btn btn-ghost text-xl w-16 pointer-events-none">
                                    {item.product_count}
                                </div>
                                <button
                                    className="join-item btn btn-ghost text-xl w-12 h-12 min-h-0"
                                    onClick={() => {
                                        increaseCount(product.product_id, item.product_size);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 4v16m8-8H4"/>
                                    </svg>
                                </button>
                            </div>
                            <div className='font-bold text-lg flex justify-end'>{product.price * item.product_count} ₽
                            </div>
                        </div>
                    </div>
                )

            }
            return null;
        })
    }


    return (
        <>
            <MainLayout>
                <div className="w-full max-w-full overflow-x-hidden px-2">
                    <div
                        className="p-4 max-w-full w-full cart-main"
                    >
                        {
                            cart && cart.length > 0 ?
                                <>
                                    <div className='w-full'>
                                        <div className="flex flex-row gap-3 h-12 mb-3">
                                            <div
                                                className='h-8 card p-2 mb-10 shadow-lg text-neutral w-full flex  items-center justify-center bg-neutral-content'>
                                                Доставка курьером включена
                                            </div>
                                            <div>
                                                <div className="btn h-8 btn-outline flex items-center justify-center"
                                                     onClick={() => {
                                                         setConfirmModalIsOpen(true);
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
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card card-compact shadow">
                                            <div className="card-body">
                                                <div>{productsListInCart}</div>
                                                <button
                                                    className="btn btn-primary btn-md px-0 mx-0 text-white"
                                                    onClick={checkIsAuthorized}
                                                >Оформить заказ
                                                </button>
                                            </div>
                                            <div className='card-body'>Нажимая на кнопку «Оформить заказ», вы принимаете
                                                условия пользовательского соглашения, политики конфиденциальности и
                                                публичной оферты.
                                            </div>
                                        </div>
                                    </div>
                                    <OrderButton sum={sum} func={checkIsAuthorized}/>

                                </>
                                :
                                <>
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <h1>Корзина пуста</h1>
                                        <div>В корзину ничего не добавлено. Чтобы добавить товары перейдите в каталог
                                        </div>
                                        <Link href={'/'}>
                                            <button className="btn btn-primary my-5 text-white">Начать покупки</button>
                                        </Link>
                                    </div>
                                </>
                        }
                    </div>
                </div>
                {
                    confirmModalIsOpen ? <ConfirmModal show={confirmModalIsOpen}
                                                       close={setConfirmModalIsOpen}
                                                       title={'Уважаемый клиент!'}
                                                       text={'Вы действительно хотите очистить корзину покупок?'}
                                                       func={clearProductsInCart}/> : null
                }
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />
            </MainLayout>
        </>
    )
}


