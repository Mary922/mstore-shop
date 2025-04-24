import React from 'react';
import {useState} from "react";
import {useDispatch} from "react-redux";



const AccordionComponent = ({name,options, checkedOptions, setCheckedOptions}) => {
    const dispatch = useDispatch();
    // const [isChecked, setIsChecked] = useState(false);

    // console.log('collapse',checkedOptions);


    const handleChange = async (event) => {
        const newValue = event.target.value;
        let updatedOptions = [...checkedOptions];
        if (!updatedOptions.includes(newValue)) {
            updatedOptions.push(newValue);
        } else {
            updatedOptions = updatedOptions.filter(option => option !== newValue);
        }
        setCheckedOptions(updatedOptions);
    }
    // console.log('checkedOptions',checkedOptions);

    return (
        <>
            <details className="collapse collapse-arrow py-3">
                <summary className="collapse-title !min-h-fit !flex !items-center font-medium text-xl">{name}</summary>
                <div className="collapse-content p-2">
                    {options ? options.map((option, index) => (
                        <div key={index} className="form-control py-1">
                            <label className="label py-1">{option.label}
                                <input className="custom-checkbox"
                                       type="checkbox"
                                       value={option.value}
                                       onChange={handleChange}
                                />
                            </label>
                        </div>
                    )) : null}
                </div>
            </details>
        </>
    )
}
export default AccordionComponent;