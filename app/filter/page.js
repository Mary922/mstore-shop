"use client"
import React, {useEffect, useState} from "react";
import ProductCard from "@/app/ui/ProductCard";


export default function FilterPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // const searchParam = JSON.parse(localStorage.getItem('filterData'));
    // console.log('searchParam', searchParam);

    useEffect(()=>{
        const searchProductsList = JSON.parse(localStorage.getItem('filter-list'));
        if (searchProductsList && searchProductsList.length > 0) {
            setProducts(searchProductsList);
        }
        setIsLoading(false);
        // console.log("searchProductsList", searchProductsList);

    },[])

    if (isLoading) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }

    // console.log('productsproductsproducts',products);




    let filteredProducts = [];
    for (let i = 0; i < products.length; i++) {
        filteredProducts.push(<ProductCard key={products[i].product_id}
                                          images={products[i].Images}
                                          id={products[i].product_id}
                                          text={products[i].product_name}
                                          price={products[i].price}
                                          // path={imagePath}
        />);
    }
    console.log('listtt',filteredProducts);



    // let productsList = [];
    // if (products && products.length > 0) {
    //     for (let i = 0; i < products.length; i++) {
    //         productsList.push(<ProductCard
    //             key={products[i].product_id}
    //             id={products[i].product_id}
    //             images={products[i].Images}
    //             text={products[i].product_name} price={products[i].price}
    //         />)
    //     }
    // }
    // console.log('productsList', productsList);


    return (
        <>
            {filteredProducts && filteredProducts.length > 0
                ? filteredProducts : <div>По запросу ничего не найдено</div>
            }
        </>
    )
 }