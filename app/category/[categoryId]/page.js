"use client"
import {useEffect, useState} from "react";
import React from 'react';
import {useRouter} from "next/router";

import { useParams } from 'next/navigation';

export default function CategoryPage() {
    const params = useParams();
    const categoryId = params.categoryId;
    console.log('categoryId', categoryId);

    return <div>My Post: {categoryId}</div>;
}

//
// export default function Page() {
//     const params = React.use({params: true});
//     const slug = params.categoryId;
//     return <div>My Post: {slug}</div>
// }

// export default async function Page({ params }) {
//     // const router = useRouter();
//     // const { slug } = router.query;
//     // const slug = (await params).categoryId
//     return <div>My Post: {slug}</div>
// }

//
// const Page = () => {
//     const router = useRouter();
//     const {slug} = router.query;
//
//     console.log('CATEGORY ID SLUG', slug);
//
//
//
//     // const params = useParams();
//     // const dispatch = useAppDispatch();
//     // // const currentCategoryId = params.categoryId;
//     // const [products, setProducts] = useState([]);
//     // const [imagePath, setImagePath] = useState('');
//     // const [sizes,setSizes] = useState([]);
//     //
//     // const cartList = useSelector((state) => state.cart.cart);
//     //
//     // const show = useSelector((state) => state.common.canvasLeftOnShow);
//     //
//     // useEffect(()=>{
//     //     (async () => {
//     //         if (currentCategoryId) {
//     //             try {
//     //                 const result = await getProductCategories(currentCategoryId);
//     //                 // console.log('responseRes',result);
//     //                 const products = result.data;
//     //                 setProducts(products);
//     //
//     //
//     //             } catch (error) {
//     //                 console.log(error);
//     //             }
//     //         }
//     //
//     //     })();
//     // },[currentCategoryId])
//     //
//     //
//     // let productName = '';
//     // let path = '';
//     // let arrayOfProducts = [];
//     //
//     // for (let i=0; i < products.length; i++) {
//     //     arrayOfProducts.push(<ProductCard key={products[i].product_id}
//     //                                       images={products[i].Images}
//     //                                       id={products[i].product_id}
//     //                                       text={products[i].product_name}
//     //                                       price={products[i].price}
//     //                                       path={imagePath}
//     //     />);
//     // }
//     //
//     // const handleFilterShow = () => {
//     //     console.log('handleFilterShow',filterIsShow);
//     //     setFilterIsShow(!filterIsShow);
//     // }
//
//     return (
//         <>
//             {/*<div style={{display: 'flex', flexDirection: 'row',alignItems: 'center',gap: '10px'}}>*/}
//             {/*    <i onClick={()=>dispatch(changeFilterCanvas(true))} style={{fontSize: '35px',marginLeft: '30px',cursor:'pointer'}} className="bi bi-filter"></i>*/}
//             {/*    {*/}
//             {/*        show ? <><CanvasFilter category={currentCategoryId} show={show} placement={'start'}/></> : null*/}
//             {/*    }*/}
//             {/*    <div>Фильтр</div>*/}
//             {/*</div>*/}
//             {/*<CardGroup className={'productcard-group'}>{arrayOfProducts}</CardGroup>*/}
//             <div>lala category</div>
//         </>
//     )
// }
// export default Page;