import React from 'react';
import {Row, Col} from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';

const ToastComponent = ({show, setShow, text, name}) => {

    return (
        <>
            <div className="toast toast-start">
                <div className="alert alert-info">
                    <span>New mail arrived.</span>
                    {/*<img onClose={() => setShow(false)}*/}
                    {/*     src="holder.js/20x20?text=%20"*/}
                    {/*     className="rounded me-2"*/}
                    {/*     alt=""*/}
                    {/*/>*/}
                </div>
            </div>

            {/*<div className="toast toast-top toast-end" onClose={() => setShow(false)} show={show} delay={3000} autohide>*/}
            {/*    <div>*/}
            {/*        <strong className="me-auto">{name}</strong>*/}
            {/*        <img onClose={() => setShow(false)}*/}
            {/*             src="holder.js/20x20?text=%20"*/}
            {/*             className="rounded me-2"*/}
            {/*             alt=""*/}
            {/*        />*/}
            {/*        /!*<small>11 mins ago</small>*!/*/}
            {/*    </div>*/}
            {/*    <div>{text}</div>*/}
            {/*</div>*/}
        </>
    )
}
export default ToastComponent;