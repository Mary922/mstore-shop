"use client"
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import {useState} from "react";
import {useFormik} from "formik";
import moment from "moment";
import {PatternFormat} from "react-number-format";
import {Registration} from "@/app/lib/api/registration";
import {Auth, CheckValidationPassword} from "@/app/lib/api/auth";
import {useRouter, useSearchParams} from "next/navigation";
import {toast, Toaster} from "react-hot-toast";
import clsx from "clsx";
import "react-day-picker/style.css";
import {DatePickerComponent} from "@/app/common/DatePickerComponent";
import MainLayout from "@/app/ui/MainLayout";
import validator from "validator";
import {resetPasswordRequest} from "@/app/lib/api/forgotPassword";
import {Suspense} from "react";


export default function RegistrationLoadingPage() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <RegistrationPage/>
        </Suspense>
    );
};

function RegistrationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get("from");

    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');

    const [validationPassword, setValidationPassword] = useState(false);
    const [validationPasswordValue, setValidationPasswordValue] = useState('');
    const [repeatRequestPassword, setRepeatRequestPassword] = useState(false);

    const [forgotPassword, setForgotPassword] = useState(false);
    const [emailForgot, setEmailForgot] = useState('mary_k_92@mail.ru');

    const [errorForm, setErrorForm] = useState({
        name: false,
        surname: false,
        phone: false,
        email: false,
        password: false,
        birthday: false,
    });

    const classes = {
        name: clsx({'input input-sm input-bordered w-full mb-2': true},
            {'input-error': errorForm.name},
        ),
        surname: clsx({'input input-sm input-bordered w-full mb-2': true},
            {'select-error': errorForm.surname},
        ),
        email: clsx({'input input-sm input-bordered w-full mb-2': true},
            {'select-error': errorForm.email},
        ),
        phone: clsx({'input input-sm input-bordered w-full mb-2': true},
            {'input-error': errorForm.phone},
        ),
        password: clsx({'input input-sm input-bordered w-full mb-2': true},
            {'select-error': errorForm.password},
        ),
        birthday: clsx({'input-sm input-bordered': true},
            {'select-error': errorForm.birthday},
        ),
    };

    let tempClient = '';
    let client;
    let clientId;

    if (typeof window !== "undefined") {
        tempClient = localStorage.getItem("temp-client");
        client = localStorage.getItem("client");
    }

    if (typeof window !== "undefined" && client) {
        clientId = JSON.parse(localStorage.getItem("client")).id;
    }

    const checkClient = async () => {
        if (clientId || tempClient) {
            const result = await Auth({email: authEmail, password: authPassword});

            if (result.data?.accessToken) {
                localStorage.setItem('client', JSON.stringify(result.data));
                localStorage.removeItem('temp-client');
                router.push(from);
            }
        }
    }

    const validate = (values) => {
        let errors = {};

        if (!/^[a-zA-Zа-яё\s\-]+$/i.test(values.name)) {
            errors.name = 'Имя должно содержать только русские буквы, пробелы и дефисы.';
        }
        if (!/^[a-zA-Zа-яё\s\-]+$/i.test(values.surname)) {
            errors.surname = 'Фамилия должна содержать только русские буквы, пробелы и дефисы.';
        }
        const phoneDigits = values.phone.replace(/\D/g, '');
        if (phoneDigits.length < 11) {
            errors.phone = 'Номер телефона должен содержать 11 цифр.';
        }
        if (!values.email || !validator.isEmail(values.email)) {
            errors.email = 'Некорректный адрес электронной почты.';
        }
        if (!values.password || values.password.trim().length < 8) {
            errors.password = 'Пароль должен содержать минимум 8 символов.';
        }
        const today = moment().format('YYYY-MM-DD');
        const birthDay = moment(values.birthday,'YYYY-MM-DD',true);
        if (!values.birthday) {
            errors.birthday = 'Укажите дату рождения.';
        }
        else if (!birthDay.isValid()) {
            errors.birthday = 'Некорректный формат даты.';
        }
        else if (birthDay.isSameOrAfter(today,'day')) {
            errors.birthday = 'Дата рождения должна быть раньше сегодняшнего дня.';
        }
        return errors;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.handleChange(e);
        setErrorForm(prev => ({
            ...prev,
            [name]: false
        }));
    };

    const formik = useFormik({
        enableReinitialize: true,
        validate,
        initialValues: {
            name: '',
            surname: '',
            phone: '',
            email: '',
            password: '',
            birthday: '',
        },
    })

    const registerClient = async () => {
        await formik.validateForm();

        const errors = validate(formik.values);
        if (Object.keys(errors).length > 0) {
            setErrorForm({
                name: !!errors.name,
                surname: !!errors.surname,
                phone: !!errors.phone,
                email: !!errors.email,
                password: !!errors.password,
                birthday: !!errors.birthday,
            });

        const firstError = Object.values(errors).find(error => error);
        if (firstError) {
            toast.error(firstError);
        }
        return;
    }

        try {
            if (tempClient) {
                const result = await Registration(
                    {
                        name: formik.values.name,
                        surname: formik.values.surname,
                        phone: formik.values.phone,
                        email: formik.values.email,
                        password: formik.values.password,
                        birthday: formik.values.birthday,
                        tempClientToken: tempClient,
                    });

                if (result?.success === true) {
                    setValidationPassword(true);
                } else {
                    console.log('imhere');
                    toast.error('Пользователь с таким email уже существует.');
                }
            } else {
                console.log('its error');

            }

        } catch (error) {
            console.error("Ошибка при регистрации:", error);
        }
    }

    const checkValidationPassword = async () => {
        try {
            const result = await CheckValidationPassword({
                email: formik.values.email,
                generatedPassword: validationPasswordValue,
                name: formik.values.name,
                surname: formik.values.surname,
                phone: formik.values.phone,
                password: formik.values.password,
                birthday: formik.values.birthday,
                tempClientToken: tempClient,
            })
            if (result?.success === true) {
                setValidationPassword(false);
                toast('Вы успешно зарегистрированы!', {
                    icon: '👏',
                });
                setValidationPasswordValue('');
                setTimeout(() => {
                    router.push('/');
                }, 2000)

                const authMode = await Auth({email: formik.values.email, password: formik.values.password});

                if (authMode?.success) {
                    setValidationPassword(true);
                }
                if (authMode?.success) {
                    localStorage.removeItem('temp-client');
                    localStorage.setItem('client', JSON.stringify(authMode.data));
                }
            } else if (result?.success === false && result?.status === 403) {
                toast.error('Пароль действует 5 минут. Запросите пароль еще раз.');
                setValidationPassword(false);
                setValidationPasswordValue('');
                setRepeatRequestPassword(true);
            } else {
                toast.error('Неправильный пароль.');
                setValidationPassword(false);
                setValidationPasswordValue('');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkFilledInput = async () => {
        if (!emailForgot?.trim()) {
            return false;
        }
        const isValidEmail = validator.isEmail('emailForgot');
        if (!isValidEmail) {
            toast.error('Некорректный адрес электронной почты.');
            return false;
        }
        try {
            const result = await resetPasswordRequest(emailForgot);

            if (result?.success) {
                setForgotPassword(false);
                setEmailForgot('');
                toast.success('Проверьте почту для восстановления пароля');
            }
        } catch (error) {
            toast.error("Произошла ошибка при восстановлении пароля.", {icon: '⛔️'});
        }
    }

    return (
        <>
            <MainLayout>
                    <div className="container mx-auto my-10 text-lg auth">
                        <div className="flex flex-row justify-center gap-4 auth-block">
                            <div className="w-full shadow-xl">
                                <div className="p-10">
                                    <h2>ВХОД</h2>
                                    <div className="flex flex-col justify-between">
                                        <label className="flex items-center gap-2">
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
                                                   value={authEmail}
                                                   onChange={(e) => setAuthEmail(e.target.value)}
                                                   className="w-full input input-bordered input-sm mb-2"
                                                   placeholder="Email"
                                            />
                                        </label>
                                        <div className="flex flex-col w-full">
                                            <label className="flex items-center gap-2">
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
                                                       value={authPassword}
                                                       placeholder="Пароль"
                                                       onChange={(e) => setAuthPassword(e.target.value)}
                                                       className="w-full input input-bordered input-sm "
                                                />
                                            </label>
                                        </div>
                                        <button
                                            className="h-10 mt-3 flex justify-center items-center cursor-pointer rounded-md
                                bg-primary px-4 py-3 text-center text-sm font-semibold uppercase text-white
                                transition duration-200 ease-in-out hover:bg-gray-900" onClick={checkClient}>
                                            Авторизоваться
                                        </button>
                                        {
                                            forgotPassword === false ?
                                                <a className='cursor-pointer' onClick={() => setForgotPassword(true)}>Забыли
                                                    пароль?</a>
                                                : null
                                        }
                                        {
                                            forgotPassword &&
                                            <>
                                                <div className='flex flex-row justify-between items-center'>
                                                    <div className='text-info my-2'>Укажите почту для восстановления
                                                        пароля
                                                    </div>
                                                    <div onClick={() => setForgotPassword(false)}>
                                                        <svg
                                                            className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            fill="none"
                                                            viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="1" d="M6 18 17.94 6M18 18 6.06 6"/>
                                                        </svg>

                                                    </div>
                                                </div>
                                                <div className='flex flex-row w-full gap-2 items-center justify-center forgot-password'>
                                                    <input className='input input-bordered input-sm flex-1 min-w-0'
                                                           value={emailForgot}
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
                                    </div>

                                </div>
                            </div>
                            <div className="card w-full shadow-xl">
                                <div className="w-full shadow-xl">
                                    <div className="p-10">
                                        <h2>РЕГИСТРАЦИЯ</h2>
                                        <div className="flex flex-col justify-between">
                                            <label className="flex items-center gap-2">
                                                <div className="w-5">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 16 16"
                                                        fill="currentColor"
                                                        className="h-4 w-4 opacity-70">
                                                        <path
                                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
                                                    </svg>
                                                </div>
                                                <input id="name"
                                                       type="text"
                                                       name="name"
                                                       value={formik.values.name}
                                                       onChange={handleChange}
                                                       onBlur={formik.handleBlur}
                                                       className={classes.name}
                                                       placeholder="Имя" required
                                                />
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <div className="w-5">
                                                    <svg className="w-6 h-6 text-gray-800 dark:text-white"
                                                         aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd"
                                                              d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                </div>
                                                <input id="surname"
                                                       type="text"
                                                       name="surname"
                                                       value={formik.values.surname}
                                                       onChange={handleChange}
                                                       onBlur={formik.handleBlur}
                                                       className={classes.surname}
                                                       placeholder="Фамилия" required
                                                />
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <div className="w-5">
                                                    <svg className="w-6 h-6 text-gray-800 dark:text-white"
                                                         aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         fill="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
                                                    </svg>
                                                </div>
                                                <PatternFormat
                                                    id={'phone'}
                                                    name={'phone'}
                                                    format={'+# (###) #### ###'}
                                                    allowEmptyFormatting mask={'_'}
                                                    type={'tel'}
                                                    value={formik.values.phone}
                                                    className={classes.phone}
                                                    onValueChange={values => {
                                                        formik.setFieldValue('phone', values.value);
                                                        setErrorForm(prevState => ({
                                                            ...prevState,
                                                            phone: false
                                                        }))
                                                    }}
                                                />
                                            </label>

                                            <label className="flex items-center gap-2">
                                                <div className="w-5">
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
                                                </div>
                                                <input id="email"
                                                       type="email"
                                                       name="email"
                                                       value={formik.values.email}
                                                       onChange={formik.handleChange}
                                                       className={classes.email}
                                                       placeholder="Email"
                                                       required
                                                />
                                            </label>

                                            <label className="flex items-center gap-2">
                                                <div className="w-5">
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
                                                </div>
                                                <input id={'password'}
                                                       name={'password'}
                                                       type={'password'}
                                                       placeholder="Пароль"
                                                       value={formik.values.password}
                                                       onChange={formik.handleChange}
                                                       className={classes.password}
                                                       required
                                                />
                                            </label>

                                            <label className="flex items-center gap-2">
                                                <div className="w-5">
                                                    <svg className="w-6 h-6 text-gray-800 dark:text-white"
                                                         aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd"
                                                              d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                </div>
                                                <DatePickerComponent
                                                    formik={{
                                                        values: formik.values,
                                                        setFieldValue: formik.setFieldValue,
                                                        setTouched: formik.setTouched
                                                    }}/>
                                            </label>
                                            {
                                                !validationPassword ?
                                                    <button
                                                        className='h-10 mt-3 flex justify-center items-center cursor-pointer rounded-md
                                bg-primary px-4 py-3 text-center text-sm font-semibold uppercase text-white
                                transition duration-200 ease-in-out hover:bg-gray-900' onClick={registerClient}>
                                                        Регистрация
                                                    </button> : ''
                                            }

                                            {
                                                validationPassword ?
                                                    <>
                                                        <div>Код подтверждения:</div>
                                                        <input
                                                            type='text'
                                                            className='input input-bordered input-sm mb-1'
                                                            value={validationPasswordValue}
                                                            onChange={(event) => setValidationPasswordValue(event.target.value)}/>
                                                        <button className='btn btn-primary text-white text-lg'
                                                                onClick={checkValidationPassword}>Подтвердить
                                                        </button>
                                                    </>
                                                    : null
                                            }
                                            {
                                                repeatRequestPassword ? <div className='cursor-pointer' onClick={async () => {
                                                    setValidationPassword(true);
                                                    setRepeatRequestPassword(false);
                                                    await registerClient();
                                                }}>запросить пароль еще раз</div> : null
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />
            </MainLayout>
        </>
    )
}
