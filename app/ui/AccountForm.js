"use client"
import React from "react";


const AccountForm = () => {

    const logOut = () => {
        localStorage.removeItem("client");
        window.location.reload();
    }
    return (
        <>
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
                <li><a onClick={logOut}>Выйти</a></li>
            </ul>
        </>
    )
}
export default AccountForm;