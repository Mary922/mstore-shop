"use client"

import React, {useEffect} from "react";
import Link from "next/link";
import {useState} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {getCategories} from "@/app/lib/api/categories";
// import {clearCartThunk,getCartQuantity} from "../slices/cartSlice";

import {clearCartThunk} from "@/app/store/slices/cartSlice";
import Authorization from "./Authorization";
import {changeCanvas} from "@/app/store/slices/appCommonSlice";
import {logOut} from "@/config";
import {getClient} from "../lib/api/clients";
import {getImagesStatic} from "../lib/api/images";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";


const AppHeader = () => {

    const dispatch = useAppDispatch();

    // const params = useParams();
    // const currentId = params.categoryId;

    const [isSearch, setIsSearching] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [authMode, setAuthMode] = useState(false);

    const [catalogIsShowing, setCatalogIsShowing] = useState(false);


    const [boys, setBoys] = useState([]);
    const [girls, setGirls] = useState([]);

    const [authLabel, setAuthLabel] = useState('');
    const [imageLogoPath, setImageLogoPath] = useState('');

    let clientId;
    let client = null;

    useEffect(() => {
        client = window.localStorage.getItem('client');
        if (client) {
            clientId = JSON.parse(client).id;
        }
    }, []);


    // const checkToken = async () => {
    //     if (localStorage.getItem('client') === null) {
    //         // setAuthLabel('Войти или зарегистрироваться');
    //         console.log('gde auth?');
    //         dispatch(changeCanvas(true))
    //     }
    //     } else {
    //         navigate('/my-account');
    //         // setAuthLabel('привет')
    //     }
    // }

    useEffect(() => {
        (async () => {
            const imageHeader = await getImagesStatic('web', 'header');
            const images = imageHeader.data;
            if (imageHeader && images) {
                for (let i = 0; i < images.length; i++) {
                    setImageLogoPath(images[i].image_path);
                }
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const result = await getCategories();
                const boysCategories = result.data.male;
                setBoys(boysCategories);
                const girlsCategories = result.data.female;
                setGirls(girlsCategories);

                let clientRes;
                if (client) {
                    clientRes = await getClient(clientId);
                }

                if (localStorage.getItem('client') === null) {
                    setAuthLabel('Войти или зарегистрироваться');

                } else {
                    setAuthLabel(`привет ${clientRes.data.client_name}`)
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])


    // const cartList = useSelector((state) => state.cart.cart);
    const cartList = useAppSelector((state) => state.cart.cart);
    // console.log('cartList', cartList);
    const quantityInCart = useAppSelector((state) => state.cart.quantityInCart);


    let boysLinks = boys.map(link => <Link href={`/category/${link.category_id}`}
                                           key={link.category_id}>{link.category_name}</Link>)
    let girlsLinks = girls.map(link => <Link href={`/category/${link.category_id}`}
                                             key={link.category_id}>{link.category_name}</Link>)

    const accountLogOut = async () => {
        await dispatch(clearCartThunk(clientId));
        logOut();
        // navigate('/home');
        // window.location.reload();
    }
    let accountLinks = [];

    // accountLinks.push(<>
    //     <NavLink key={'orders'} onClick={() => navigate('my-account/orders')}>Мои заказы</NavLink>
    //     <NavLink key={'addresses'} onClick={() => navigate('my-account/edit-address')}>Мои адреса</NavLink>
    //     <NavLink key={'my_profile'} onClick={() => navigate('my-account/edit-account')}>Мои данные</NavLink>
    //     <NavLink key={'favorites'} onClick={() => navigate('my-account/wishlist')}>Избранное</NavLink>
    //     <NavLink key={'logout'} onClick={accountLogOut}>Выйти</NavLink>
    // </>)

    const redirectToHome = () => {
        <Link href={'/'}></Link>
    }
    const redirectToCart = () => {
        navigate(`cart`)
    }
    const toggleIsSearching = () => {
        setIsSearching(!isSearch);
    }

    // function removePunctuation(text) {
    //     const punctuation = ',.;:!?(){}[]^&*-_+=@#№$%"<>0123456789';
    //     return text.split('').filter(char => !punctuation.includes(char)).join('');
    // }
    //

    const handleSearch = (event) => {
        const inputText = event.target.value;
        setSearchVal(inputText);
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
            <div className="navbar h-2.5 bg-primary">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>

                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="flex flex-row btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <svg className="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-2.5 mr-20 bg-white rounded-box w-96 z-[2] shadow p-2.5">
                            <div className="flex flex-row justify-between">
                                <li><a>ВОЙТИ</a></li>
                                <li><a href={'/registration'}>Создать аккаунт</a></li>
                            </div>

                            <hr className="border-t border-gray-400 my-4"/>

                            <div className="flex flex-col mb-2.5">
                                <label className="input input-bordered flex items-center gap-2 bg-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                        <path
                                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                                    </svg>
                                    <input type="text" className="grow" placeholder="Email"/></label>
                            </div>

                            <div className="flex flex-col">
                                <label className="input input-bordered flex items-center bg-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd"/>
                                    </svg>
                                    <input type="password" className="grow"/>
                                </label>
                            </div>
                            <button
                                className="h-10 mt-3 flex justify-center items-center cursor-pointer rounded-md
                                bg-primary px-4 py-3 text-center text-sm font-semibold uppercase text-white
                                transition duration-200 ease-in-out hover:bg-gray-900">
                                Авторизоваться
                            </button>
                            <li><a>Забыли пароль?</a></li>

                        </ul>
                    </div>
                </div>
            </div>

            <div className="navbar bg-white">
                <div className="navbar-start">
                    <Link href={'/'} className="btn btn-ghost text-xl">Home</Link>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">Boys</div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-pink-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>{boysLinks}</li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">Girls</div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-pink-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>{girlsLinks}</li>
                        </ul>
                    </div>
                </div>

                <div className="navbar-end p-2.5">
                    <input type="text" placeholder="Search"
                           className="input input-bordered w-24 md:w-auto bg-white"/>

                    <div className="dropdown dropdown-end">

                        <button className="btn btn-ghost btn-circle">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                            </svg>
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Мой кабинет</a></li>
                            <li><a>Мои заказы</a></li>
                            <li><a>Избранное</a></li>
                            <li><a>Выйти</a></li>
                        </ul>
                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                                <span className="badge badge-sm indicator-item badge-neutral">8</span>
                            </div>
                            {/*</div>*/}
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content z-[1] mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold">8 Items</span>
                                    <span className="text-info">Subtotal: $999</span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block">View cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<button tabIndex={0} className="btn btn-ghost btn-circle">*/}
                    {/*    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"*/}
                    {/*         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">*/}
                    {/*        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
                    {/*              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>*/}
                    {/*    </svg>*/}
                    {/*</button>*/}
                </div>
            </div>

            <div className='flex flex-row items-center bg-neutral h-10 p-2.5 text-white w-full'>
                <div>Бесплатная доставка от 2000 р</div>
            </div>
            {
                authMode ? <>
                    <div>ldld</div>
                    <div tabIndex={0} className="collapse bg-base-200">
                        <div className="collapse-title text-xl font-medium">Focus me to see content</div>
                        <div className="collapse-content">
                            <p>tabindex={0} attribute is necessary to make the div focusable</p>
                        </div>
                    </div>
                </> : null
            }
            {/*<Authorization/>*/}
        </>
    )
        ;
}

export default AppHeader;