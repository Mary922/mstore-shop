import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {addressesGetThunk} from "@/app/store/slices/addressesSlice";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "@/app/lib/hooks";

const ConfirmModal = ({show,close,text,func,title,clientId}) => {
    const dispatch = useAppDispatch();

    return (
        <>
            <dialog className="modal modal-bottom sm:modal-middle shadow-lg" open={show}>
                <div className="modal-box bg-neutral-content">
                    <h3 className="font-bold text-lg flex items-center justify-center">{title}</h3>
                    <p className="py-4 flex items-center justify-center text-lg">{text}</p>
                    <div className="modal-action">
                        {/*<form method="dialog-2">*/}
                            <div className='flex gap-3'>
                            <button className="btn btn-neutral btn-md text-white hover:text-white hover:bg-gray-600" onClick={async ()=>{
                                func();
                                close(false);
                                // await dispatch(addressesGetThunk(clientId));
                            }}>Да</button>
                            <button className="btn btn-neutral btn-md text-white hover:text-white hover:bg-gray-600" onClick={()=>close(false)}>Нет</button>
                            </div>
                        {/*</form>*/}
                    </div>
                </div>
            </dialog>

        </>
    )
}
export default ConfirmModal;