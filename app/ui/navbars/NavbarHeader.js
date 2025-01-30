'use client'
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {getCategories} from "@/app/lib/api/categories";
import {getClient} from "@/app/lib/api/clients";
import {useAppSelector} from "@/app/lib/hooks";
import {decreaseCartThunk, getCartQuantity, increaseCartThunk} from "@/app/store/slices/cartSlice";
import AccountForm from "@/app/ui/AccountForm";
import AuthorizationForm from "@/app/ui/AuthorizationForm";
import ProductCard from "@/app/ui/ProductCard";
import {getProductsByIds} from "@/app/lib/api/products";


const NavbarHeader = () => {
    let baseUrl = 'http://localhost:3001/images';
    const [products, setProducts] = useState([]);


    const [isSearch, setIsSearching] = useState(false);
    const [searchVal, setSearchVal] = useState("");


    const [boys, setBoys] = useState([]);
    const [girls, setGirls] = useState([]);
    const [imagePath, setImagePath] = useState('');

    const cartList = useAppSelector((state) => state.cart.cart);
    const quantityInCart = useAppSelector((state) => state.cart.quantityInCart);

    // console.log('cartList',cartList);
    // console.log('quantityInCart',quantityInCart);
    // console.log('CARTCARTCART header', cartList);

    const getIdsFromCart = () => {
        const idsList = [];
        if (cartList.length > 0) {
            for (let i = 0; i < cartList.length; i++) {
                idsList.push(cartList[i].product_id);
            }
            return idsList;
        }
    }
    useEffect(() => {
        if (cartList && cartList.length > 0) {
            (async () => {
                let ids = getIdsFromCart();
                const productsList = await getProductsByIds(ids);
                setProducts(productsList?.data);
            })();
        }
    }, [cartList]);

    console.log('cartList', cartList);
    console.log('products', products);

    let total = 0;

    let productsListInCart = [];
    if (cartList && cartList.length > 0 && products.length > 0) {
        productsListInCart = cartList.map((item) => {
            const product = products.find((product) => product.product_id === item.product_id);


            if (product) {
                total += item.product_count * product.price;

                return (
                    <div key={item.id}>
                        <div  className={'flex flex-row'}>
                            {
                                product?.Images?.[0]?.image_path
                                    ? <img src={`${baseUrl}/${product.Images[0].image_path}`} alt={'Product Image'}
                                           className={'w-32 h-32'}/>
                                    : 'no image'
                            }
                            <div className={'flex flex-col'}>
                                <div>{product.product_name}</div>
                                <div>Количество: {item.product_count}  </div>
                                <div>Цвет:</div>
                                <div>Размер:{item.product_size}</div>
                                <div>Цена: {product.price} </div>
                            </div>
                        </div>
                        <hr className="border-t border-t-transparent border-gray-200 my-4 w-full"/>
                    </div>

                )
            }
            return null;
        })
    }
    console.log('productsListincart',productsListInCart);


    let tempClient;
    let client;
    let clientId;
    if (typeof window !== "undefined") {
        tempClient = localStorage.getItem("temp-client");
        client = localStorage.getItem("client");
    }

    if (typeof window !== "undefined" && client) {
        clientId = JSON.parse(localStorage.getItem("client")).id;
    }


    // let clientId;
    // let client = localStorage.getItem('client');
    // if (client) {
    //     clientId = JSON.parse(client).id;
    // }


    useEffect(() => {
        (async () => {
            try {
                const result = await getCategories();
                const boysCategories = result.data.male;
                setBoys(boysCategories);
                const girlsCategories = result.data.female;
                setGirls(girlsCategories);


            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    const handleClickDropdown = () => {
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };
    let boysLinks = boys.map(link => <Link href={`/category/${link.category_id}`}
                                           className="link link-hover text-black"
                                           onClick={handleClickDropdown}
                                           key={link.category_id}>{link.category_name}</Link>)
    let girlsLinks = girls.map(link => <Link href={`/category/${link.category_id}`}
                                             className="link link-hover text-black"
                                             onClick={handleClickDropdown}
                                             key={link.category_id}>{link.category_name}</Link>)

    const handleButtonClick = (e) => {
        //  e.preventDefault();
        e.stopPropagation();
    }
    const handleSearch = (event) => {
        const inputText = event.target.value;
        setSearchVal(inputText);
    }


    const toggleIsSearching = () => {
        setIsSearching(!isSearch);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && searchVal !== '') {
            console.log('enter pressed');
            navigate(`/products/${searchVal.toLowerCase().trim()}`);
            setIsSearching(false);
            setSearchVal('');
        }
    }

    return (
        <>

            <div className="navbar">
                <div className="navbar-start">
                    <Link href='/' className="btn btn-ghost text-xl">Home</Link>

                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">Boys</div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>{boysLinks}</li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">Girls</div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>{girlsLinks}</li>
                        </ul>
                    </div>
                </div>


                <div className="navbar-end p-2.5 mr-16">
                    <input type="text" placeholder="Search"
                           className="input input-bordered w-24 md:w-auto bg-white"/>


                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="cursor-pointer">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-auto w-10"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                                <span className="badge badge-sm indicator-item badge-neutral">
                                    {
                                        cartList && cartList.length > 0 ?
                                            <div>{getCartQuantity(cartList)}</div> : '0'
                                    }
                                </span>

                                <div
                                    tabIndex={0}
                                    className="card card-compact dropdown-content bg-white rounded-box w-96 z-[2] shadow relative">

                                    <div className="card-body">
                                        <div>{productsListInCart}</div>
                                        <a href="/cart"
                                           className="btn btn-primary btn-md px-0 mx-0"
                                           onClick={e => handleButtonClick(e)}>Оформить заказ
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-info flex flex-col ml-3"><span>Сумма</span><span> {total} Р</span></div>
                </div>
            </div>
        </>
    )
}
export default NavbarHeader;