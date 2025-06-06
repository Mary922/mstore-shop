"use client"
import React, {useEffect, useState} from "react";
import ProductCard from "@/app/ui/ProductCard";
import MainLayout from "@/app/ui/MainLayout";

export default function FilterPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const searchProductsList = JSON.parse(localStorage.getItem('filter-list'));
        if (searchProductsList && searchProductsList.length > 0) {
            setProducts(searchProductsList);
        }
        setIsLoading(false);
    }, [])

    if (isLoading) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }

    let filteredProducts = [];
    for (let i = 0; i < products.length; i++) {
        filteredProducts.push(<ProductCard key={products[i].product_id}
                                           images={products[i].Images}
                                           id={products[i].product_id}
                                           text={products[i].product_name}
                                           price={products[i].price}
        />);
    }

    return (
        <>
            <MainLayout>
                {filteredProducts && filteredProducts.length > 0
                    ?
                    <>
                        <div className="flex flex-col w-full bg-gray-100">
                            <div className="mx-5 mt-2">
                                <div className="drawer z-10 flex">
                                    <label htmlFor="my-drawer">
                                        <svg className="w-full h-10 text-gray-800 dark:text-white cursor-pointer"
                                             aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="40" height="24" fill="none"
                                             viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="1"
                                                  d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
                                        </svg>
                                    </label>

                                    <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
                                    <div className="drawer-side">
                                        <label htmlFor="my-drawer" aria-label="close sidebar"
                                               className="drawer-overlay"></label>
                                        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="grid grid-cols-4 mb-10 gap-5 p-10 search-block">{filteredProducts}</div>
                        </div>
                        <div>
                        </div>
                    </>
                    :
                    <div className='flex flex-col w-full bg-gray-100 items-center my-10 search-not-found'>
                        <div className="mx-5 mt-2 text-lg p-5 flex flex-col items-center">
                            <div>По запросу ничего не найдено</div>
                            <div>Попробуйте задать другие условия поиска</div>
                        </div>
                    </div>
                }
            </MainLayout>
        </>
    )
}