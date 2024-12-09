import React from 'react';
import {Row,Col} from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';

const ToastComponent = ({show,setShow,text,name}) => {

    return (
        <>
            <Row>
                <Col xs={6}>
                    <Toast onClose={()=>setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">{name}</strong>
                            <img onClose={()=>setShow(false)}
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            {/*<small>11 mins ago</small>*/}
                        </Toast.Header>
                        <Toast.Body>{text}</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </>
    )
}
export default ToastComponent;