import React, {useCallback} from 'react';
import {useState} from "react";
import Accordion from 'react-bootstrap/Accordion';
import {Form} from 'react-bootstrap';
import {useDispatch} from "react-redux";
import {applyFilterParams} from "@/app/lib/api/filter";
import {getFilteredProducts} from "@/app/store/slices/appCommonSlice";

const FilterDropdown = ({name,options,category,minRangeValue,maxRangeValue}) => {


    const dispatch = useDispatch();
    // const [isChecked, setIsChecked] = useState(false);

    const [checkedOptionsSizes, setCheckedOptionsSizes] = useState([]);

    const [checkedOptions, setCheckedOptions] = useState([]);



    const checkChangedFilter = () => {
        if (
            // checkedOptionsBrands.length > 0 ||
            // checkedOptionsColors.length > 0 ||
            // checkedOptionsCountries.length > 0 ||
            // checkedOptionsSeasons.length > 0 ||
            checkedOptionsSizes.length > 0) {
            console.log('changes smth')
        }
    }

    const handleApplyFilter = async () => {
        await checkChangedFilter();
        const result = await applyFilterParams(
            category,
            minRangeValue,
            maxRangeValue,
            checkedOptionsSizes,
            // checkedOptionsColors,
            // checkedOptionsSeasons,
            // checkedOptionsBrands,
            // checkedOptionsCountries,
        )

        console.log('result', result);
        console.log('category', category);


        let searchParams = new URLSearchParams({
            category,
            sizes: JSON.stringify(checkedOptionsSizes),
            // colors: JSON.stringify(checkedOptionsColors),
            // seasons: JSON.stringify(checkedOptionsSeasons),
            // brands: JSON.stringify(checkedOptionsBrands),
            // countries: JSON.stringify(checkedOptionsCountries),
            minPrice: minRangeValue,
            maxPrice: maxRangeValue
        });

        let ids = [];
        if (result?.data?.length > 0) {
            console.log('result ids', result.data);

            for (let i = 0; i < result?.data?.length; i++) {
                ids.push(result?.data[i].product_id);
            }
            await dispatch(getFilteredProducts(ids));
            // window.location.reload();
        }
    }


    const handleChange = async (event) => {
        const newValue = event;
        console.log('newValue',newValue);

        let updatedOptions = [...checkedOptions];
        if (!updatedOptions.includes(newValue)) {
            updatedOptions.push(newValue);
        } else {
            updatedOptions = updatedOptions.filter(option => option !== newValue);
        }
        setCheckedOptions(updatedOptions);
    }
    console.log('checkedOptions',checkedOptions);



    return (
        <>
            <div className="w-full max-w-xs">
                {/*<label htmlFor="size-select">Размер:</label>*/}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">{name}</div>
                    <div tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow flex flex-row">
                        {options && options.map((option, index) => (
                            <li key={index}>
                                <button
                                    className={`btn btn-square btn-sm mr-2 ${checkedOptions.includes(option.label) ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => handleChange(option.label)}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                        <button className="btn btn-primary" onClick={handleApplyFilter}>применить</button>
                    </div>
                </div>
            </div>

            {/*<select className="select select-bordered w-full max-w-xs">*/}
            {/*    <option disabled selected>Размер</option>*/}
            {/*    {options ? options.map((option, index) => (*/}
            {/*            <div key={index}>*/}
            {/*                <input className="checkbox"*/}
            {/*                       type="checkbox"*/}
            {/*                    // id={`check-${index}`}*/}
            {/*                       value={option.value}*/}
            {/*                    // checked={checkedOptions.includes(option.label)}*/}
            {/*                       onChange={handleChange}*/}
            {/*                />*/}
            {/*                <div>{option.label}</div>*/}
            {/*            </div>*/}
            {/*        ))*/}
            {/*        : null}*/}

            {/*</select>*/}


        </>
    )
}
export default FilterDropdown;