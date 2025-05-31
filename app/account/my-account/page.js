"use client";
import React, {useEffect, useState} from 'react';
import {getClient} from "@/app/lib/api/clients";
import Link from "next/link";

export default function MyAccountPage() {
    const [authLabel, setAuthLabel] = useState('');

    let client;
    let clientId;
    if (typeof window !== "undefined") {
        client = localStorage.getItem("client");
    }

    if (typeof window !== "undefined" && client) {
        clientId = JSON.parse(localStorage.getItem("client")).id;
    }

    useEffect(() => {
        (async () => {
            let clientRes;
            if (client) {
                clientRes = await getClient(clientId);
            }

            if (localStorage.getItem('client')) {
                setAuthLabel(`${clientRes.data.client_name}`)
            }
        })()
    }, [])

    console.log('authLabel', authLabel);

    const logOut = () => {
        localStorage.removeItem("client");
        localStorage.removeItem("cart");
        window.location.reload();
    }

    return (
        <>
            <div className='flex flex-col text-xl'>
                <div>Добро пожаловать, <span className='font-bold'>{authLabel}</span> (не <span
                    className='font-bold'>{authLabel}?</span> <a href={'/home'}
                                                                 className='cursor-pointer link-hover text-info text-lg'
                                                                 onClick={logOut}>Выйти</a>)
                </div>
                <div>Из главной страницы аккаунта вы можете посмотреть ваши недавние заказы, настроить адрес доставки, а
                    также изменить пароль и основную информацию.
                </div>

                <div className="grid grid-cols-3 gap-5 mt-5">
                    <Link href="/account/orders" className="no-underline text-inherit">
                        <div className="w-auto h-48 border-solid flex flex-col items-center justify-center
                    font-bold hover:bg-gray-200 hover:font-light cursor-pointer transition-colors duration-200 ease-in-out border-gray-200 border-2">
                            <svg className="text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="1.2"
                                      d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
                            </svg>
                            <div>Заказы</div>
                        </div>
                    </Link>

                    <Link href="/account/account-addresses" className="no-underline text-inherit">
                        <div
                            className="flex flex-col w-auto h-48 border-solid items-center justify-center
                        font-bold hover:bg-gray-200 hover:font-light cursor-pointer transition-colors duration-200 ease-in-out border-gray-200 border-2">
                            <svg className="text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="1.2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="1.2"
                                      d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                            </svg>
                            <div>Адрес доставки</div>
                        </div>
                    </Link>

                    <Link href="/account/account-info" className="no-underline text-inherit">
                        <div
                            className="flex flex-col w-auto h-48 border-solid items-center justify-center
                        font-bold hover:bg-gray-200 hover:font-light cursor-pointer transition-colors duration-200 ease-in-out border-gray-200 border-2">
                            <svg className="text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="1.2"
                                      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>

                            <div>Мои данные</div>
                        </div>
                    </Link>

                    <Link href="/account/wishlist" className="no-underline text-inherit">
                        <div
                            className="flex flex-col w-auto h-48 border-solid items-center justify-center
                            font-bold hover:bg-gray-200 hover:font-light cursor-pointer transition-colors duration-200 ease-in-out border-gray-200 border-2">
                            <svg className="text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="1.2"
                                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                            </svg>

                            <div>Избранное</div>
                        </div>
                    </Link>

                    <Link href="/home" onClick={logOut} className="no-underline text-inherit">
                        <div
                            className="flex flex-col w-auto h-48 border-solid items-center justify-center
                                font-bold hover:bg-gray-200 hover:font-light cursor-pointer transition-colors duration-200 ease-in-out border-gray-200 border-2">
                            <svg className="text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="1.2"
                                      d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                            </svg>
                            <div>Выйти</div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}