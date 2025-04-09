"use client"
import Carousel from "react-bootstrap/Carousel";
import CarouselComponent from "@/app/common/CarouselComponent";
import React, {useEffect, useState} from "react";
import {getImagesStatic} from "@/app/lib/api/images";
import CarouselComponentWithDots from "@/app/common/CarouselComponentWithDots";
import {createNewSubscription} from "@/app/lib/api/subscriptions";


export default function Home() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    let baseUrl = 'http://localhost:3001/static';
    const [imagePaths, setImagePaths] = useState([]);
    const [girls, setGirls] = useState([]);
    const [boys, setBoys] = useState([]);
    const [baby, setBaby] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await getImagesStatic('web', 'home');
            // console.log('res',res);
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

        // Автоматически убираем ошибку при вводе правильного email
        if (error && validateEmail(value)) {
            setError('');
            setIsSuccess(true);
        }
    };

    const checkFilledInput = () => {
        if (!email) {
            setError('Заполните поле');
            setIsSuccess(false);
            return false;
        } else if (!validateEmail(email)) {
            setError('Введите корректный email');
            setIsSuccess(false);
            return false;
        } else {
            setError('');
            setIsSuccess(true);
            return true;
        }
    };

    // const checkFilledInput = () => {
    //     if (email === '' || email == null || email.length < 5) {
    //         setError('Заполните поле');
    //     }
    //     if (!/^\S+@\S+\.\S+$/.test(email)) {
    //         setError('Введите корректный email');
    //         return false;
    //     }
    //     setError('');
    //     return true;
    // }

    const createSubscription = async () => {
        const isValid = checkFilledInput();

        if (isValid) {
            const result = await createNewSubscription({
                email: email,
            });
        }
    }


    return (
        <>
            <div className='flex flex-col'>
                <div>
                    <div className="w-full">
                        <CarouselComponentWithDots
                            staticPaths={imagePaths}
                            imageClassName={'object-cover w-full h-full'}
                            containerClassName={'w-full h-[600px]'}
                        />
                    </div>
                </div>
                <div className="relative w-full flex flex-row items-center justify-center gap-8 p-3">
                    <div className="flex-1 max-w-[30%] relative group overflow-hidden rounded-lg">
                        <img
                            src={`${baseUrl}/${boys[0]}`}
                            alt="Boys"
                            className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                        <a
                            href="/boys"
                            className="no-underline absolute inset-0 flex items-center justify-center bg-black/30
                            transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                            <button
                                className="btn btn-ghost glass text-white font-bold text-lg px-6 py-3 shadow-lg hover:scale-105 transition-transform">
                                Boys Collection
                            </button>
                        </a>
                    </div>

                    <div className="flex-1 max-w-[30%] relative group overflow-hidden rounded-lg">
                        <img
                            src={`${baseUrl}/${baby[0]}`}
                            alt="Baby"
                            className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                        <a
                            href="/babies"
                            className="no-underline absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                            <button
                                className="btn btn-ghost glass text-white font-bold text-lg px-6 py-3 shadow-lg hover:scale-105 transition-transform">
                                Baby Collection
                            </button>
                        </a>
                    </div>


                    <div className="flex-1 max-w-[30%] relative group overflow-hidden rounded-lg">
                        <img
                            src={`${baseUrl}/${girls[0]}`}
                            alt="Girls"
                            className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                        <a
                            href="/girls"
                            className="no-underline absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                            <button
                                className="btn btn-ghost glass text-white font-bold text-lg px-6 py-3 shadow-lg hover:scale-105 transition-transform">
                                Girls Collection
                            </button>
                        </a>
                    </div>
                </div>
                <div className='grid grid-cols-[500px_1fr] bg-emerald-500 text-white p-2'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='mb-0 mt-1'>Скидки, акции и новинки</h1>
                        <p>Подписывайтесь на Email-рассылку</p>
                    </div>
                    <div className='flex flex-row items-center justify-center gap-2'>
                        <div className='flex flex-col'>
                            <div className='h-[calc(48px+24px)]'>
                                <input
                                    className={`input w-96 rounded-none border-none min-h-0 uniform-height ${error ? 'input-error' : ''}`}
                                    onChange={handleInputChange}
                                    onBlur={checkFilledInput}
                                    value={email}
                                    placeholder={'Email'}/>
                                <div className={`relative ${error ? 'h-6' : 'h-0'}`}>
                                    {error && (
                                        <div className="absolute top-0 left-0 label">
                                            <span className="label-text-alt text-error">{error}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='h-[calc(48px+24px)]'>
                            <button className='btn btn-neutral min-h-0 border-l-0 rounded-none uniform-height'
                                    onClick={createSubscription}
                            >Подписаться
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
