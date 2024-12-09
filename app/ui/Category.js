import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductCategories} from "../api/productCategories";
import {CardGroup} from "react-bootstrap";
import ProductCard from "./ProductCard";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-icons/font/bootstrap-icons.css';
import CanvasFilter from "./CanvasFilter";
import {changeCanvas, changeFilterCanvas} from "../slices/appCommonSlice";

const Category = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const currentCategoryId = params.categoryId;
    const [products, setProducts] = useState([]);
    const [imagePath, setImagePath] = useState('');
    const [sizes,setSizes] = useState([]);

    const cartList = useSelector((state) => state.cart.cart);

    const show = useSelector((state) => state.common.canvasLeftOnShow);

    useEffect(()=>{
        (async () => {
            if (currentCategoryId) {
                try {
                    const result = await getProductCategories(currentCategoryId);
                    // console.log('responseRes',result);
                    const products = result.data;
                    setProducts(products);


                } catch (error) {
                    console.log(error);
                }
            }

        })();
    },[currentCategoryId])


    let productName = '';
    let path = '';
    let arrayOfProducts = [];

    for (let i=0; i < products.length; i++) {
        arrayOfProducts.push(<ProductCard key={products[i].product_id}
                                          images={products[i].Images}
                                          id={products[i].product_id}
                                          text={products[i].product_name}
                                          price={products[i].price}
                                          path={imagePath}
        />);
    }
    // const handleFilterShow = () => {
    //     console.log('handleFilterShow',filterIsShow);
    //     setFilterIsShow(!filterIsShow);
    // }

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'row',alignItems: 'center',gap: '10px'}}>
                <i onClick={()=>dispatch(changeFilterCanvas(true))} style={{fontSize: '35px',marginLeft: '30px',cursor:'pointer'}} className="bi bi-filter"></i>
                {
                    show ? <><CanvasFilter category={currentCategoryId} show={show} placement={'start'}/></> : null
                }
                <div>Фильтр</div>
            </div>
            <CardGroup className={'productcard-group'}>{arrayOfProducts}</CardGroup>
        </>
    )
}
export default Category;