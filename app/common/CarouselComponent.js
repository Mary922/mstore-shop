"use client";
import React, {useState} from 'react';
import {BASE_URL} from "@/config";


const CarouselComponent = ({paths, staticPaths}) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    let baseUrl = '';
    if (paths) {
        baseUrl = `${BASE_URL}/images`;
    }
    if (staticPaths) {
        baseUrl = `${BASE_URL}/images/static`;
    }

    const handleNextClick = () => {
        if (paths) {
            if (currentIndex < paths.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setCurrentIndex(0);
            }
        }
        if (staticPaths) {
            if (currentIndex < staticPaths.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setCurrentIndex(0);
            }
        }
    };

    const handlePrevClick = () => {
        if (paths) {
            if (currentIndex === 0) {
                setCurrentIndex(paths.length - 1);
            } else {
                setCurrentIndex(currentIndex - 1);
            }
        }
        if (staticPaths) {
            if (currentIndex === 0) {
                setCurrentIndex(staticPaths.length - 1);
            } else {
                setCurrentIndex(currentIndex - 1);
            }
        }
    };

    return (
        <>
            <div className="flex bg-green-300 h-72" key={currentIndex}>
                {
                    paths ?
                        <img
                            className="w-full object-cover"
                            src={`${baseUrl}/${paths[currentIndex]}`}
                            alt=""
                        /> : <img
                            className="w-full object-cover"
                            src={`${baseUrl}/${staticPaths[currentIndex]}`}
                            alt=""
                        />
                }
                <button
                    type="button"
                    className="absolute top-1/2 left-4 z-1 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 focus:outline-none"
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
                    className="absolute top-1/2 right-4 z-1 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 focus:outline-none"
                    onClick={(event) => {
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
