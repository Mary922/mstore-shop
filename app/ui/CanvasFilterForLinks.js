"use client"
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {applyFilterParams, getFilterParams} from "@/app/lib/api/filter";
import {getMaxPrice} from "@/app/lib/api/prices";
import CollapseComponent from "@/app/common/CollapseComponent";
import RangeComponent from "@/app/common/RangeComponent";
// import {getFilteredProducts} from "@/app/store/slices/appCommonSlice";
import {useRouter} from "next/navigation";
import {useSearchParams} from "next/navigation";
import {getFilteredProducts} from "@/app/store/slices/appCommonSlice";
import {setSearchParams} from "@/app/store/slices/searchParamsSlice";


const CanvasFilterForLinks = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filterItems, setFilterItems] = useState([]);
    const [names, setNames] = useState([]);

    // const [show, setShow] = useState(false);
    const [checkedOptionsCategories, setCheckedOptionsCategories] = useState([]);

    const [checkedOptionsSizes, setCheckedOptionsSizes] = useState([]);
    const [checkedOptionsColors, setCheckedOptionsColors] = useState([]);
    const [checkedOptionsSeasons, setCheckedOptionsSeasons] = useState([]);
    const [checkedOptionsBrands, setCheckedOptionsBrands] = useState([]);
    const [checkedOptionsCountries, setCheckedOptionsCountries] = useState([]);

    const [minRangeValue, setMinRangeValue] = useState(0);
    const [maxRangeValue, setMaxRangeValue] = useState(0);

    const handleRangeChange = useCallback((newMinRangeValue, newMaxRangeValue) => {
        setMinRangeValue(newMinRangeValue);
        setMaxRangeValue(newMaxRangeValue);
    }, []);


    useEffect(() => {
        (async () => {
            const filterRes = await getFilterParams();
            console.log('filterRes',filterRes);

            if (filterRes?.data) {
                setFilterItems(filterRes.data);
            }
            const resultMax = await getMaxPrice();
            if (resultMax?.data) {
                setMaxRangeValue(resultMax.data.maxPrice);
            }
        })()
    }, [checkedOptionsSeasons])

    const checkChangedFilter = () => {
        if (checkedOptionsBrands.length > 0 || checkedOptionsColors.length > 0 || checkedOptionsCountries.length > 0 || checkedOptionsSeasons.length > 0 || checkedOptionsSizes.length > 0) {
            console.log('changes smth')
        }
    }

    const handleApplyFilter = async () => {
        checkChangedFilter();
        const result = await applyFilterParams(
            checkedOptionsCategories,
            minRangeValue,
            maxRangeValue,
            checkedOptionsSizes,
            checkedOptionsColors,
            checkedOptionsSeasons,
            checkedOptionsBrands,
            checkedOptionsCountries,
        )

        const newSearchParams = new URLSearchParams();
        // if (category) newSearchParams.set('category', category);
        if (checkedOptionsCategories.length > 0) newSearchParams.set('categories', JSON.stringify(checkedOptionsCategories));
        if (checkedOptionsSizes.length > 0) newSearchParams.set('sizes', JSON.stringify(checkedOptionsSizes));
        if (checkedOptionsColors.length > 0) newSearchParams.set('colors', JSON.stringify(checkedOptionsColors));
        if (checkedOptionsSeasons.length > 0) newSearchParams.set('seasons', JSON.stringify(checkedOptionsSeasons));
        if (checkedOptionsBrands.length > 0) newSearchParams.set('brands', JSON.stringify(checkedOptionsBrands));
        if (checkedOptionsCountries.length > 0) newSearchParams.set('countries', JSON.stringify(checkedOptionsCountries));
        if (minRangeValue) newSearchParams.set('minPrice', minRangeValue.toString());
        if (maxRangeValue) newSearchParams.set('maxPrice', maxRangeValue.toString());


        // let searchParams = new URLSearchParams({
        //     category,
        //     sizes: JSON.stringify(checkedOptionsSizes),
        //     colors: JSON.stringify(checkedOptionsColors),
        //     seasons: JSON.stringify(checkedOptionsSeasons),
        //     brands: JSON.stringify(checkedOptionsBrands),
        //     countries: JSON.stringify(checkedOptionsCountries),
        //     minPrice: minRangeValue,
        //     maxPrice: maxRangeValue
        // });


        let ids = [];
        if (result?.data?.length > 0) {
            console.log('result', result);
            for (let i = 0; i < result?.data?.length; i++) {
                ids.push(result?.data[i].product_id);
            }
            await dispatch(getFilteredProducts(ids));

            router.push(`/search?${newSearchParams.toString()}`);
        } else {
            console.log('no such products')
        }





        // let ids = [];
        // if (result?.data.length > 0) {
        //     console.log('result',result);
        //
        //     for (let i = 0; i < result?.data?.length; i++) {
        //         ids.push(result?.data[i].product_id);
        //     }
        //
        //     await dispatch(getFilteredProducts(ids));
        //
        //     // navigate(`/search?${searchParams.toString()}`);
        // }
        // console.log('ids',ids)
    }

    return (
        <>

            {/*{*/}
            {/*    category ? null : <CollapseComponent name={'Категории'}/>*/}
            {/*}*/}

            <div className="flex flex-col p-1">
                {
                    filterItems.categories && filterItems.categories.length > 0 ? <CollapseComponent name={'Категории'}
                                                                                           checkedOptions={checkedOptionsCategories}
                                                                                           setCheckedOptions={setCheckedOptionsCategories}
                                                                                           options={filterItems.categories.map(item => ({
                                                                                               value: item.category_id,
                                                                                               label: item.category_name
                                                                                           }))}
                    /> : null
                }

                {
                    filterItems.sizes && filterItems.sizes.length > 0 ? <CollapseComponent name={'Размер'}
                                                                                           checkedOptions={checkedOptionsSizes}
                                                                                           setCheckedOptions={setCheckedOptionsSizes}
                                                                                           options={filterItems.sizes.map(item => ({
                                                                                               value: item.size_id,
                                                                                               label: item.size_name
                                                                                           }))}
                    /> : null
                }

                {
                    filterItems.colors && filterItems.colors.length > 0 ? <CollapseComponent name={'Цвет'}
                                                                                             options={filterItems.colors.map(item => ({
                                                                                                 value: item.color_id,
                                                                                                 label: item.color_name
                                                                                             }))}
                                                                                             checkedOptions={checkedOptionsColors}
                                                                                             setCheckedOptions={setCheckedOptionsColors}
                    /> : null
                }

                {
                    filterItems.seasons && filterItems.seasons.length > 0 ? <CollapseComponent name={'Сезон'}
                                                                                               options={filterItems.seasons.map(item => ({
                                                                                                   value: item.season_id,
                                                                                                   label: item.season_name
                                                                                               }))}
                                                                                               checkedOptions={checkedOptionsSeasons}
                                                                                               setCheckedOptions={setCheckedOptionsSeasons}
                    /> : null
                }
                {
                    filterItems.brands && filterItems.brands.length ? <CollapseComponent name={'Бренд'}
                                                                                         options={filterItems.brands.map(item => ({
                                                                                             value: item.brand_id,
                                                                                             label: item.brand_name
                                                                                         }))}
                                                                                         checkedOptions={checkedOptionsBrands}
                                                                                         setCheckedOptions={setCheckedOptionsBrands}
                    /> : null
                }
                {
                    filterItems.countries && filterItems.countries.length ? <CollapseComponent name={'Страна'}
                                                                                               options={filterItems.countries.map(item => ({
                                                                                                   value: item.country_id,
                                                                                                   label: item.country_name
                                                                                               }))}
                                                                                               checkedOptions={checkedOptionsCountries}
                                                                                               setCheckedOptions={setCheckedOptionsCountries}
                    /> : null
                }

            </div>

            <RangeComponent label={'Цена'} minRangeValue={minRangeValue} maxRangeValue={maxRangeValue} onRangeChange={handleRangeChange} />
            <button className="btn btn-primary" onClick={handleApplyFilter}>Применить</button>

        </>
    )
}
export default CanvasFilterForLinks;
