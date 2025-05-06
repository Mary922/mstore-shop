'use client'

import { useState, useEffect } from 'react';

const ScrollToTopComponent = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when scrolled past half the viewport height
    const toggleVisibility = () => {
        const halfViewport = window.innerHeight / 2;
        if (window.pageYOffset > halfViewport) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-200
                    dark:hover:bg-gray-700 transition-colors duration-300
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 btn-scroll"
                >
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m5 15 7-7 7 7"
                            className="text-gray-800 dark:text-white"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ScrollToTopComponent;