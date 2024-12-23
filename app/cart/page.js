"use client"
import {useParams} from "next/navigation";
import {useAppDispatch} from "@/app/lib/hooks";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {decreaseCartThunk, getCartThunk, increaseCartThunk,clearCartThunk} from "@/app/store/slices/cartSlice";
import {deleteProduct} from "@/app/lib/api/cart";
import {getProductsByIds} from "@/app/lib/api/products";


export default function CategoryPage() {
    const params = useParams();
    const dispatch = useAppDispatch();

    // let clientId, tempClient;
    // const client = JSON.parse(localStorage.getItem("client"));
    // tempClient = localStorage.getItem("temp-client");
    // if (client) {
    //     clientId = client.id;
    // }

    const [products, setProducts] = useState([]);

    // const [show, setShow] = useState(false);

    const cart = useSelector(state => state.cart.cart);
    console.log('cart', cart);


    let clientId;
    let tempClient = localStorage.getItem("temp-client");
    let client = null;

    useEffect(() => {
        client = window.localStorage.getItem('client');
        if (client) {
            clientId = JSON.parse(client).id;
        }
    }, []);
    console.log('tempClient', tempClient);

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
        const result = await deleteProduct(id, size);
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
        await dispatch(getCartThunk(clientId));
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

    const checkIsAuthorized = async (sum) => {
        if (clientId) {
            const result = await getCartPreOrder({cart: cart, sum: sum});
            // console.log('PRE ORDER', result);

            if (result?.data?.status === 200) {
                navigate('/orderform', {state: {sum}});
            }
        }
        if (tempClient) {
            await dispatch(changeCanvas(true));
            console.log('hahah you are temp')
        }

    }

    let productsListInCart = [];
    if (cart && cart.length > 0 && products.length > 0) {
        productsListInCart = cart.map(item => {
            const product = products.find((product) => product.product_id === item.product_id);
            if (product) {
                return (
                    <tr key={item.id}>
                        <td>{product.product_id}</td>
                        <td>{product.product_name}</td>
                        <td>{product.price}</td>
                        <td>{item.product_size}</td>
                        <td>
                            {/*<div className={'minus-zero-plus'}>*/}
                            {/*    <div style={{cursor: 'pointer'}} onClick={() => {*/}
                            {/*    }}*/}
                            {/*         onClick={() => {*/}
                            {/*             decreaseCount(product.product_id, item.product_size)*/}
                            {/*         }}>-*/}
                            {/*    </div>*/}
                            {/*    {item.product_count}*/}
                            {/*    <div style={{cursor: 'pointer'}} onClick={() => {*/}
                            {/*        increaseCount(product.product_id, item.product_size);*/}
                            {/*    }}>+*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </td>
                        <td>{item.product_count * product.price}</td>
                        <td style={{cursor: 'pointer'}}
                            onClick={() => deleteProductFromCart(product.product_id, item.product_size)}
                        >X
                        </td>
                    </tr>
                )

            }
            return null;
        })
    }





    return (
        <>
            {/*<div className={'cart-container'}>*/}
            {/*    {*/}
            {/*        cart && cart.length > 0 ?*/}
            {/*            <div>*/}
            {/*                <div>*/}
            {/*                    <div style={{display: "flex", justifyContent: "space-between"}}>*/}
            {/*                        <div>Сумма покупок: {sum} руб.</div>*/}
            {/*                        <div style={{color: 'red', fontWeight: 'bold', cursor: 'pointer'}}*/}
            {/*                             onClick={clearProductsInCart}>X*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    /!*{show ? <ConfirmModal*!/*/}
            {/*                    /!*    show={show}*!/*/}
            {/*                    /!*    close={closeModal}*!/*/}
            {/*                    /!*    text={'Вы правда хотите очистить корзину покупок?'}*!/*/}
            {/*                    /!*    func={() => dispatch(clearCart())}*!/*/}
                                {/*/> : null}*/}

            {/*                </div>*/}
            {/*                </div>*/}

            {/*                <button onClick={() => checkIsAuthorized(sum)}>Оформить заказ</button>*/}
            {/*            </div> :*/}
            {/*            <>*/}
            {/*                <div>Добавьте товары в корзину</div>*/}
            {/*                /!*<Nav><Nav.Item><Nav.Link onClick={redirectToHome}>За*!/*/}
            {/*                /!*    покупками</Nav.Link></Nav.Item></Nav>*!/*/}
            {/*            </>*/}
            {/*    }*/}
            {/*</div>*/}
        </>
    )

}