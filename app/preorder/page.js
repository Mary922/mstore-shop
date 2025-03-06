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

export default function PreorderPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const sumUrlParam = useSearchParams();
    const sum = sumUrlParam.get('sum');
    console.log('sum',sum);

    const [client, setClient] = useState([]);
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cities, setCities] = useState([]);
    const [address, setAddress] = useState(null);
    const [phone, setPhone] = useState(null);
    const [orderSum, setOrderSum] = useState(0);

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);


    const [products, setProducts] = useState([]);

    const [errorForm, setErrorForm] = useState({
        region: false,
        city: false,
        address: false,
        phone: false,
    });


    const cart = useAppSelector((state) => state.cart.cart);

    let tempClient;
    let clientConstant;
    let clientId;

    if (typeof window !== "undefined") {
        tempClient = localStorage.getItem("temp-client");
        clientConstant = localStorage.getItem("client");
    }

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
    // console.log('classes', classes)


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

    const openToast = () => {
        setShow(true);
    }
    const closeToast = () => {
        setShow(false);
    }

    const createOrder = async () => {

        const errorsInInputs = checkFilledInputs();

        if (Object.keys(errorsInInputs).length > 0) {
            setErrorForm(errorsInInputs);
            return false;
        }

        console.log('all is filled');

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
        console.log('result order', result)

        if (result.success) {
            setShow(true);

            // if (tempClient) {
            //     await dispatch(clearCartThunk(tempClient));
            // }
            await dispatch(clearCartThunk(clientId));

            setTimeout(() => {
                toast.success('Спасибо за заказ!');
                router.push('account/orders');
            }, 1000);
        } else {
            toast.error('error here')
            console.log('error in creating order');
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
        // if (phone.length < 11) {
        //     console.log('fill phone');
        //     console.log('len', phone.length)
        //     // newErrorForm.phone = true
        // }
        return newErrorForm;
    }


    // const handleAsyncOperation = async () => {
    //     try {
    //         setLoading(true);
    //
    //         const promise = new Promise((resolve) =>
    //             setTimeout(resolve, 3000)
    //         );
    //
    //         const toastId = toast.promise(promise, {
    //             loading: 'Выполняется оформление заказа',
    //             success: 'Заказ оформлен. Спасибо за заказ!',
    //             error: 'Произошла ошибка.Попробуйте еще раз',
    //         });
    //
    //         await promise;
    //
    //         toast.success( {
    //             id: toastId,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         toast.error('Ошибка при выполнении операции.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    return (
        <>
            <div className="card bg-violet-400 w-96 items-center p-5 gap-3">
                <div className="card-body w-full">
                    <div className="w-full">
                        <label className="form-control w-full max-w-xs">
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


                    <label className="form-control w-full max-w-xs">
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
                            <select className={classes.region}
                                    onChange={checkSelectedRegion} required={true}>
                                <option value={VALUE_NOT_SELECTED.value}>Выберите регион</option>
                                {regionsOptions}
                            </select>
                    </div>

                    <div className="w-full">
                            <select className={classes.city}
                                    onChange={checkSelectedCity} required={true}>
                                <option value={VALUE_NOT_SELECTED.value}>Выберите город</option>
                                {citiesOptions}
                            </select>
                    </div>

                    <div className="w-full">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Адрес доставки</span>
                            </div>
                            <input type="text"
                                   className={classes.address}
                                   // className="input-sm input-bordered grow"
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
                            // className={classes.phone}
                            format={'+# (###) #### ###'}
                            allowEmptyFormatting mask={'_'}
                            type={'tel'}
                            value={client.client_phone}
                            className="input input-bordered input-sm mb-2"
                            readOnly={true}
                            // onValueChange={(values) => handlePhoneChange(values)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={async ()=>{
                        await createOrder();
                        // await handleAsyncOperation();
                    }}>Заказать</button>
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />


            {/*{*/}
            {/*    show && <ToastComponent show={show} setShow={setShow} name={'Alert'} text={'Спасибо за заказ'}/>*/}
            {/*}*/}
        </>
    )
}
