"use client"
import React, {useEffect, useState} from "react";
import {getImagesStatic} from "@/app/lib/api/images";
import CarouselComponentWithDots from "@/app/common/CarouselComponentWithDots";
import {createNewSubscription} from "@/app/lib/api/subscriptions";
import MainLayout from "@/app/ui/MainLayout";
import Link from "next/link";
import {GENDER} from "@/constants";
import {BASE_URL} from "@/config";


export default function Home() {
    const baseUrl = `${BASE_URL}/images/static`;
    const [email, setEmail] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [error, setError] = useState('');
    const [imagePaths, setImagePaths] = useState([]);
    const [girls, setGirls] = useState([]);
    const [boys, setBoys] = useState([]);
    const [baby, setBaby] = useState([]);


    useEffect(() => {
        (async () => {
            const res = await getImagesStatic('web', 'home');
            let paths = [];
            let boysPaths = [];
            let girlPaths = [];
            let babiesPaths = [];
            if (res?.data) {
                res.data.forEach(image => {
                    paths.push(image.image_path);
                });
                setImagePaths(paths);
            }

            const boys = await getImagesStatic('web', 'boys');
            if (boys?.data) {
                boys.data.forEach(image => {
                    boysPaths.push(image.image_path);
                });
                setBoys(boysPaths);
            }
            const girls = await getImagesStatic('web', 'girls');
            if (girls?.data) {
                girls.data.forEach(image => {
                    girlPaths.push(image.image_path);
                });
                setGirls(girlPaths);
            }
            const babies = await getImagesStatic('web', 'baby');
            if (babies?.data) {
                babies.data.forEach(image => {
                    babiesPaths.push(image.image_path);
                });
                setBaby(babiesPaths);
            }

        })();
    }, []);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (error && validateEmail(value)) {
            setError('');
        }
    };

    const checkFilledInput = () => {
        if (!email || email.trim() === '') {
            setError('Заполните поле');
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setError('Введите корректный email');
            return false;
        }
        setError('');
        return true;
    }

    const createSubscription = async () => {
        const isValid = checkFilledInput();

        if (isValid) {
            const result = await createNewSubscription({
                email: email,
            });
            if (result?.success) {
                setFeedbackMessage(result?.message);
                setTimeout(() => {
                }, 3000)
                setEmail('');
            } else {
                setFeedbackMessage("Пожалуйста, укажите корректный email");
                setTimeout(() => {
                    setFeedbackMessage('')
                }, 2000)
                setEmail('');
            }
        }
    }

    return (
        <>
            <MainLayout>
                <div className='flex flex-col w-full main-container'>
                    <div>
                        <div className="w-full container-carousel">
                            {
                                imagePaths.length ?
                                    <CarouselComponentWithDots
                                        staticPaths={imagePaths}
                                        imageClassName={'object-cover w-full h-full'}
                                        containerClassName={'w-full h-[80vh] mx-auto'}
                                        interval={5000}
                                    /> : null

                            }
                        </div>
                    </div>
                    <div className="relative w-full flex flex-row items-center justify-center gap-8 p-3 main-links">
                        <div className="flex-1 max-w-[30%] relative group overflow-hidden rounded-lg">
                            {boys.length ?
                                <img
                                    src={`${baseUrl}/${boys[0]}`}
                                    alt="Boys"
                                    className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105'
                                />
                                : null}
                            <Link
                                href={`/catalog?gender=${GENDER.MALE}`}
                                className="no-underline absolute inset-0 flex items-center justify-center bg-black/30
                            transition-all duration-300 opacity-0 hover:opacity-100
                            "
                            >
                                <button
                                    className="btn btn-ghost glass text-white font-bold text-lg px-6 py-3 shadow-lg hover:scale-105 transition-transform
                                    ">
                                    Мальчики
                                </button>
                            </Link>
                        </div>

                        <div className="flex-1 max-w-[30%] relative group overflow-hidden rounded-lg">
                            {baby.length ?
                                <img
                                    src={`${baseUrl}/${baby[0]}`}
                                    alt="Baby"
                                    className='w-full h-auto object-cover'
                                />
                                : null}
                        </div>


                        <div className="flex-1 max-w-[30%] relative group overflow-hidden rounded-lg">
                            {girls.length > 0 ?
                                <img
                                    src={`${baseUrl}/${girls[0]}`}
                                    alt="Girls"
                                    className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105'
                                />
                                : null}
                            <a
                                href={`/catalog?gender=${GENDER.FEMALE}`}
                                className="no-underline absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                            >
                                <button
                                    className="btn btn-ghost glass text-white font-bold text-lg px-6 py-3 shadow-lg hover:scale-105 transition-transform">
                                    Девочки
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className='grid grid-cols-[500px_1fr] bg-emerald-500 text-white p-3 main-subscribe '>
                        <div className='flex flex-col items-center justify-center'>
                            <h1 className='mb-0 mt-1 sm:text-lg sm:pt-0'>Скидки, акции и новинки</h1>
                            <p className='mt-1'>Подписывайтесь на Email-рассылку</p>
                        </div>
                        <div className='flex flex-row items-center justify-center gap-2 main-sub-block'>
                            <div className='flex flex-col'>
                                <div className={'input-and-button'}>
                                    <div className={'flex flex-row items-center justify-center'}>
                                        <input
                                            className={`input w-96 rounded-none border-none min-h-0 uniform-height ${error ? 'input-error' : ''}`}
                                            onChange={handleInputChange}
                                            onBlur={checkFilledInput}
                                            value={email}
                                            placeholder={'Email'}/>
                                        <div className=' my-0 sm:py-0 sm:h-auto'>
                                            <button
                                                className='btn btn-neutral min-h-0 border-l-0 rounded-none uniform-height ml-2'
                                                onClick={createSubscription}
                                            >Подписаться
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`relative h-0`}>
                                        {error && (
                                            <div className="absolute top-0 left-0 label">
                                                <span className="label-text-alt text-error">{error}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`relative h-0}`}>
                                        {feedbackMessage && (
                                            <div
                                                className="absolute top-0 left-0 label">
                                                <span className="label-text-alt text-neutral">{feedbackMessage}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
