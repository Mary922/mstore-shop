'use client'
import React, {useEffect, useState} from "react";
import {Auth} from "@/app/lib/api/auth";
import {useRouter, useSearchParams} from "next/navigation";
import validator from "validator";
import {resetPasswordRequest} from "@/app/lib/api/forgotPassword";
import {toast, Toaster} from "react-hot-toast";


const AuthorizationForm = ({clientId, tempClient,closeDropdown}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get("from");

    const [error, setError] = useState(null);

    const [email, setEmail] = useState('mary_k_92@mail.ru');
    const [password, setPassword] = useState('12345');
    const [repeatRequestPassword, setRepeatRequestPassword] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [emailForgot, setEmailForgot] = useState('');

    let client;
    // let tempClient = '';
    // let client;

    const logOut = () => {
        localStorage.removeItem("client");
        localStorage.removeItem("cart");
        localStorage.removeItem("filter-list");
        localStorage.removeItem("filterData");
        window.location.reload();
    }

    if (typeof window !== "undefined") {
        tempClient = localStorage.getItem("temp-client");
        client = localStorage.getItem("client");
    }

    if (typeof window !== "undefined" && client) {
        clientId = JSON.parse(localStorage.getItem("client")).id;
    }

    const checkClient = async () => {
        try {
            if (clientId || tempClient) {
                const result = await Auth({email: email, password: password});
                console.log('TOKEN RESPONSE', result);
                setError('Неверные данные');

                if (result?.data?.accessToken) {
                    console.log('it was succesful auth');
                    localStorage.setItem('client', JSON.stringify(result.data));
                    localStorage.removeItem('temp-client');
                    // localStorage.removeItem('filter-list');
                    setError('');

                    window.location.reload();
                }
                if (result?.status === 401) {
                    console.log('login error', error);
                    await logOut();
                }
            } else {
                setRepeatRequestPassword(true);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Invalid credentials. Please check your email/password.'); // Ошибка 401
            } else {
                setError('Something went wrong. Please try again.'); // Другие ошибки
            }
        }
    }
    const checkFilledInput = async () => {
        if (!emailForgot?.trim()) {
            // setError('Заполните email');
            console.log('email need right')
            return false;
        }
        const isValidEmail = validator.isEmail('emailForgot');
        if (isValidEmail) {
            // console.log('email need right')
            // setError('Введите корректный email');
            return false;
        } else {
            const result = await resetPasswordRequest(emailForgot);

            if (result.success) {
                setForgotPassword(false);
                setEmailForgot('');

                // toast.success('Проверьте почту для восстановления пароля');
            }
            console.log('result',result);
            console.log('email exist lalal');
        }
    }




    return (
        <>
            <ul
                tabIndex={0}
                className="menu dropdown-content mt-7 mr-20 rounded-box w-96 z-[100] shadow p-2.5 bg-neutral-content">
                <div className="flex flex-row justify-between">
                    {/*<li>*/}
                    {/*    <div className="text-base font-bold hover:bg-transparent hover:shadow-none cursor-default disabled">ВОЙТИ</div>*/}
                    {/*</li>*/}
                    <li><a className="link link-hover text-base text-neutral" href={'/registration'}>Создать аккаунт</a>
                    </li>
                    <li>
                        {/*<button*/}
                        {/*    onClick={(e) => {*/}
                        {/*        e.stopPropagation(); // Важно: предотвращаем всплытие события*/}
                        {/*        closeDropdown();*/}
                        {/*    }}*/}
                        {/*    className="p-0 hover:bg-transparent"*/}
                        {/*>*/}
                        {/*    <svg className="w-6 h-6 text-gray-800" aria-hidden="true"*/}
                        {/*         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"*/}
                        {/*         viewBox="0 0 24 24">*/}
                        {/*        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
                        {/*              strokeWidth="1" d="M6 18 17.94 6M18 18 6.06 6"/>*/}
                        {/*    </svg>*/}
                        {/*</button>*/}
                        {/*<div>*/}
                        {/*    <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"*/}
                        {/*         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"*/}
                        {/*         viewBox="0 0 24 24">*/}
                        {/*        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
                        {/*              strokeWidth="1" d="M6 18 17.94 6M18 18 6.06 6"/>*/}
                        {/*    </svg>*/}
                        {/*</div>*/}
                    </li>
                </div>

                <hr className="border-t border-gray-500 my-4"/>

                <div className="flex flex-col mb-2.5 p-2.5">
                    {error && (
                        <div className="text-error">
                            {error}
                        </div>
                    )}
                    <label className="flex items-center gap-2 bg-white">
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
                        <input type="email"
                               className='input input-bordered input-sm grow'
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder="Email"
                        />
                    </label>
                </div>

                <div className="flex flex-col mb-2.5 p-2.5">
                    <label className="flex items-center bg-white gap-2">
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
                        <input type="password"
                               className='input input-bordered input-sm grow'
                               placeholder="Пароль"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button
                    className="btn h-10 mt-3 flex justify-center items-center cursor-pointer rounded-md
                                bg-primary px-4 py-3 text-center text-sm font-semibold uppercase text-white
                                transition duration-200 ease-in-out hover:bg-gray-900" onClick={checkClient}>
                    Авторизоваться
                </button>
                {/*{*/}
                {/*    repeatRequestPassword ? <div onClick={async () => {*/}
                {/*        // setValidationPassword(true);*/}
                {/*        setRepeatRequestPassword(false);*/}
                {/*        await registerCl();*/}
                {/*    }}>запросить пароль еще раз</div> : null*/}
                {/*}*/}
                {
                    forgotPassword === false ?
                        <li><a onClick={() => setForgotPassword(true)}>Забыли пароль?</a></li>
                        : null
                }
                {
                    forgotPassword &&
                    <>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-info my-2'>Укажите почту для восстановления пароля</div>
                            <div onClick={() => setForgotPassword(false)}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="1" d="M6 18 17.94 6M18 18 6.06 6"/>
                                </svg>

                            </div>
                        </div>
                        <div className='flex flex-row w-full gap-2 items-center justify-center'>
                            <input className='input input-bordered input-sm flex-1 min-w-0'
                                   value={emailForgot}
                                   placeholder={'Email'}
                                   onChange={(e) => setEmailForgot(e.target.value)}
                            ></input>
                            <button
                                className='btn btn-primary btn-sm text-white flex-shrink-0  transition duration-200 ease-in-out hover:bg-gray-900'
                                onClick={checkFilledInput}
                            >Отправить ссылку</button>
                        </div>
                    </>
                }

            </ul>

        </>
    )
}
export default AuthorizationForm;