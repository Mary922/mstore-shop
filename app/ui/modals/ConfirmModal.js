import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmModal = ({show,close,text,func}) => {

    return (
        <>
            <dialog className="modal modal-bottom sm:modal-middle" open={show}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">{text}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={func}>Да</button>
                            <button className="btn" onClick={()=>close(false)}>Нет</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </>
    )
}
export default ConfirmModal;