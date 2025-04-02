'use client'
import React, {useEffect, useState} from 'react';
import {getImagesStatic} from "@/app/lib/api/images";
import AccountForm from "@/app/ui/AccountForm";
import AuthorizationForm from "@/app/ui/AuthorizationForm";

const AppFooter = () => {
    const [images, setImages] = useState([]);
    const [favicon, setFavicon] = useState([]);

    let baseUrl = 'http://localhost:3001/static';
    const type = 'web';
    const field = 'footer';
    const faviconLogo = 'favicon';

    useEffect(() => {
        (async () => {
            try {
                const imagesFooter = await getImagesStatic(type, field);
                const imageFavicon = await getImagesStatic(type, faviconLogo);

                if (imagesFooter?.data) {
                    setImages(imagesFooter.data);
                }
                if (imageFavicon?.data) {
                    setFavicon(imageFavicon.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    let imagesPathsList = [];
    let list = [];
    let favi = [];

    favicon.forEach(item => {
        favi.push(item.image_path);
    })

    const renderImages = () => {
        for (let i = 0; i < images.length; i++) {
            imagesPathsList.push(images[i].image_path)
        }

        if (imagesPathsList && imagesPathsList.length > 0) {
            for (let i = 0; i < imagesPathsList.length; i++) {
                list.push(<img className="w-12 h-auto flex items-center" src={`${baseUrl}/${imagesPathsList[i]}`} key={i} />)
            }
        }
        return list;
    }



    return (
        <>
            <footer className="footer bg-neutral w-full px-5 py-4 text-neutral-content grid grid-cols-3">
                <nav className='text-neutral-content'>
                    <h6 className="footer-title">Компания</h6>
                    <a href={'/footer/about-us'} className="link link-hover text-neutral-content">О нас</a>
                    <a href={'/footer/contacts'} className="link link-hover text-neutral-content">Контакты</a>
                    <a href={'/footer/offer'} className="link link-hover text-neutral-content">Публичная оферта</a>
                    <a href={'/footer/help'} className="link link-hover text-neutral-content">Помощь</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Покупателям</h6>
                    <a href={'/footer/delivery'} className="link link-hover text-neutral-content">Доставка</a>
                    <a href={'/footer/payment'} className="link link-hover text-neutral-content">Оплата</a>
                    <a href={'/footer/exchange-return'} className="link link-hover text-neutral-content">Обмен и возврат</a>
                    <a href={'/account/my-account'} className="link link-hover text-neutral-content">Мой кабинет</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Контакты</h6>
                    <div className='text-neutral-content'>телефон: </div>
                    <div className='text-neutral-content flex flex-row items-center gap-2'><span>Оплата картами:</span> {renderImages()} </div>
                </nav>
            </footer>

            <footer className="navbar bg-neutral text-neutral-content border-base-300 border-t w-full">
                <div className="navbar-start grid-flow-col items-center">
                    <img src={`${baseUrl}/${favi}`} className='w-10'/>
                    <p>
                        Manyasha-Store
                        <br/>
                        since 2025
                    </p>
                </div>
                {/*<div className='navbar-center bg-emerald-900 gap-4 items-center justify-center'>{renderImages()}</div>*/}
                {/*<nav className="md:place-self-center md:justify-self-end">*/}

                {/*</nav>*/}
            </footer>

            {/*<footer>*/}
            {/*<div className='flex flex-row gap-4 items-center justify-center h-16 bg-neutral'>{renderImages()}</div>*/}
            {/*</footer>*/}
        </>
    )
}
export default AppFooter;