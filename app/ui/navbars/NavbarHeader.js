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
import {getProductsByIds, getProductsInSearch} from "@/app/lib/api/products";
import {useRouter} from "next/navigation";
import FilterPage from "@/app/filter/page";


const NavbarHeader = () => {
    const router = useRouter();
    let baseUrl = 'http://localhost:3001/images';
    const [products, setProducts] = useState([]);


    const [isSearch, setIsSearching] = useState(false);
    const [searchVal, setSearchVal] = useState("");

    const [boys, setBoys] = useState([]);
    const [girls, setGirls] = useState([]);
    const [imagePath, setImagePath] = useState('');

    const cartList = useAppSelector((state) => state.cart.cart);
    const quantityInCart = useAppSelector((state) => state.cart.quantityInCart);

    const [filteredProducts, setFilteredProducts] = useState([]);

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


    useEffect(() => {
        (async () => {
            if (searchVal) {
                localStorage.setItem('filterData', JSON.stringify(searchVal));


                //
                // const result = await getProductsInSearch(searchVal);
                // console.log('res search',result);
                // if (result?.data && result?.data?.length > 0) {
                //     setFilteredProducts(result?.data);
                //     // router.push('filter')
                //     // setProducts(result.data);
                //
                // }
            }
        })();
    }, [searchVal]);


    let total = 0;

    let productsListInCart = [];
    if (cartList && cartList.length > 0 && products.length > 0) {
        productsListInCart = cartList.map((item) => {
            const product = products.find((product) => product.product_id === item.product_id);


            if (product) {
                total += item.product_count * product.price;

                return (
                    <div key={item.id}>
                        <div className={'flex flex-row'}>
                            {
                                product?.Images?.[0]?.image_path
                                    ? <img src={`${baseUrl}/${product.Images[0].image_path}`} alt={'Product Image'}
                                           className={'w-32 h-36'}/>
                                    : 'no image'
                            }
                            <div className={'flex flex-col text-md ml-3'}>
                                <div className='font-bold'>{product.product_name}</div>
                                <div className='font-light'><span className="mr-1">Количество:</span> {item.product_count}</div>
                                <div className='font-light'>Цвет:</div>
                                <div className='font-light'><span className="mr-1">Размер:</span>{item.product_size}</div>
                                <div className='font-bold text-base mt-11'>Цена: {product.price}<span className="ml-1">₽</span> </div>
                            </div>
                        </div>
                        <hr className="border-t border-t-transparent border-gray-200 my-4 w-full"/>
                    </div>

                )
            }
            return null;
        })
    }

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
    // console.log('gggggg',girls)

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

    const renderBoysLinks = () => {

        // 1. Находим все родительские категории (у которых нет parent_id или он null)
        const parentCategories = boys.filter(category => !category.parent_id);

        // console.log('parentCategories',parentCategories);

        return parentCategories.map(parent => {
            // 2. Находим все дочерние категории для этого родителя
            const childCategories = boys.filter(category => category.parent_id === parent.category_id);

            return (
                <div key={parent.category_id} className="mb-6">
                    {/* 3. Родительская категория (заголовок) */}
                    <div className="font-bold text-lg mb-2">
                        <div
                            // href={`/category/${parent.category_id}`}
                            // className="hover:text-gray-700"
                            onClick={handleClickDropdown}
                        >
                            {parent.category_name}
                        </div>
                    </div>

                    {/* 4. Дочерние категории (список) */}
                    <div className="grid grid-cols-2 gap-2">
                        {childCategories.map(child => (
                            <Link
                                key={child.category_id}
                                href={`/category/${child.category_id}`}
                                className="text-neutral no-underline hover:text-black block py-1"
                                onClick={handleClickDropdown}
                            >
                                {child.category_name}
                            </Link>
                        ))}
                    </div>
                </div>
            );
        });
    };

    const renderGirlsLinks = () => {

        // 1. Находим все родительские категории (у которых нет parent_id или он null)
        const parentCategories = girls.filter(category => !category.parent_id);

        // console.log('parentCategories',parentCategories);

        return parentCategories.map(parent => {
            // 2. Находим все дочерние категории для этого родителя
            const childCategories = girls.filter(category => category.parent_id === parent.category_id);

            return (
                <div key={parent.category_id} className="mb-6">
                    {/* 3. Родительская категория (заголовок) */}
                    <div className="font-bold text-lg mb-2">
                        <div
                            // href={`/category/${parent.category_id}`}
                            // className="hover:text-gray-700"
                            onClick={handleClickDropdown}
                        >
                            {parent.category_name}
                        </div>
                    </div>

                    {/* 4. Дочерние категории (список) */}
                    <div className="grid grid-cols-2 gap-2">
                        {childCategories.map(child => (
                            <Link
                                key={child.category_id}
                                href={`/category/${child.category_id}`}
                                className="text-neutral no-underline hover:text-black block py-1"
                                onClick={handleClickDropdown}
                            >
                                {child.category_name}
                            </Link>
                        ))}
                    </div>
                </div>
            );
        });
    };

    const handleButtonClick = (e) => {
        //  e.preventDefault();
        e.stopPropagation();
    }
    const handleSearch = (event) => {
        const inputText = event.target.value;
        // console.log('inputText', inputText);
        setSearchVal(inputText);
    }

    // console.log('girls',girls)


    const toggleIsSearching = () => {
        setIsSearching(!isSearch);
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && searchVal !== '') {
            console.log('enter pressed');

            // console.log('searchVal', searchVal);


            const result = await getProductsInSearch(searchVal.toLowerCase().trim());
            // console.log('res filtered', result);

            if (result?.data && result?.data.length > 0) {
                localStorage.setItem('filter-list', JSON.stringify(result.data));
                // window.location.reload();
                window.location.replace(`/filter`);

                // router.push(`filter`);
                // setProducts(result.data);
            } else {
                console.log('NOOOO prods');
                localStorage.removeItem('filter-list');
                window.location.replace(`/filter`);
            }
        }
        // console.log('input is empty');

        setIsSearching(false);
        setSearchVal('');
    }


