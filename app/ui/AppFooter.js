'use client'
import React, {useEffect, useState} from 'react';
import {getImagesStatic} from "@/app/lib/api/images";

const AppFooter = () => {
    const [images, setImages] = useState([]);

    let baseUrl = 'http://localhost:3001/static';
    const type = 'web';
    const field = 'footer';

    useEffect(() => {
        (async () => {
            try {
                const imagesFooter = await getImagesStatic(type, field);
                if (imagesFooter?.data) {
                    setImages(imagesFooter.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    let imagesPathsList = [];
    let list = [];

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
            <footer>
            <div className='flex flex-row gap-4 items-center justify-center h-16 bg-neutral'>{renderImages()}</div>
            </footer>
        </>
    )
}
export default AppFooter;