"use client"
import React, {useEffect} from 'react';
import {useState} from "react";
import {useFormik} from "formik";
import moment from "moment";
import {PatternFormat} from "react-number-format";
import DatePicker from "react-datepicker";
import {Registration} from "@/app/lib/api/registration";


export default function RegistrationPage() {

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const [errorForm, setErrorForm] = useState({
        name: false,
        surname: false,
        phone: false,
        email: false,
        password: false,
        birthday: false,
    });

    let clientId;
    let client = null;
    const tempClient = localStorage.getItem("temp-client");

    useEffect(() => {
        client = window.localStorage.getItem('client');
        if (client) {
            clientId = JSON.parse(client).id;
        }
    }, []);


    // let clientId;
    // const client = JSON.parse(localStorage.getItem("client"));
    // if (client) {
    //     clientId = client.id;
    // }

    const validate = (values) => {
        let errors = {};

        if (!values.name || values.name.trim().length < 2) {
            errors.name = 'Имя должно содержать минимум 2 символа.';
            // console.log(errors.name);
        }
        if (!values.surname || values.surname.trim().length < 2) {
            errors.surname = 'Фамилия должна содержать минимум 2 символа.';
            // console.log(errors.surname);
        }
        if (values.phone.length < 10) {
            errors.phone = 'Номер телефона слишком короткий.';
            // console.log(errors.phone);
        }
        if (!values.email || values.email.trim().length < 5) {
            errors.email = 'E-mail должен содержать минимум 5 символов.';
            // console.log(errors.email);
        }
        if (!values.password || values.password.trim().length < 6) {
            errors.password = 'Пароль должен содержать минимум 6 символов.';
            // console.log(errors.password);
        }
        if (values.birthday.trim().length < 10) {
            errors.birthday = 'Дата рождения должна содержать минимум 8 символов.';
            // console.log(errors.birthday);
        }
        return errors;
    }

    const formik = useFormik({
        enableReinitialize: true,
        validate,
        initialValues: {
            name: 'mary',
            surname: 'gon',
            phone: '73494855345',
            email: 'dwd@makd.ru',
            password: '345rtet',
            birthday: moment().format('YYYY-MM-DD'),
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
        }
    })
    // console.log('formik',formik);

    const registerClient = async () => {
        const formikErrors = formik.errors;
        console.log('formikErrors', formikErrors)

        if (Object.keys(formikErrors).length > 0) {
            console.log('Заполните все поля');
            return false;
        }
        try {
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

            if (result.success === true) {
                // setValidationPassword(true);
                console.log("Проверьте свою почту для активации аккаунта.");
            } else {
                console.log("Что-то пошло не так. Попробуйте еще раз.")
            }
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
            console.log("Произошла ошибка при регистрации. Попробуйте еще раз.");
        }
    }

    return (
        <>
            <div className="container mx-auto my-10 bg-pink-300 text-lg">
                <div className="flex flex-row items-center justify-center">
                    <div className=" bg-white w-full shadow-xl">
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
                                    <input type="text" className="w-full input input-bordered input-sm mb-2"
                                           placeholder="Email"/>
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
                                        <input type="password" className="w-full input input-bordered input-sm "/>
                                    </label>
                                </div>
                                <button
                                    className="h-10 mt-3 flex justify-center items-center cursor-pointer rounded-md
                                bg-primary px-4 py-3 text-center text-sm font-semibold uppercase text-white
                                transition duration-200 ease-in-out hover:bg-gray-900">
                                    Авторизоваться
                                </button>
                                <a>Забыли пароль?</a>
                            </div>

                        </div>
                    </div>


                    <div className="card bg-base-100 w-full shadow-xl">
                        <div className=" bg-white w-full shadow-xl">
                            <div className="p-10">
                                <h2>РЕГИСТРАЦИЯ</h2>
                                <div className="flex flex-col justify-between">
                                    <label className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="h-4 w-4 opacity-70">
                                            <path
                                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
                                        </svg>
                                        <input id="name"
                                               type="text"
                                               name="name"
                                               value={formik.values.name}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                               className="w-full input input-bordered input-sm mb-2"
                                               placeholder="Email" required
                                        />
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd"
                                                  d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z"
                                                  clipRule="evenodd"/>
                                        </svg>

                                        <input id="surname"
                                               type="text"
                                               name="surname"
                                               value={formik.values.surname}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                               className="w-full input input-bordered input-sm mb-2"
                                               placeholder="Фамилия" required
                                        />
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
                                        </svg>


                                        <PatternFormat
                                            id={'phone'}
                                            name={'phone'}
                                            // className={classes.phone}
                                            format={'+# (###) #### ###'}
                                            allowEmptyFormatting mask={'_'}
                                            type={'tel'}
                                            value={formik.values.phone}
                                            className="w-full input input-bordered input-sm mb-2"
                                            onValueChange={values => {
                                                formik.setFieldValue('phone', values.value);
                                            }}
                                            // onValueChange={(values) => handlePhoneChange(values)}
                                        />
                                        {/*<input type="text" className="w-full input input-bordered input-sm mb-2"*/}
                                        {/*       placeholder="Телефон"/>*/}
                                    </label>

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
                                        <input id="email"
                                               type="email"
                                               name="email"
                                               value={formik.values.email}
                                               onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                               className="w-full input input-bordered input-sm mb-2"
                                               placeholder="Email"
                                               required
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
                                            <input id={'password'}
                                                   name={'password'}
                                                   type={'password'}
                                                   placeholder="Password"
                                                   value={formik.values.password}
                                                   onChange={formik.handleChange}
                                                   className="w-full input input-bordered input-sm "
                                                   required
                                            />
                                        </label>

                                        <label className="flex items-center gap-2">
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd"
                                                      d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                                      clipRule="evenodd"/>
                                            </svg>


                                            <DatePickerField
                                                id="birthday"
                                                type='date'
                                                name={'birthday'}
                                                value={formik.values.birthday}
                                                setFieldValue={formik.setFieldValue}
                                            />
                                        </label>
                                    </div>
                                    <button
                                        className="h-10 mt-3 flex justify-center items-center cursor-pointer rounded-md
                                bg-primary px-4 py-3 text-center text-sm font-semibold uppercase text-white
                                transition duration-200 ease-in-out hover:bg-gray-900">
                                        Регистрация
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}


export const DatePickerField = ({name, value, setFieldValue}) => {

    return (
        <DatePicker
            className="w-full input input-bordered input-sm mb-2"
            name={name}
            selected={(value && new Date(value)) || null}
            onChange={(val) => {
                setFieldValue(name, moment(val).format('YYYY-MM-DD'));
            }}
            showMonthYearDropdown/>
    );
};

