"use client"
import React from "react";
import {usePathname} from "next/navigation";

export default function AccountNavBar() {

    const pathname = usePathname();


    const logOut = () => {
        localStorage.removeItem("client");
        localStorage.removeItem("cart");
        window.location.reload();
    }

    return (
        <>
            <div className="navbar flex flex-col w-96">
                <a href={'/account/my-account'} className="text-xl link-hover text-neutral pt-5">Мой кабинет</a>
                <div className="divider my-2 border-2 border-black border-opacity-30"></div>
                <div className="navbar-center">
                    <ul className="menu menu-horizontal px-1 flex-col mt-0">
                        <li><a href={'/account/account-info'}
                               className={`link-hover text-lg ${pathname === '/account/account-info' ? 'active text-primary' : 'text-neutral'}`}
                        >Мои данные</a></li>
                        <li><a href={'/account/orders'}
                               className={`link-hover text-lg ${pathname === '/account/orders' ? 'active text-primary' : 'text-neutral'}`}
                        >Заказы</a></li>
                        <li><a href={'/account/account-addresses'}
                               className={`link-hover text-lg ${pathname === '/account/account-addresses' ? 'active text-primary' : 'text-neutral'}`}
                        >Адрес доставки</a></li>
                        <li><a href={'/account/wishlist'}

                            // className='link-hover text-neutral text-lg active:bg-neutral active:text-red-600'
                               className={`link-hover text-lg ${pathname === '/account/wishlist' ? 'active text-primary' : 'text-neutral'}`}
                        >
                            Избранное</a></li>
                        <li><a href={'/home'} onClick={logOut} className='link-hover text-info text-lg'>Выйти</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}