return (
    <>
        <div className="navbar border-nav navbar-bottom">
            <div className="navbar-start gap-3">
                <Link href='/' className="btn btn-ghost btn-circle">
                    <svg className="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                    </svg>
                </Link>

                <div className="dropdown">
                    <div tabIndex={0} className="btn btn-ghost btn-square text-lg font-normal px-7"
                    >
                        Мальчики
                    </div>
                    <ul
                        tabIndex={0}
                        className="bg-base-100 menu dropdown-content rounded-box z-[1] shadow-lg w-screen">
                        <div
                            className="grid grid-cols-6 h-auto text-sm p-5 leading-normal container">{renderBoysLinks()}</div>
                    </ul>
                </div>


                <div className="dropdown">
                    <div tabIndex={0} className="btn btn-ghost btn-square text-lg font-normal px-7"
                    >
                        Девочки
                    </div>
                    <ul
                        tabIndex={0}
                        className="bg-base-100 menu dropdown-content rounded-box z-[1] shadow-lg w-screen">
                        <div
                            className="grid grid-cols-6 h-auto text-sm p-5 leading-normal container">{renderGirlsLinks()}</div>
                    </ul>
                </div>
                <Link href='/footer/contacts' className="btn btn-ghost btn-square mr-8 w-auto">
                    <div className='font-normal text-lg px-2 '>Магазины</div>
                </Link>
            </div>


            <div className="navbar-end mr-8">
                <input type="text" placeholder="Поиск"
                       className="input input-bordered w-24 md:w-auto bg-white input-md mr-5"
                       onChange={handleSearch}
                       onKeyDown={handleKeyDown}
                />


                <div className="dropdown dropdown-end mr-2">
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
                                    strokeWidth="1"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                            <span className="badge badge-sm indicator-item badge-primary">
                                    {
                                        cartList && cartList.length > 0 ?
                                            <div>{getCartQuantity(cartList)}</div> : '0'
                                    }
                                </span>

                            <div
                                className="card card-compact dropdown-content bg-white rounded-box w-96 z-[2] shadow relative -mt-5">
                                <div className="card-body max-h-80 shadow-lg bg-neutral-content rounded-md">
                                    {
                                        cartList && cartList.length > 0 ?
                                            <>
                                                <div className="flex-1 overflow-y-auto">{productsListInCart}</div>
                                                <a href="/cart"
                                                   className="btn btn-primary btn-md px-0 mx-0"
                                                   onClick={e => handleButtonClick(e)}>
                                                    <div className='text-white'>Оформить заказ</div>
                                                </a>
                                            </>
                                            : <div className="card-body flex h-40 items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-800 dark:text-white" aria-hidden="true"
                                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                     viewBox="0 0 24 24">
                                                    <path stroke="green" strokeLinecap="round"
                                                          strokeLinejoin="round" strokeWidth="1"
                                                          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                </svg>

                                                <div className="text-xl text-center">В корзине пока нет
                                                    добавленных товаров
                                                </div>
                                            </div>
                                    }
                                    {/*<a href="/cart"*/}
                                    {/*   className="btn btn-primary btn-md px-0 mx-0"*/}
                                    {/*   onClick={e => handleButtonClick(e)}>*/}
                                    {/*    <div>Оформить заказ</div>*/}
                                    {/*</a>*/}
                                </div>


                                {/*{*/}
                                {/*    cartList && cartList.length > 0 ?*/}
                                {/*        <div className="card-body">*/}
                                {/*            <div>{productsListInCart}</div>*/}
                                {/*            <a href="/cart"*/}
                                {/*               className="btn btn-primary btn-md px-0 mx-0"*/}
                                {/*               onClick={e => handleButtonClick(e)}>*/}
                                {/*                <div>Оформить заказ</div>*/}
                                {/*            </a>*/}
                                {/*        </div> :*/}
                                {/*        <div className="card-body flex h-40 items-center justify-center">*/}
                                {/*            <div className="text-xl">В корзине пока нет*/}
                                {/*                добавленных товаров*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*}*/}


                                {/*{*/}
                                {/*    cartList && cartList.length > 0 ?*/}
                                {/*        <div className="card-body">*/}
                                {/*            <div>{productsListInCart}</div>*/}
                                {/*            <a href="/cart"*/}
                                {/*               className="btn btn-primary btn-md px-0 mx-0"*/}
                                {/*               onClick={e => handleButtonClick(e)}>*/}
                                {/*                <div>Оформить заказ</div>*/}
                                {/*            </a>*/}
                                {/*        </div> :*/}
                                {/*        <div className="card-body flex h-40 items-center justify-center">*/}
                                {/*            <div className="text-xl">В корзине пока нет*/}
                                {/*                добавленных товаров*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*}*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-primary-content flex flex-col ml-3"><span>Сумма</span><span> {total} Р</span></div>
            </div>
        </div>

    </>
)
}
export default NavbarHeader;