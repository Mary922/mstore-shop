'use client'
import React, {useState} from "react";
import {Auth} from "@/app/lib/api/auth";
import validator from "validator";
import {resetPasswordRequest} from "@/app/lib/api/forgotPassword";


const AuthorizationForm = ({clientId, tempClient}) => {

    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const [emailForgot, setEmailForgot] = useState('');

    let client;

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
                setError('Неверные данные');

                if (result?.data?.accessToken) {
                    localStorage.setItem('client', JSON.stringify(result.data));
                    localStorage.removeItem('temp-client');
                    setError('');
                    window.location.reload();
                }
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Invalid credentials. Please check your email/password.');
                await logOut();
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    }
    const checkFilledInput = async () => {
        if (!emailForgot?.trim()) {
            return false;
        }
        const isValidEmail = validator.isEmail('emailForgot');
        if (isValidEmail) {
            return false;
        } else {
            const result = await resetPasswordRequest(emailForgot);

            if (result.success) {
                setForgotPassword(false);
                setEmailForgot('');
            }
        }
    }

    return (
        <>
            <ul
                tabIndex={0}
                className="menu dropdown-content mt-7 mr-20 rounded-box w-96 z-[100] shadow p-2.5 bg-neutral-content">
                <div className="flex flex-row justify-between">
                    <li><a className="link link-hover text-base text-neutral" href={'/registration'}>Создать аккаунт</a>
                    </li>
                    <li>
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
                            >Отправить ссылку
                            </button>
                        </div>
                    </>
                }

            </ul>

        </>
    )
}
export default AuthorizationForm;