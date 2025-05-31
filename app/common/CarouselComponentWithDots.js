"use client";
import React, {useRef, useState, useEffect} from 'react';


const CarouselComponentWithDots = ({paths, staticPaths, imageClassName, containerClassName, interval}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalId = useRef();

    let baseUrl = '';
    if (paths) {
        baseUrl = 'http://localhost:3001/images';
    }
    if (staticPaths) {
        baseUrl = 'http://localhost:3001/static';
    }
    const items = paths || staticPaths;

    useEffect(() => {
        if (interval) {
            intervalId.current = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === items.length - 1 ? 0 : prevIndex + 1
                );
            }, interval);

            return () => clearInterval(intervalId.current);
        }
    }, [items]);


    return (
        <>
            <div className={`relative w-full ${containerClassName || 'h-[400px]'}`}>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4/5 h-full" key={currentIndex}>
                    {paths ? (
                        <img
                            className={`w-full h-96 ${imageClassName || 'object-cover'}`}
                            src={`${baseUrl}/${paths[currentIndex]}`}
                            alt=""
                        />
                    ) : (
                        <img
                            className={`w-full h-full object-cover `}
                            src={`${baseUrl}/${staticPaths[currentIndex]}`}
                            alt=""
                        />
                    )}
                </div>

                <div className="absolute bottom-12 left-0 right-0 z-10">
                    <div className="flex justify-center gap-3">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={(event) => {
                                    setCurrentIndex(index);
                                    event.preventDefault();

                                }}
                                className={`
                                w-4 h-4 rounded-full transition-all duration-300
                                border-2 border-white shadow-lg
                                ${
                                    currentIndex === index
                                        ? 'bg-white scale-125 carousel-dot-active'
                                        : 'bg-transparent hover:bg-white/30 carousel-dot-not-active'
                                }
                            `}
                                aria-label={`Перейти к слайду ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default CarouselComponentWithDots;
