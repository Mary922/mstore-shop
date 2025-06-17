"use client"

import React, {useEffect} from "react";
import {useState} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {getClient} from "../../lib/api/clients";
import {getImagesStatic} from "../../lib/api/images";
import AuthorizationForm from "@/app/ui/AuthorizationForm";
import NavbarHeader from "./NavbarHeader";
import AccountForm from "@/app/ui/AccountForm";
import {BASE_URL} from "@/config";

const AuthHeader = () => {
    const baseUrl = `${BASE_URL}/images/static`;

    const [authLabel, setAuthLabel] = useState('');
    const [imageLogoPath, setImageLogoPath] = useState('');
    const [authMode, setAuthMode] = useState(false);

    let tempClient;
    let client;
    let clientId;
    if (typeof window !== "undefined") {
        tempClient = localStorage.getItem("temp-client");
        client = localStorage.getItem("client");
    }

    if (typeof window !== "undefined" && client) {
        clientId = JSON.parse(localStorage.getItem("client")).id;
    }

    useEffect(() => {
        (async () => {
            if (client) {
                setAuthMode(true);
            }

            let clientRes;
            if (client) {
                clientRes = await getClient(clientId);
            }
            if (localStorage.getItem('client') === null) {
                setAuthLabel('');
            } else {
                setAuthLabel(`Привет, ${clientRes.data.client_name}`)
            }
        })()
    }, [])


    useEffect(() => {
        (async () => {
            const resLogo = await getImagesStatic('web', 'logo');
            if (resLogo?.data) {
                setImageLogoPath(resLogo.data[0].image_path);
            }
        })()
    }, [])

    return (
        <>
            <div className="navbar w-full p-2.5 navbar-top">
                <div className="navbar-start">
                </div>
                <div className='navbar-center nav-logo'>
                    {imageLogoPath ?
                        <img
                            className="w-40 h-auto "
                            src={`${baseUrl}/${imageLogoPath}`}
                            alt=""
                        />
                        : null}
                </div>

                <div className="navbar-end navbar-end-auth mr-6">
                    <div className='text-lg mr-1 auth-label'>{authLabel}</div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0}
                             role="button"
                             className="flex flex-row btn-circle avatar cursor-pointer mr-5"
                        >
                            <div className="w-12 rounded-full">
                                <svg className="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                                          clipRule="evenodd"/>
                                </svg>
                                {
                                    authMode ? <AccountForm/> :
                                        <AuthorizationForm clientId={clientId} tempClient={tempClient}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavbarHeader/>
            <div className='flex flex-row items-center bg-emerald-500 text-black h-10 pl-5 py-1 w-full navbar-info'>
                <div className='text-neutral-content'>Бесплатная доставка от 2000 ₽</div>
            </div>
        </>

    )
}

export default AuthHeader;