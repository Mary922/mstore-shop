"use client"
import React, {useEffect} from "react";
import Link from "next/link";
import {Col, DropdownItem, NavLink} from "react-bootstrap";
import {useState} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import DropdownComponent from "@/app/common/DropdownComponent";
import {getCategories} from "@/app/lib/api/categories";
import {useDispatch, useSelector} from "react-redux";
// import {clearCartThunk,getCartQuantity} from "../slices/cartSlice";

// import {clearCartThunk, getCartQuantity} from "../slices/cartSlice";
import Authorization from "./Authorization";
// import {changeCanvas} from "../slices/appCommonSlice";
// import {logOut} from "../config";
import Dropdown from "react-bootstrap/Dropdown";
import {getClient} from "../lib/api/clients";
import {getImagesStatic} from "../lib/api/images";
import Form from "react-bootstrap/Form";
import {baseUrlStatic} from "constants";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";

const AppHeader = () => {

    const dispatch = useAppDispatch();
    // const params = useParams();
    // const currentId = params.categoryId;

    const [isSearch, setIsSearching] = useState(false);
    const [searchVal, setSearchVal] = useState("");

    const [catalogIsShowing, setCatalogIsShowing] = useState(false);


    const [boys, setBoys] = useState([]);
    const [girls, setGirls] = useState([]);

    const [authLabel, setAuthLabel] = useState('');
    const [imageLogoPath, setImageLogoPath] = useState('');

    let clientId;
    let client = localStorage.getItem('client');
    if (client) {
        clientId = JSON.parse(client).id;
    }

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

    useEffect(()=> {
        (async () => {
            const imageHeader = await getImagesStatic('web','header');
            const images = imageHeader.data;
            if (imageHeader && images) {
                for (let i = 0; i < images.length; i++) {
                    setImageLogoPath(images[i].image_path);
                }
            }
        })()
    },[])

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
    const quantityInCart = useSelector((state) => state.cart.quantityInCart);

    const redirectToCategory = (categoryId) => {
        <Link href={`/category/${categoryId}`}></Link>

        // navigate(`/category/${categoryId}`)
    }

    let boysLinks = boys.map(link => <Dropdown.Item onClick={() => redirectToCategory(link.category_id)}
                                                    key={link.category_id}>{link.category_name}</Dropdown.Item>)
    let girlsLinks = girls.map(link => <Dropdown.Item onClick={() => redirectToCategory(link.category_id)}
                                                      key={link.category_id}>{link.category_name}</Dropdown.Item>)

    const accountLogOut = async () => {
        await dispatch(clearCartThunk(clientId));
        logOut();
        navigate('/home');
        window.location.reload();
    }
    let accountLinks = [];

    accountLinks.push(<>
        <NavLink key={'orders'} onClick={() => navigate('my-account/orders')}>Мои заказы</NavLink>
        <NavLink key={'addresses'} onClick={() => navigate('my-account/edit-address')}>Мои адреса</NavLink>
        <NavLink key={'my_profile'} onClick={() => navigate('my-account/edit-account')}>Мои данные</NavLink>
        <NavLink key={'favorites'} onClick={() => navigate('my-account/wishlist')}>Избранное</NavLink>
        <NavLink key={'logout'} onClick={accountLogOut}>Выйти</NavLink>
    </>)

    const redirectToHome = () => {
        navigate(`home`)

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
                <div className={'header-auth'} lg={2}>
                    <Col className={'header-logo'}>
                        <div><img style={{width:'150px',height: 'auto'}} src={`${baseUrlStatic}/${imageLogoPath}`}/></div>
                    </Col>
                    <Col className={'header-auth-items'}><i className="bi bi-person-circle"></i>
                        <div onClick={() => {
                            dispatch(changeCanvas(true));
                        }} style={{textAlign: 'right', cursor: 'pointer'}}>{authLabel}
                        </div>
                        <div></div>
                    </Col>
                </div>
                <div className={'header-nav'}>
                    <div onClick={() => redirectToHome()} style={{cursor: 'pointer'}}>Home
                    </div>

                    {/*<div onClick={()=>navigate('/products')} style={{cursor:'pointer'}}>Весь каталог</div>*/}
                    <div>
                        <DropdownComponent links={boysLinks} title={'Boys'} id={'dropdown-autoclose-true'}/>
                        <DropdownComponent links={girlsLinks} title={'Girls'} id={'dropdown-autoclose-true'}/>
                    </div>

                    <div className={'nav-icons'}>
                        <i style={{cursor: 'pointer'}} onClick={toggleIsSearching} className={!isSearch ? "bi bi-search" : 'bi bi-bag-x'}></i>
                        {
                            isSearch ? <><Form.Control
                                onChange={handleSearch}
                                onKeyDown={handleKeyDown}
                                style={{width: '300px'}}
                                type={'text'}
                            />
                                <div>Поиск</div>
                            </> : null
                        }
                        <div>
                            {
                                client ?
                                    <DropdownComponent title={
                                        <i style={{fontSize: '20px'}} className="bi bi-person-fill">

                                        </i>}
                                                       id={'dropdown-custom-1'}
                                                       links={accountLinks}
                                    /> :
                                    <i onClick={() => dispatch(changeCanvas(true))}
                                       style={{fontSize: '35px'}}
                                       className="bi bi-person-fill"></i>
                            }

                        </div>

                        <div className={'basket-logo'}><i className="bi bi-cart" onClick={() => redirectToCart()}
                                                          style={{cursor: 'pointer'}}></i>
                            {
                                cartList && cartList.length > 0 ?
                                    <div className={'badge'}>{getCartQuantity(cartList)}</div> : null
                            }
                            {/*{*/}
                            {/*    cartList.length <= 0 ? null : <div className={'badge'}>{getCartQuantity(cartList)}</div>*/}
                            {/*}*/}
                        </div>
                    </div>

                </div>
                <div className={'header-info'}>
                    <div>Бесплатная доставка от 2000 р</div>

                </div>

            {/*<Authorization/>*/}
        </>
    );
}

export default AppHeader;