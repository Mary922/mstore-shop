"use client"
import {usePathname, useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import React, {useEffect, useState} from "react";
import {
    decreaseCartThunk,
    getCartThunk,
    increaseCartThunk,
    clearCartThunk,
    deleteProductInCartThunk
} from "@/app/store/slices/cartSlice";
import {deleteProduct, getCartPreOrder} from "@/app/lib/api/cart";
import {getProductsByIds} from "@/app/lib/api/products";
import ConfirmModal from "@/app/ui/modals/ConfirmModal";
import Link from "next/link";
import {toast,Toaster} from "react-hot-toast";


export default function CartPage() {
    let baseUrl = 'http://localhost:3001/images';
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);


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
        if (cart.length > 0) {
            for (let i = 0; i < cart.length; i++) {
                idsList.push(cart[i].product_id);
            }
            return idsList;
        }
    }
    useEffect(() => {
        if (cart && cart.length > 0) {
            (async () => {
                let ids = getIdsFromCart();
                const productsList = await getProductsByIds(ids);
                // console.log('productsList', productsList);
                setProducts(productsList?.data);

                if (productsList?.data?.Images) {
                    setImages(productsList?.data.Images);
                }
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
        await dispatch(deleteProductInCartThunk({productId: id, sizeId:size}));
        if (tempClient) {
            await dispatch(getCartThunk(tempClient));
        }
        await dispatch(getCartThunk(clientId));
    }

    const increaseCount = async (productId, sizeId) => {
        await dispatch(increaseCartThunk({productId: productId, sizeId: sizeId}));
        if (tempClient) {
            await dispatch(getCartThunk(tempClient));
        }
        if (clientId) {
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

    }

    const checkIsAuthorized = async () => {
        if (clientId) {
            const result = await getCartPreOrder({cart: cart, sum: total});
            // console.log('PRE ORDER', result);

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
            },3000)
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
                    <div key={item.id} className='flex flex-row'>
                        <div>
                            <img className={'w-36 h-auto p-2'} src={`${baseUrl}/${product.Images[0].image_path}`}/>
                        </div>

                        <div className={'flex flex-col ml-5 text-base w-full bg-fuchsia-400'}>
                            <div className='flex justify-between'>
                                <div>{product.product_name}</div>
                                <div className='cursor-pointer font-bold'
                                     onClick={() => deleteProductFromCart(product.product_id, item.product_size)}
                                >X
                                </div>
                            </div>
                            <div>Цена: {product.price}</div>
                            <div>Размер: {item.product_size}</div>
                            <div>
                                <div className="flex flex-row gap-2 justify-center font-bold text-xl">
                                    <div style={{cursor: 'pointer'}}
                                         onClick={() => decreaseCount(product.product_id, item.product_size)
                                         }>-
                                    </div>
                                    {item.product_count}
                                    <div className="cursor-pointer" onClick={() => increaseCount( product.product_id, item.product_size)
                                    }>+
                                    </div>
                                </div>
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
            {
                cart && cart.length > 0 ?
            <>
            <div className='w-full mr-16'>
                <div className="flex flex-row justify-between w-full gap-3">
                <div className='card h-16 bg-red-400 mb-10 shadow w-full'>Выберите способ доставки</div>
                <button className="btn btn-square btn-outline" onClick={()=>{
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
                </button>
                </div>

                <div className="card card-compact bg-blue-400 shadow">
                    <div className="card-body">
                        <div>{productsListInCart}</div>
                        <button
                           className="btn btn-primary btn-md px-0 mx-0"
                           onClick={checkIsAuthorized}>Оформить заказ
                        </button>
                    </div>
                </div>
            </div>

                <div className='card bg-yellow-300 sticky border-blue-500 w-80'>
            <div
                tabIndex={0}
                className="card bg-base-400 h-16 shadow-xl rounded-sm scrollable-div">

                <div className='mb-16 flex items-center justify-start'>доставка</div>
                <div>
                    <div
                        className='h-10 bg-base-100 rounded-sm flex items-center justify-center font-bold p-2'>Всего
                        к оплате {total}Р
                    </div>
                </div>
                <div className="w-full rounded-sm">
                    <a href="/cart"
                       className="btn btn-primary btn-md mt-5"
                       onClick={checkIsAuthorized}>Оформить заказ
                    </a>
                </div>
            </div>
                </div>
                </>
                    :
                    <>
                        <div className="flex flex-col items-center justify-center w-full">
                        <h1>Корзина пуста</h1>
                        <div>В корзину ничего не добавлено. Чтобы добавить товары перейдите в каталог</div>
                        <Link href={'/'}><button className="btn btn-primary my-5">Начать покупки</button></Link>
                        </div>
                    </>

            }

            {
                confirmModalIsOpen ? <ConfirmModal show={confirmModalIsOpen}
                                                   close={setConfirmModalIsOpen}
                                                   text={'Вы действительно хотите очистить корзину покупок?'}
                                                   func={clearProductsInCart}/> : null
            }
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        </>
            )
}


