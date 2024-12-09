import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import {v4 as uuid} from 'uuid';

const DropdownComponent = ({links, title,id}) => {



    return (
        <>
            <Dropdown className="d-inline mx-2" key={id}>
                <Dropdown.Toggle id={id}>
                    {title}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {links}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
export default DropdownComponent;