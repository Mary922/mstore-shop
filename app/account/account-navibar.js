"use client"
import React from "react";

export default function AccountNavBar() {

    const logOut = () => {
        localStorage.removeItem("client");
        localStorage.removeItem("cart");
        window.location.reload();
    }

    return (
        <>
            <div className="navbar flex flex-col w-96">
                <a href={'/account/my-account'} className="text-xl">Мой кабинет</a>
                <div className="divider my-2 border-2 border-black border-opacity-30"></div>
                <div className="navbar-center">
                    <ul className="menu menu-horizontal px-1 flex-col mt-0">
                        <li><a href={'/account/account-info'}>Мои данные</a></li>
                        <li><a href={'/account/orders'}>Заказы</a></li>
                        <li><a href={'/account/account-addresses'}>Адрес доставки</a></li>
                        <li><a href={'/account/wishlist'}>Избранное</a></li>
                        <li><a href={'/home'} onClick={logOut}>Выйти</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}