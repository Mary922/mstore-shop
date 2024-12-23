"use client"

import React, {useEffect} from "react";
import Link from "next/link";
import {useState} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {getCategories} from "@/app/lib/api/categories";

import {clearCartThunk} from "@/app/store/slices/cartSlice";
import {logOut} from "@/config";
import {getClient} from "../../lib/api/clients";
import {getImagesStatic} from "../../lib/api/images";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {Auth} from "@/app/lib/api/auth";
import AuthorizationForm from "@/app/ui/AuthorizationForm";
import NavbarHeader from "@/app/ui/navbars/NavbarHeader";

const AppHeader = () => {

    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.cart.cart);


    // const params = useParams();
    // const currentId = params.categoryId;

    const [isSearch, setIsSearching] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [authMode, setAuthMode] = useState(false);


    const [catalogIsShowing, setCatalogIsShowing] = useState(false);


    const [authLabel, setAuthLabel] = useState('');
    const [imageLogoPath, setImageLogoPath] = useState('');


    let clientId;
    let client = null;
    let tempClient = localStorage.getItem("temp-client");

    useEffect(() => {
        client = window.localStorage.getItem('client');
        if (client) {
            clientId = JSON.parse(client).id;
        }
    }, []);
    console.log('tempClient header', tempClient);
    console.log('client header', client);


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




    // const cartList = useSelector((state) => state.cart.cart);
    const cartList = useAppSelector((state) => state.cart.cart);
    console.log('cartList', cartList);
    const quantityInCart = useAppSelector((state) => state.cart.quantityInCart);




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
        <Link href={'/public'}></Link>
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


    const checkClient = async () => {
        if (clientId || tempClient) {
            const result = await Auth({email: email, password: password});
            // console.log('TOKEN RESPONSE', result);

            if (result.data?.accessToken) {
                localStorage.setItem('client', JSON.stringify(result.data));
                localStorage.removeItem('temp-client');
                window.location.replace('/home');
            }
        }

            // if (tempClient) {
            //     console.log('i dont know who you are')
        // }
        else {
            alert('No token')
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
                        <div tabIndex={0} role="button" className="flex flex-row btn-circle avatar cursor-pointer">
                            <div className="w-10 rounded-full">
                                <svg className="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <AuthorizationForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavbarHeader/>

            <div className='flex flex-row items-center bg-neutral-content text-black h-10 p-2.5 w-full'>
                <div>Бесплатная доставка от 2000 р</div>
            </div>
        </>



        // {/*{*/}
        // {/*    authMode ? <>*/}
        // {/*        <div>ldld</div>*/}
        // {/*        <div tabIndex={0} className="collapse bg-base-200">*/}
        // {/*            <div className="collapse-title text-xl font-medium">Focus me to see content</div>*/}
        // {/*            <div className="collapse-content">*/}
        // {/*                <p>tabindex={0} attribute is necessary to make the div focusable</p>*/}
        // {/*            </div>*/}
        // {/*        </div>*/}
        // {/*    </> : null*/}
        // // {/*}*/}

    )
}

export default AppHeader;