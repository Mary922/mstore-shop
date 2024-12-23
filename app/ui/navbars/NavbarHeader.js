'use client'
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {getCategories} from "@/app/lib/api/categories";
import {getClient} from "@/app/lib/api/clients";


const NavbarHeader = () => {


    const [boys, setBoys] = useState([]);
    const [girls, setGirls] = useState([]);


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

    const handleClickDropdown = () => {
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };
    let boysLinks = boys.map(link => <Link href={`/category/${link.category_id}`}
                                           onClick={handleClickDropdown}
                                           key={link.category_id}>{link.category_name}</Link>)
    let girlsLinks = girls.map(link => <Link href={`/category/${link.category_id}`}
                                             onClick={handleClickDropdown}
                                             key={link.category_id}>{link.category_name}</Link>)

    const handleButtonClick = (e) => {
        //  e.preventDefault();
        e.stopPropagation();
        console.log('click on button');
    }

    return (
        <>

            <div className="navbar">
                <div className="navbar-start">
                    <Link href={'/public'} className="btn btn-ghost text-xl">Home</Link>

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

                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content mt-64 bg-white rounded-box w-96 z-[2] shadow">
                                <div className="card-body">
                                    <div>list</div>
                                    <hr className="border-t border-t-transparent border-gray-200 my-4 w-full"/>
                                    {/*<span className="text-lg font-bold">8 Items</span>*/}
                                    {/*<span className="text-info">Subtotal: $999</span>*/}

                                    <a href="/cart"
                                       className="btn btn-primary btn-md px-0 mx-0"
                                       onClick={e => handleButtonClick(e)}>Перейти по ссылке
                                    </a>

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


                    {/*<Menu open={isOpenBoysDropdown} onClickOutside={() => setIsOpenBoysDropdown(false)}>*/}
                    {/*    <Menu.Button className="btn btn-ghost btn-circle"*/}
                    {/*                 onClick={() => setIsOpenBoysDropdown(true)}>Boys</Menu.Button>*/}
                    {/*    <Menu.Items static className="mt-2 w-52 shadow-lg bg-base-100 rounded-box">*/}
                    {/*        {boysLinks.map((link) => (*/}
                {/*            <Menu.Item key={link.href} asChild>*/}
                {/*                <Link href={link.href} onClick={closeDropdowns}*/}
                {/*                      className="block px-4 py-2 hover:bg-primary hover:text-primary-content">{link.label}</Link>*/}
                {/*            </Menu.Item>*/}
                {/*        ))}*/}
                {/*    </Menu.Items>*/}
                {/*</Menu>*/}



        </>
    )
}
export default NavbarHeader;