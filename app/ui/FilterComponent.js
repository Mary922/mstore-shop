"use client"


import React, {useCallback, useEffect, useState} from "react";
import FilterDropdown from "@/app/common/FilterDropdown";
import {useDispatch} from "react-redux";
import {applyFilterParams, getFilterParams} from "@/app/lib/api/filter";
import {getMaxPrice} from "@/app/lib/api/prices";
import {getFilteredProducts} from "@/app/store/slices/appCommonSlice";

export default function FilterComponent({category}) {
    const dispatch = useDispatch();
    const [filtersIsShow, setFiltersIsShow] = useState(false);

    const [filterItems, setFilterItems] = useState([]);
    const [minRangeValue, setMinRangeValue] = useState(0);
    const [maxRangeValue, setMaxRangeValue] = useState(0);

    const [names, setNames] = useState([]);

    // const [checkedOptionsSizes, setCheckedOptionsSizes] = useState([]);


    // const [checkedOptionsColors, setCheckedOptionsColors] = useState([]);
    // const [checkedOptionsSeasons, setCheckedOptionsSeasons] = useState([]);
    // const [checkedOptionsBrands, setCheckedOptionsBrands] = useState([]);
    // const [checkedOptionsCountries, setCheckedOptionsCountries] = useState([]);
    //

    const handleRangeChange = useCallback((newMinRangeValue, newMaxRangeValue) => {
        setMinRangeValue(newMinRangeValue);
        setMaxRangeValue(newMaxRangeValue);
    }, []);

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
            }
        })()
    }, [])


    return (
        <>
            <div className="flex flex-row gap-5 mb-5 p-5">

                {/*<input type="range" min={0} max="100" value="40" className="range" readOnly />*/}


                {
                    filterItems.sizes && filterItems.sizes.length > 0 ?
                        <FilterDropdown name={'Размер'}
                                        // checkedOptions={checkedOptionsSizes}
                                        // setCheckedOptions={setCheckedOptionsSizes}
                                        options={filterItems.sizes.map(item => ({
                                                value: item.size_id,
                                                label: item.size_name
                                            }))}
                                        minRangeValue={minRangeValue}
                                        maxRangeValue={maxRangeValue}
                                        category={category}
                                        // applyFilter={handleApplyFilter}
                        />
                    : null
                }


                {/*<select className="select select-bordered w-full max-w-xs">*/}
                {/*    <option disabled selected>Цвет</option>*/}
                {/*    <option>Han Solo</option>*/}
                {/*    <option>Greedo</option>*/}
                {/*</select>*/}
                {/*{*/}
                {/*    !filtersIsShow ?*/}
                {/*        <div className="btn" onClick={() => setFiltersIsShow(true)}>Показать другие фильтры</div>*/}
                {/*        : null*/}

                {/*}*/}

                {/*{*/}
                {/*    filtersIsShow*/}
                {/*        ?*/}
                {/*        <>*/}
                {/*            <select className="select select-bordered w-full max-w-xs">*/}
                {/*                <option disabled selected>Сезон</option>*/}
                {/*                <option>Han Solo</option>*/}
                {/*                <option>Greedo</option>*/}
                {/*            </select>*/}

                {/*            <select className="select select-bordered w-full max-w-xs">*/}
                {/*                <option disabled selected>Страна</option>*/}
                {/*                <option>Han Solo</option>*/}
                {/*                <option>Greedo</option>*/}
                {/*            </select>*/}

                {/*            <select className="select select-bordered w-full max-w-xs">*/}
                {/*                <option disabled selected>Бренд</option>*/}
                {/*                <option>Han Solo</option>*/}
                {/*                <option>Greedo</option>*/}
                {/*            </select>*/}
                {/*            <button className="btn btn-square" onClick={()=> setFiltersIsShow(false)}>*/}
                {/*                <svg*/}
                {/*                    xmlns="http://www.w3.org/2000/svg"*/}
                {/*                    className="h-6 w-6"*/}
                {/*                    fill="none"*/}
                {/*                    viewBox="0 0 24 24"*/}
                {/*                    stroke="currentColor">*/}
                {/*                    <path*/}
                {/*                        strokeLinecap="round"*/}
                {/*                        strokeLinejoin="round"*/}
                {/*                        strokeWidth="2"*/}
                {/*                        d="M6 18L18 6M6 6l12 12"/>*/}
                {/*                </svg>*/}
                {/*            </button>*/}
                {/*        </> : null*/}
                {/*}*/}

            </div>
        </>
    )
}