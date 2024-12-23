"use client";
import React, {useState} from 'react';


const CarouselComponent = ({paths, className, interval, width, height, index}) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    let baseUrl = 'http://localhost:3001/images';

    const handleNextClick = () => {
        if (currentIndex === paths.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevClick = () => {
        if (currentIndex === 0) {
            setCurrentIndex(paths.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <>
            <div className="relative w-full h-[400px] overflow-hidden">
                {/* Карусель */}
                <div className="flex items-center justify-center w-full h-full">
                    <div key={currentIndex}>
                        <img
                            className="w-full object-cover"
                            src={`${baseUrl}/${paths[currentIndex]}`}
                            alt=""
                        />
                    </div>
                </div>

                {/* Кнопки навигации */}
                <button
                    type="button"
                    className="absolute top-1/2 left-4 z-10 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 focus:outline-none"
                    onClick={(event) => {
                        handlePrevClick();
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                >
                    ❮
                </button>
                <button
                    type="button"
                    className="absolute top-1/2 right-4 z-10 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 focus:outline-none"
                    onClick={(event)=>{
                        handleNextClick();
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                >
                    ❯
                </button>
            </div>
        </>
    )
}
export default CarouselComponent;
