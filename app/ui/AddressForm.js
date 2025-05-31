"use client"

import {VALUE_NOT_SELECTED} from "@/constants";
import {PatternFormat} from "react-number-format";
import React, {useEffect, useState} from "react";
import {getClient} from "@/app/lib/api/clients";
import {getRegions} from "@/app/lib/api/regions";
import {useFormik} from "formik";
import {getCities} from "@/app/lib/api/cities";
import {toast, Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {addressesCreateThunk, addressesGetThunk} from "@/app/store/slices/addressesSlice";
import {useAppDispatch} from "@/app/lib/hooks";

const AddressForm = ({setAddressIsAdded, id}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [client, setClient] = useState([]);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const [errorForm, setErrorForm] = useState({
        name: false,
        surname: false,
        region: false,
        city: false,
        address: false,
        phone: false,
    });


    let clientId;
    if (typeof window !== "undefined" && client) {
        clientId = JSON.parse(localStorage.getItem("client")).id;
    }

    useEffect(() => {
        (async () => {
            if (clientId) {
                const result = await getClient(clientId);
                setClient(result.data);
            }

            const regionsList = await getRegions();
            setRegions(regionsList.data);
        })();
    }, [])

    useEffect(() => {
        (async () => {
            if (selectedRegion) {
                const citiesList = await getCities(selectedRegion);
                setCities(citiesList.data);
            }
        })()
    }, [selectedRegion])

    const validate = (values) => {
        let errors = {};

        if (!values.name || values.name.trim().length < 2) {
            errors.name = 'Имя должно содержать минимум 2 символа.';
        }
        if (!values.surname || values.surname.trim().length < 2) {
            errors.surname = 'Фамилия должна содержать минимум 2 символа.';
        }
        if (values.phone.length < 10) {
            errors.phone = 'Номер телефона слишком короткий.';
        }
        if (!values.address || values.address.length < 4) {
            errors.address = 'Адрес должен содержать минимум 4 символа'
        }
        if (selectedRegion === null || selectedRegion == -1) {
            errors.region = 'заполните регион'

        }
        if (selectedCity === null || selectedCity == -1) {
            errors.city = 'заполните город'
        }
        return errors;
    }

    const formik = useFormik({
        enableReinitialize: true,
        validate,
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            clientId: clientId,
            name: '',
            surname: '',
            region: '',
            city: '',
            phone: '',
            address: '',
        },
        onSubmit: async (values) => {

            const errors = await formik.validateForm();
            if (Object.keys(errors).length > 0) {
                toast.error('Исправьте ошибки в форме');
                return;
            }
            const result = await dispatch(addressesCreateThunk(values));

            if (result?.success === true) {
                setAddressIsAdded(false);
                router.push('/account/account-addresses')
            }
        }
    })


    let regionsOptions = [];
    for (let i = 0; i < regions.length; i++) {
        regionsOptions.push(<option key={regions[i].region_id}
                                    value={regions[i].region_id}>{regions[i].region_name}</option>);
    }

    const checkSelectedRegion = (e) => {
        const selectedValue = e.target.value;
        setSelectedRegion(selectedValue);

        formik.setFieldValue('region', selectedValue);
        setErrorForm({
            ...errorForm,
            region: false
        })
    }
    let citiesOptions = [];
    for (let i = 0; i < cities.length; i++) {
        citiesOptions.push(<option key={cities[i].city_id} value={cities[i].city_id}>{cities[i].city_name}</option>)
    }
    const checkSelectedCity = (e) => {
        const selectedValue = e.target.value;
        setSelectedCity(selectedValue);

        formik.setFieldValue('city', selectedValue);
        setErrorForm({
            ...errorForm,
            city: false
        })
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="card bg-base-200 w-full items-center px-5 gap-3">
                    <div className="card-body w-full">
                        <div className="w-full">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Имя</span>
                                </div>
                                <input type="text"
                                       id="name"
                                       name="name"
                                       className="input-sm input-bordered"
                                       placeholder="Имя"
                                       value={formik.values.name}
                                       onBlur={formik.handleBlur}
                                       onChange={formik.handleChange}
                                       required
                                />
                                {formik.errors.name && <div>{formik.errors.name}</div>}
                            </label>
                        </div>


                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Фамилия</span>
                            </div>
                            <input type="text"
                                   id="surname"
                                   name="surname"
                                   className="input-sm input-bordered grow"
                                   placeholder="Фамилия"
                                   value={formik.values.surname}
                                   onBlur={formik.handleBlur}
                                   onChange={formik.handleChange}
                                   required
                            />
                            {formik.errors.surname && <div>{formik.errors.surname}</div>}
                        </label>


                        <div className="w-full">
                            <select className='input-sm input-bordered'
                                    onChange={checkSelectedRegion} required={true}>
                                <option value={VALUE_NOT_SELECTED.value}>Выберите регион</option>
                                {regionsOptions}
                            </select>
                            {formik.errors.region && <div>{formik.errors.region}</div>}
                        </div>

                        <div className="w-full">
                            <select className='input-sm input-bordered'
                                    onChange={checkSelectedCity} required={true}>
                                <option value={VALUE_NOT_SELECTED.value}>Выберите город</option>
                                {citiesOptions}
                            </select>
                            {formik.errors.city && <div>{formik.errors.city}</div>}
                        </div>

                        <div className="w-full">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Адрес доставки</span>
                                </div>
                                <input type="text"
                                       id='address'
                                       name="address"
                                       className='input-sm input-bordered'
                                       placeholder="Советская ул.,12 д.,156 кв."
                                       value={formik.values.address}
                                       onBlur={formik.handleBlur}
                                       onChange={formik.handleChange}
                                       required
                                />
                                {formik.errors.address && <div>{formik.errors.address}</div>}
                            </label>
                        </div>


                        <div className="w-full">
                            <PatternFormat
                                id={'phone'}
                                name={'phone'}
                                format={'+# (###) #### ###'}
                                allowEmptyFormatting mask={'_'}
                                type={'tel'}
                                className="input input-bordered input-sm mb-2"
                                value={formik.values.phone}
                                onValueChange={values => {
                                    formik.setFieldValue('phone', values.value);
                                }}
                            />
                            {formik.errors.phone && <div>{formik.errors.phone}</div>}
                        </div>
                        <button type='sumbit' className="btn btn-primary text-white"
                                onClick={async () => {
                                    await dispatch(addressesGetThunk(id));
                                    setAddressIsAdded(false);
                                }}>Добавить адрес
                        </button>
                    </div>
                </div>
            </form>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}
export default AddressForm;
