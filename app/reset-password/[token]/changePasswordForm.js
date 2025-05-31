"use client"
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {changeForgottenPasswordRequest} from "@/app/lib/api/forgotPassword";

export default function ChangePasswordForm({token}) {
    const router = useRouter();
    // console.log('tokentoken', token);

    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    // const [passwordsMatch, setPasswordsMatch] = useState(false);
    // const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // const [validPassword, setValidPassword] = useState(false);
    const [invalidPasswordFormat, setInvalidPasswordFormat] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const [fieldsTouched, setFieldsTouched] = useState(false);

    console.log('firstPassword', firstPassword);
    console.log('secondPassword', secondPassword);

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    useEffect(() => {
        const passwordsAreEqual = firstPassword === secondPassword;
        setPasswordMismatch(!passwordsAreEqual);
    }, [firstPassword, secondPassword]);


    useEffect(() => {
        const isValid = passwordRegex.test(firstPassword);
        setInvalidPasswordFormat(!isValid);
        // setValidPassword(isValid);
    },[firstPassword])

    useEffect(() => {
        if (firstPassword.trim() || secondPassword.trim()) {
            setFieldsTouched(true); // помечаем, что поля начали использоваться
        }
    }, [firstPassword, secondPassword])

    // useEffect(()=>{
    //     if(!validPassword && firstPassword.trim()) {
    //         console.log('password doesnt contain all rules');
    //         setShowError(true);
    //     }
    // },[validPassword]);

    const changePassword = async () => {
        try {
            const result = await changeForgottenPasswordRequest(token,firstPassword);
            console.log('result changePassword', result);

            if (result.success) {
                setShowSuccess(true);
                setFirstPassword('');
                setSecondPassword('');
                setPasswordMismatch(false);
                setInvalidPasswordFormat(false);
                setFieldsTouched(false);

                setTimeout(() => {
                    router.push('/');
                },2000);
            }

        } catch (error) {
            console.log('error with change forgotten password', error);
        }
    }

    return (
        <>

            <div className='flex items-center justify-center min-h-screen'>
                <div className="card w-96 bg-base-100 card-lg shadow-xl rounded-lg">
                    <div className="card-body">
                        <h2 className="card-title my-0">Введите новый пароль</h2>
                        <p className='text-sm text-info'>Пароль должен быть больше чем 8 символов, включая цифру, строчную букву, заглавную букву</p>
                        <div className='w-full gap-2 flex flex-col'>
                            <label className="flex items-center w-full validator">
                                <svg className="h-[1em] opacity-50 mr-2" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none"
                                       stroke="currentColor">
                                        <path
                                            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                    </g>
                                </svg>
                                <input type="password" className="input input-bordered input-md w-full" required
                                       value={firstPassword}
                                       onChange={(e) => setFirstPassword(e.target.value)}
                                       placeholder="Password" minLength="8"
                                       pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                       title="Должен быть больше чем 8 символов, включая цифру, строчную букву, заглавную букву"/>
                            </label>
                            <label className="flex items-center w-full validator">
                                <svg className="h-[1em] opacity-50 mr-2" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none"
                                       stroke="currentColor">
                                        <path
                                            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                    </g>
                                </svg>
                                <input type="password" className="input input-bordered input-md w-full" required
                                       value={secondPassword}
                                       onChange={(e) => setSecondPassword(e.target.value)}
                                       placeholder="Password" minLength="8"
                                       pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                       title="Должен быть больше чем 8 символов, включая цифру, строчную букву, заглавную букву"/>
                            </label>
                            <p className="validator-hint hidden">
                                Должен быть больше чем 8 символов, включая
                                <br/>Хотя бы одну цифру
                                <br/>Хотя бы одну строчную букву
                                <br/>Хотя бы одну заглавную букву
                            </p>

                            <div className='flex flex-col gap-1'>
                            {fieldsTouched && passwordMismatch && (
                                <div className="text-red-500 text-sm">Пароли не совпадают</div>
                            )}
                            {fieldsTouched && invalidPasswordFormat && (
                                <div className="text-red-500 text-sm">Пароль не соответствует требованиям</div>
                            )}
                            </div>

                            {/*{showError && (*/}
                            {/*    <p className="text-red-500 text-sm">Пароли не совпадают</p>*/}
                            {/*)}*/}
                        </div>

                        <div className="justify-end card-actions">
                            <button
                                className={`btn w-full transition-colors duration-200 text-lg 
                                ${passwordMismatch || invalidPasswordFormat
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "btn-neutral text-white hover:bg-primary-600 active:bg-primary-700"
                                }`}
                                disabled={passwordMismatch || invalidPasswordFormat}
                                onClick={changePassword}
                            >
                                Изменить пароль
                            </button>
                            <div className={`relative ${showSuccess ? 'h-6' : 'h-0'}`}>
                                {showSuccess && (
                                    <div className="absolute top-0 -left-80 label">
                                        <span className="label-text-alt text-info">Пароль успешно изменен</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}