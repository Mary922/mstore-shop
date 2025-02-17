import React from 'react';
import {useState} from "react";
import {useDispatch} from "react-redux";



const AccordionComponent = ({name,options, checkedOptions, setCheckedOptions}) => {
    const dispatch = useDispatch();
    // const [isChecked, setIsChecked] = useState(false);

    console.log('collapse',checkedOptions);


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
            <details className="collapse collapse-arrow">
                <summary className="collapse-title text-base font-medium">{name}</summary>
                <div className="collapse-content">
                    {options ? options.map((option, index) => (
                        <div key={index} className="form-control">
                            <label className="label">{option.label}
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