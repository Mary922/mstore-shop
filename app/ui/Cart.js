//
// import {useEffect, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {getProductsByIds} from "@/app/lib/api/products";
// import {decreaseCartThunk, getCartThunk, increaseCartThunk,clearCartThunk} from "@/app/store/slices/cartSlice";
//
//
// // import {getProductsByIds} from "../api/products";
// // import {
// //     getCartPreOrder,
// // } from "../api/cart";
// // import {deleteProduct} from "../api/cart";
// // import {
// //     cartPreOrderThunk,
// //     clearCartThunk,
// //     decreaseCartThunk,
// //     getCartThunk,
// //     increaseCartThunk
// // } from "../slices/cartSlice";
// // import {changeCanvas} from "../slices/appCommonSlice";
//
//
// const Cart = () => {
//     const dispatch = useDispatch();
//
//     let clientId;
//     const tempClient = localStorage.getItem("temp-client");
//     const client = JSON.parse(localStorage.getItem("client"));
//     if (client) {
//         clientId = client.id;
//     }
//
//     const [products, setProducts] = useState([]);
//
//     const cart = useSelector(state => state.cart.cart);
//     console.log('cart', cart);
//
//
//     // useEffect( () => {
//     //     if (tempClient) {
//     //          dispatch(getCartThunk(tempClient));
//     //         // setCart(cart.data?.cart);
//     //     }
//     // }, [])
//     // // console.log('CART STATE', cart);
//
//     const getIdsFromCart = () => {
//         const idsList = [];
//         if (cart.length > 0) {
//             for (let i = 0; i < cart.length; i++) {
//                 idsList.push(cart[i].product_id);
//             }
//             return idsList;
//         }
//     }
//
//     useEffect(() => {
//         if (cart && cart.length > 0) {
//             (async () => {
//                 let ids = getIdsFromCart();
//                 const productsList = await getProductsByIds(ids);
//                 setProducts(productsList?.data);
//             })();
//         }
//     }, [cart]);
//
//     let sum = 0;
//     if (products && products.length > 0 && cart && cart.length > 0) {
//         cart.forEach(cartItem => {
//             const product = products.find(product => product.product_id === cartItem.product_id);
//
//             if (product) {
//                 sum += cartItem.product_count * product.price;
//             }
//         });
//     }
//
//
//     // const redirectToHome = () => {
//     //     navigate('/home');
//     // }
//
//     const deleteProductFromCart = async (id, size) => {
//         const result = await deleteProduct(id, size);
//         if (tempClient) {
//             await dispatch(getCartThunk(tempClient));
//         }
//         await dispatch(getCartThunk(clientId));
//     }
//
//     const increaseCount = async (productId, sizeId) => {
//         await dispatch(increaseCartThunk({productId: productId, sizeId: sizeId}));
//         if (tempClient) {
//             await dispatch(getCartThunk(tempClient));
//         }
//         await dispatch(getCartThunk(clientId));
//     }
//     const decreaseCount = async (productId, sizeId) => {
//         await dispatch(decreaseCartThunk({productId: productId, sizeId: sizeId}));
//         if (tempClient) {
//             await dispatch(getCartThunk(tempClient));
//         }
//         await dispatch(getCartThunk(clientId));
//     }
//
//     const clearProductsInCart = async () => {
//         if (tempClient) {
//             await dispatch(clearCartThunk(tempClient));
//             await dispatch(getCartThunk(tempClient));
//         }
//         await dispatch(clearCartThunk(clientId));
//         await dispatch(getCartThunk(clientId));
//
//     }
//
//
//     //  const checkCartIsEmpty = () => {
//     //      if (cartList.length === 0) {
//     //          alert('Добавьте товары в корзину')
//     //      }
//     //      if (cartList.length > 0) {
//     //          setShow(true);
//     //      }
//     //  }
//     //  const closeModal = () => {
//     //      setShow(false);
//     //  }
//
//
//     const checkIsAuthorized = async (sum) => {
//         if (clientId) {
//             const result = await getCartPreOrder({cart: cart, sum: sum});
//             // console.log('PRE ORDER', result);
//
//             if (result?.data?.status === 200) {
//                 navigate('/orderform', {state: {sum}});
//             }
//         }
//         if (tempClient) {
//             await dispatch(changeCanvas(true));
//             console.log('hahah you are temp')
//         }
//
//     }
//
//     let productsListInCart = [];
//     if (cart && cart.length > 0 && products.length > 0) {
//         productsListInCart = cart.map(item => {
//             const product = products.find((product) => product.product_id === item.product_id);
//             if (product) {
//                 return (
//                     <tr key={item.id}>
//                         <td>{product.product_id}</td>
//                         <td>{product.product_name}</td>
//                         <td>{product.price}</td>
//                         <td>{item.product_size}</td>
//                         <td>
//                             <div className={'minus-zero-plus'}>
//                                 <div style={{cursor: 'pointer'}} onClick={() => {
//                                 }}
//                                      onClick={() => {
//                                          decreaseCount(product.product_id, item.product_size)
//                                      }}>-
//                                 </div>
//                                 {item.product_count}
//                                 <div style={{cursor: 'pointer'}} onClick={() => {
//                                     increaseCount(product.product_id, item.product_size);
//                                 }}>+
//                                 </div>
//                             </div>
//                         </td>
//                         <td>{item.product_count * product.price}</td>
//                         <td style={{cursor: 'pointer'}}
//                             onClick={() => deleteProductFromCart(product.product_id, item.product_size)}
//                         >X
//                         </td>
//                     </tr>
//                 )
//
//             }
//             return null;
//         })
//     }
//
//
//     return (
//         <>
//             <div className={'cart-container'}>
//                 {
//                     cart && cart.length > 0 ?
//                         <div>
//                             <div>
//                                 <div style={{display: "flex", justifyContent: "space-between"}}>
//                                     <div>Сумма покупок: {sum} руб.</div>
//                                     <div style={{color: 'red', fontWeight: 'bold', cursor: 'pointer'}}
//                                          onClick={clearProductsInCart}>X
//                                     </div>
//                                 </div>
//                                 {/*{show ? <ConfirmModal*/}
//                                 {/*    show={show}*/}
//                                 {/*    close={closeModal}*/}
//                                 {/*    text={'Вы правда хотите очистить корзину покупок?'}*/}
//                                 {/*    func={() => dispatch(clearCart())}*/}
//                                 {/*/> : null}*/}
//
//                             </div>
//
//
//                             {/*<Table striped bordered hover>*/}
//                             {/*    <thead>*/}
//                             {/*    <tr>*/}
//                             {/*        <th>id</th>*/}
//                             {/*        <th>Товар</th>*/}
//                             {/*        <th>Цена</th>*/}
//                             {/*        <th>Размер</th>*/}
//                             {/*        <th>Количество</th>*/}
//                             {/*        <th>Сумма</th>*/}
//                             {/*        <th>Удалить товар</th>*/}
//                             {/*    </tr>*/}
//                             {/*    </thead>*/}
//                             {/*    <tbody>*/}
//                             {/*    {productsListInCart}*/}
//                             {/*    </tbody>*/}
//                             {/*</Table>*/}
//
//                             <button onClick={() => checkIsAuthorized(sum)}>Оформить заказ</button>
//                         </div> :
//                         <>
//                             <div>Добавьте товары в корзину</div>
//                             {/*<Nav><Nav.Item><Nav.Link onClick={redirectToHome}>За*/}
//                             {/*    покупками</Nav.Link></Nav.Item></Nav>*/}
//                         </>
//                 }
//             </div>
//
//
//             {/*<Card className={'cart-container'}>*/}
//             {/*    {*/}
//             {/*        cartList.length > 0 ?*/}
//             {/*            <Card.Body>*/}
//             {/*                <Card.Title>*/}
//             {/*                    <div style={{display: "flex", justifyContent: "space-between"}}>*/}
//             {/*                        <div>Сумма покупок: {cartSum} руб.</div>*/}
//             {/*                        <div onClick={checkCartIsEmpty} style={{color: 'red', fontWeight: 'bold'}}>X</div>*/}
//             {/*                    </div>*/}
//             {/*                    {show ? <ConfirmModal*/}
//             {/*                        show={show}*/}
//             {/*                        close={closeModal}*/}
//             {/*                        text={'Вы правда хотите очистить корзину покупок?'}*/}
//             {/*                        func={() => dispatch(clearCart())}*/}
//             {/*                    /> : null}*/}
//
//             {/*                </Card.Title>*/}
//
//
//             {/*                <Table striped bordered hover>*/}
//             {/*                    <thead>*/}
//             {/*                    <tr>*/}
//             {/*                        <th>id</th>*/}
//             {/*                        <th>Товар</th>*/}
//             {/*                        <th>Цена</th>*/}
//             {/*                        <th>Размер</th>*/}
//             {/*                        <th>Количество</th>*/}
//             {/*                        <th>Сумма</th>*/}
//             {/*                        <th>Удалить товар</th>*/}
//             {/*                    </tr>*/}
//             {/*                    </thead>*/}
//             {/*                    <tbody>*/}
//             {/*                    {productListInCart}*/}
//             {/*                    </tbody>*/}
//             {/*                </Table>*/}
//
//             {/*                <Button variant="primary" onClick={checkIsAuthorized}>Оформить заказ</Button>*/}
//             {/*            </Card.Body> :*/}
//             {/*            <>*/}
//             {/*                <div>Добавьте товары в корзину</div>*/}
//             {/*                <Nav><Nav.Item><Nav.Link onClick={redirectToHome}>За покупками</Nav.Link></Nav.Item></Nav></>*/}
//
//             {/*    }*/}
//             {/*</Card>*/}
//
//         </>
//     )
// }
// export default Cart;