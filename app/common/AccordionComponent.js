import React from 'react';
import {useState} from "react";
import Accordion from 'react-bootstrap/Accordion';
import {Form} from 'react-bootstrap';
import {useDispatch} from "react-redux";



const AccordionComponent = ({name,options, checkedOptions, setCheckedOptions}) => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);

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
            <Accordion flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{name}</Accordion.Header>
                    <Accordion.Body>
                        {options ? options.map((option, index) => (
                            <Form.Check key={index}>
                                <Form.Check.Input
                                    type="checkbox"
                                    // id={`check-${index}`}
                                    value={option.value}
                                    // checked={checkedOptions.includes(option.label)}
                                    onChange={handleChange}
                                />
                                <Form.Check.Label>{option.label}</Form.Check.Label>
                            </Form.Check>
                        )) : null}

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}
export default AccordionComponent;