'use client'
import React from 'react';
import {useState, useEffect} from "react";
import {useFormik} from "formik";
import moment from 'moment';
import DatePicker from "react-datepicker";
import {getClient, updateClient} from "@/app/lib/api/clients";
import {PatternFormat} from "react-number-format";
import {toast,Toaster} from "react-hot-toast";


export default function AccountInfoPage() {
    const [clientInfo, setClientInfo] = useState({});
    const [isShow, setIsShow] = useState(false);
    const [loading, setLoading] = useState(false);


    let clientId;
    const client = JSON.parse(localStorage.getItem("client"));
    if (client) {
        clientId = client.id;
    }

    useEffect(() => {
        (async () => {
            if (clientId) {
                const clientRes = await getClient(clientId);
                setClientInfo(clientRes.data);
            }
        })()
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: clientInfo.client_name || '',
            surname: clientInfo.client_surname || '',
            birthday: moment(clientInfo.client_birthday).format('YYYY-MM-DD') || '',
            phone: clientInfo.client_phone || '',
            email: clientInfo.client_email || '',
        },
        onSubmit: (values) => {
            console.log(values);
            console.log(JSON.stringify(values, null, 2));
        }
    })
    // console.log('formik',formik);

    // const openToast = () => {
    //     set(true);
    // }
    // const closeToast = () => {
    //     setShow(false);
    // }

    const updateClientInfo = async () => {
        const updateClientInfo = await updateClient({
            clientId: clientId,
            clientName: formik.values.name,
            clientSurname: formik.values.surname,
            clientPhone: formik.values.phone,
            clientEmail: formik.values.email,
        });
        if (updateClientInfo.success) {
            console.log('data changed successfully');
            setIsShow(true);
        }
    }

    const handleAsyncOperation = async () => {
        try {
            setLoading(true);

            const promise = new Promise((resolve) =>
                setTimeout(resolve, 3000)
            );

            const toastId = toast.promise(promise, {
                loading: 'Выполняется операция...',
                success: 'Данные успешно изменены!',
                error: 'Произошла ошибка.',
            });

            await promise;

            toast.success('Операция завершена!', {
                id: toastId,
            });
        } catch (error) {
            console.error(error);
            toast.error('Ошибка при выполнении операции.', {
                id: toastId,
            });
        } finally {
            setLoading(false);
        }
    };




    return (
        <>
            <div className='flex flex-row w-96 gap-4'>
            <div className="flex flex-col gap-4 w-full">
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
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           className="w-full input input-bordered input-sm mb-2"
                           placeholder="Email" required
                    />
                </label>
                <label className="flex items-center gap-2">
                    <div className="w-5">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
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
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           className="w-full input input-bordered input-sm mb-2"
                           placeholder="Фамилия" required
                    />
                </label>
                <label className="flex items-center gap-2">
                    <div className="w-5">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
                        </svg>
                    </div>
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
                        // onBlur={formik.handleBlur}
                           className="w-full input input-bordered input-sm mb-2"
                           placeholder="Email"
                           required
                    />
                </label>
                <button type="submit"
                        className='btn btn-primary btn-sm'
                    // onClick={formik.handleSubmit}>Submit</button>
                        onClick={async ()=> {
                            await updateClientInfo();
                            await handleAsyncOperation();
                        }}>Submit
                </button>
            </div>
            </div>
            <Toaster/>
        </>
    )
}
//
// export const DatePickerField = ({name, value, setFieldValue}) => {
//
//     return (
//         <DatePicker
//             className={'form-control'}
//             name={name}
//             selected={(value && new Date(value)) || null}
//             onChange={(val) => {
//                 setFieldValue(name, moment(val).format('YYYY-MM-DD'));
//             }}
//             showMonthYearDropdown/>
//     );
// };