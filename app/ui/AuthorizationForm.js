'use client'
import React, {useEffect,useState} from "react";
import {Auth} from "@/app/lib/api/auth";

const AuthorizationForm = ({clientId, tempClient}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    // console.log('prop clientId', clientId);
    // console.log('prop tempClient', tempClient);

    // let clientId;
    // let client = null;
    // let tempClient;
    //
    // if (typeof window !== "undefined") {
    //     let tempClient = localStorage.getItem("temp-client");
    // }
    //
    // useEffect(() => {
    //     client = window.localStorage.getItem('client');
    //     if (client) {
    //         clientId = JSON.parse(client).id;
    //     }
    // }, []);
    // console.log('tempClient header', tempClient);
    // console.log('client header', client);

    const checkClient = async () => {
        if (clientId || tempClient) {
            const result = await Auth({email: email, password: password});
            console.log('TOKEN RESPONSE', result);

            if (result.data?.accessToken) {
                localStorage.setItem('client', JSON.stringify(result.data));
                localStorage.removeItem('temp-client');
                window.location.reload();
                // window.location.replace('/home');
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
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-2.5 mr-20 bg-white rounded-box w-96 z-[2] shadow p-2.5">
                        <div className="flex flex-row justify-between">
                            <li>
                                <div>ВОЙТИ</div>
                            </li>
                            <li><a href={'/registration'}>Создать аккаунт</a></li>
                        </div>

                        <hr className="border-t border-gray-400 my-4"/>

                        <div className="flex flex-col mb-2.5">
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
                                       className="input-sm input-bordered grow"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       placeholder="Email"
                                />
                            </label>
                        </div>

                        <div className="flex flex-col">
                            <label className="flex items-center bg-white">
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
                                       className="input-sm input-bordered grow"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                        </div>
                        <button
                            className="h-10 mt-3 flex justify-center items-center cursor-pointer rounded-md
                                bg-primary px-4 py-3 text-center text-sm font-semibold uppercase text-white
                                transition duration-200 ease-in-out hover:bg-gray-900" onClick={checkClient}>
                            Авторизоваться
                        </button>
                        <li><a>Забыли пароль?</a></li>
                    </ul>

        </>
    )
}
export default AuthorizationForm;