"use client"
import React, {useCallback, useEffect, useRef, useState} from "react";
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


const CanvasFilter = ({category,gender,drawerToggleRef}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filterItems, setFilterItems] = useState([]);
    const [names, setNames] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);

    // const [show, setShow] = useState(false);

    const [checkedOptionsSizes, setCheckedOptionsSizes] = useState([]);
    const [checkedOptionsColors, setCheckedOptionsColors] = useState([]);
    const [checkedOptionsSeasons, setCheckedOptionsSeasons] = useState([]);
    const [checkedOptionsBrands, setCheckedOptionsBrands] = useState([]);
    const [checkedOptionsCountries, setCheckedOptionsCountries] = useState([]);

    const [minRangeValue, setMinRangeValue] = useState(0);
    const [maxRangeValue, setMaxRangeValue] = useState(0);
    const [initialMaxRangeValue, setInitialMaxRangeValue] = useState(null);

    const handleRangeChange = useCallback((newMinRangeValue, newMaxRangeValue) => {
        setMinRangeValue(newMinRangeValue);
        setMaxRangeValue(newMaxRangeValue);
    }, []);


    // useEffect(()=>{
    //     const handleBeforeUnload = () => {
    //         if (drawerToggleRef.current) {
    //             drawerToggleRef.current.checked = false;
    //         }
    //     }
    //     window.addEventListener("popstate", handleBeforeUnload);
    //     return () => {
    //         window.removeEventListener("popstate", handleBeforeUnload);
    //     }
    //
    //
    // },[])


    useEffect(() => {
        (async () => {
            const filterRes = await getFilterParams();
            // console.log('filterRes',filterRes);

            if (filterRes?.data) {
                setFilterItems(filterRes.data);
            }
            const resultMax = await getMaxPrice();
            if (resultMax?.data) {
                setMaxRangeValue(resultMax.data.maxPrice);
                setInitialMaxRangeValue(resultMax.data.maxPrice);
            }
        })()
    }, [])

    const checkChangedFilter = () => {
        if (checkedOptionsBrands.length > 0 || checkedOptionsColors.length > 0 || checkedOptionsCountries.length > 0 || checkedOptionsSeasons.length > 0 || checkedOptionsSizes.length > 0) {
            console.log('changes smth');
        }
    }

    useEffect(() => {
        const hasChanges =
            checkedOptionsSizes.length ||
            checkedOptionsColors.length ||
            checkedOptionsSeasons.length ||
            checkedOptionsBrands.length ||
            checkedOptionsCountries.length ||
            minRangeValue !== 0 ||
            maxRangeValue !== initialMaxRangeValue;

        setFilterApplied(hasChanges);
    }, [
        checkedOptionsSizes,
        checkedOptionsColors,
        checkedOptionsSeasons,
        checkedOptionsBrands,
        checkedOptionsCountries,
        minRangeValue,
        maxRangeValue
    ])

    const handleApplyFilter = async () => {
         checkChangedFilter();
        const result = await applyFilterParams(
            category,
            gender,
            minRangeValue,
            maxRangeValue,
            checkedOptionsSizes,
            checkedOptionsColors,
            checkedOptionsSeasons,
            checkedOptionsBrands,
            checkedOptionsCountries,
        )

        const newSearchParams = new URLSearchParams();
        if (category) newSearchParams.set('category', category);
        if (gender) newSearchParams.set('gender', gender);
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
            console.log('result FILTER NEW', result);
            for (let i = 0; i < result?.data?.length; i++) {
                ids.push(result?.data[i].product_id);
            }
            await dispatch(getFilteredProducts(ids));

            if (drawerToggleRef.current) {
                drawerToggleRef.current.checked = false;
            }

            router.push(`/catalog?${newSearchParams.toString()}`);
        } else {
            router.push(`/catalog?${newSearchParams.toString()}`);
           console.log('no such products');
        }
        console.log('ids',ids)
    }

    return (
        <>

                {/*{*/}
                {/*    category ? null : <CollapseComponent name={'Категории'}/>*/}
                {/*}*/}

                <div className="flex flex-col p-1">

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
            {
                filterApplied && (
                    <button className="btn btn-primary text-white text-lg"
                            onClick={handleApplyFilter}>Применить</button>)
            }

        </>
    )
}
export default CanvasFilter;
