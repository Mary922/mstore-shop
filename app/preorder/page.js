"use client"
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import React, {useState, useEffect} from "react";
import clsx from "clsx";
import {getClient} from "@/app/lib/api/clients";
import {getRegions} from "@/app/lib/api/regions";
import {getCities} from "@/app/lib/api/cities";
import {makeOrder} from "@/app/lib/api/orders";
import {PatternFormat} from "react-number-format";
import {toast, Toaster} from "react-hot-toast";
import {VALUE_NOT_SELECTED} from "@/constants";
import {useRouter, useSearchParams} from "next/navigation";
import {clearCartThunk} from "@/app/store/slices/cartSlice";
import MainLayout from "@/app/ui/MainLayout";

export default function PreorderPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const sumUrlParam = useSearchParams();
    const sum = sumUrlParam.get('sum');

    const [client, setClient] = useState([]);
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cities, setCities] = useState([]);
    const [address, setAddress] = useState(null);
    const [errorForm, setErrorForm] = useState({
        region: false,
        city: false,
        address: false,
        phone: false,
    });


    const cart = useAppSelector((state) => state.cart.cart);
    let clientId;

    if (typeof window !== "undefined" && client) {
        clientId = JSON.parse(localStorage.getItem("client")).id;
    }

    const classes = {
        address: clsx({'input-sm input-bordered': true},
            {'input-error': errorForm.address},
        ),
        region: clsx({'select select-bordered w-full max-w-xs': true},
            {'select-error': errorForm.region},
        ),
        city: clsx({'select select-bordered w-full max-w-xs': true},
            {'select-error': errorForm.city},
        ),
        phone: clsx({'input-sm input-bordered': true},
            {'input-error': errorForm.phone},
        )
    };

    useEffect(() => {
        (async () => {
            if (clientId) {
                const result = await getClient(clientId);
                setClient(result.data);

                if (result.data.Addresses) {
                    const actualAddress = result.data.Addresses;

                    for (let i = 0; i < actualAddress.length; i++) {
                        setSelectedRegion(actualAddress[i].region_id);
                        setSelectedCity(actualAddress[i].city_id);
                        setAddress(actualAddress[i].address_name);
                    }
                }
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

    let regionsOptions = [];
    for (let i = 0; i < regions.length; i++) {
        regionsOptions.push(<option key={regions[i].region_id}
                                    value={regions[i].region_id}>{regions[i].region_name}</option>);
    }
    const checkSelectedRegion = (data) => {
        setErrorForm({
            ...errorForm,
            region: false
        })
        setSelectedRegion(data.target.value);
    }
    let citiesOptions = [];
    for (let i = 0; i < cities.length; i++) {
        citiesOptions.push(<option key={cities[i].city_id} value={cities[i].city_id}>{cities[i].city_name}</option>)
    }
    const checkSelectedCity = (data) => {
        setErrorForm({
            ...errorForm,
            city: false
        })
        setSelectedCity(data.target.value);
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
        setErrorForm({
            ...errorForm,
            address: false
        })
    }

    const createOrder = async () => {

        const errorsInInputs = checkFilledInputs();

        if (Object.keys(errorsInInputs).length > 0) {
            setErrorForm(errorsInInputs);
            return false;
        }

        const result = await makeOrder({
                client: clientId,
                region: selectedRegion,
                city: selectedCity,
                address: address,
                phone: client.client_phone,
            },
            cart,
            sum,
        )

        if (result.success) {
            await dispatch(clearCartThunk(clientId));
            toast.success('Спасибо за заказ!');

            setTimeout(() => {
                router.push('account/orders');
            }, 2000);
        } else {
            toast.error('error here')
        }
    }

    const checkFilledInputs = () => {
        let newErrorForm = {};

        if (selectedRegion === null || selectedRegion == -1) {
            toast.error('заполните регион');
            newErrorForm.region = true

        }
        if (selectedCity === null || selectedCity == -1) {
            toast.error('заполните город');
            newErrorForm.city = true
        }
        if (!address || address.length < 4) {
            toast.error('заполните адрес');
            newErrorForm.address = true
        }
        return newErrorForm;
    }

    return (
        <>
            <MainLayout>
                <div className="flex flex-col w-full my-10 items-center">
                    <div className="card bg-neutral-200 w-[500px] items-center p-5 shadow-lg py-0">
                        <div className="card-body w-full">
                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Имя</span>
                                    </div>
                                    <input type="text"
                                           className="input-sm input-bordered "
                                           placeholder="Имя"
                                           defaultValue={client.client_name}
                                           required readOnly={true}
                                    />
                                </label>
                            </div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Фамилия</span>
                                </div>
                                <input type="text"
                                       className="input-sm input-bordered grow"
                                       placeholder="Фамилия"
                                       defaultValue={client.client_surname}
                                       required readOnly={true}
                                />
                            </label>
                            <div className="w-full">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <a className="label-text link link-info" href={'/account/account-addresses'}>Изменить
                                            актуальный адрес</a>
                                    </div>
                                    <select className={classes.region}
                                            onChange={checkSelectedRegion}
                                            value={selectedRegion || VALUE_NOT_SELECTED.value}
                                            required={true}>
                                        <option value={VALUE_NOT_SELECTED.value}>Выберите регион</option>
                                        {regionsOptions}
                                    </select>
                                </label>
                            </div>

                            <div className="w-full">
                                <select className={classes.city}
                                        onChange={checkSelectedCity}
                                        value={selectedCity || VALUE_NOT_SELECTED.value}
                                        required={true}>
                                    <option value={VALUE_NOT_SELECTED.value}>Выберите город</option>
                                    {citiesOptions}
                                </select>
                            </div>

                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Адрес доставки</span>
                                    </div>
                                    <input type="text"
                                           className={classes.address}
                                           defaultValue={address}
                                           placeholder="Советская ул.,12 д.,156 кв."
                                           onChange={event => handleAddressChange(event)}
                                           required
                                    />
                                </label>
                            </div>

                            <div className="w-full">
                                <PatternFormat
                                    id={'phone'}
                                    name={'phone'}
                                    format={'+# (###) #### ###'}
                                    allowEmptyFormatting mask={'_'}
                                    type={'tel'}
                                    value={client.client_phone}
                                    className="input input-bordered input-sm mb-2"
                                    readOnly={true}
                                />
                            </div>
                            <button className="btn btn-primary text-white text-xl" onClick={async () => {
                                await createOrder();
                            }}>Заказать
                            </button>
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
