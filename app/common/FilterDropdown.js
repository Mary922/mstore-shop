import React from 'react';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {applyFilterParams} from "@/app/lib/api/filter";
import {getFilteredProducts} from "@/app/store/slices/appCommonSlice";

const FilterDropdown = ({name, options, category, minRangeValue, maxRangeValue}) => {
    const dispatch = useDispatch();

    const [checkedOptionsSizes, setCheckedOptionsSizes] = useState([]);
    const [checkedOptions, setCheckedOptions] = useState([]);

    const checkChangedFilter = () => {
        if (
            checkedOptionsSizes.length > 0) {
        }
    }

    const handleApplyFilter = async () => {
        await checkChangedFilter();
        const result = await applyFilterParams(
            category,
            minRangeValue,
            maxRangeValue,
            checkedOptionsSizes,
        )

        let searchParams = new URLSearchParams({
            category,
            sizes: JSON.stringify(checkedOptionsSizes),
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
        }
    }

    const handleChange = async (event) => {
        const newValue = event;

        let updatedOptions = [...checkedOptions];
        if (!updatedOptions.includes(newValue)) {
            updatedOptions.push(newValue);
        } else {
            updatedOptions = updatedOptions.filter(option => option !== newValue);
        }
        setCheckedOptions(updatedOptions);
    }

    return (
        <>
            <div className="w-full max-w-xs">
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
        </>
    )
}
export default FilterDropdown;