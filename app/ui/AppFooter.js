import {getImagesStatic} from "../api/images";
import React, {useEffect, useState} from 'react';

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
                list.push(<img src={`${baseUrl}/${imagesPathsList[i]}`} key={i} />)
            }
        }
        return list;
    }

    return (
        <>
            <footer>
            <div className={'bank-cards'}>{renderImages()}</div>
            </footer>
        </>
    )
}
export default AppFooter;