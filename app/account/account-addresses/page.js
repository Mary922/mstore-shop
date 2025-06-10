"use client";

import {useEffect, useState} from "react";
import AddressForm from "@/app/ui/AddressForm";
import ConfirmModal from "@/app/ui/modals/ConfirmModal";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {addressesDeleteThunk, addressesGetThunk, addressesUpdateRadioThunk} from "@/app/store/slices/addressesSlice";

export default function AccountAddressesPage() {
    const dispatch = useAppDispatch();
    const [addressIsAdded, setAddressIsAdded] = useState(false);

    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
    const [selectedAddressToDelete, setSelectedAddressToDelete] = useState(null);

    let clientConstant;
    let clientId;

    if (typeof window !== "undefined") {
        clientConstant = localStorage.getItem("client");
    }

    if (typeof window !== "undefined" && clientConstant) {
        clientId = JSON.parse(localStorage.getItem("client")).id;
    }

    const addresses = useAppSelector(state => state.addresses.addresses);
    const actualRadio = useAppSelector(state => state.addresses.actualAddressId);

    useEffect(() => {
        (async () => {
            await dispatch(addressesGetThunk(clientId));
        })()
    }, [])

    const handleAddressDelete = async (newAddressId) => {
        try {
            const result = await dispatch(addressesDeleteThunk({
                addressId: newAddressId,
                flag: 1
            }))
            console.log('result deleting', result)
        } catch (error) {
            console.log(error);
        }
    }

    let addressesList = [];
    addresses.map((address) => {
        addressesList.push(
            <div className="card bg-base-100 bg-gray-100" key={address.address_id}>
                <div className="card-body flex flex-col p-2 justify-between">
                    <div className='flex flex-col'>
                        <div className='flex flex-row items-center'>
                            <div>Актуальный адрес:</div>
                            <input type="radio" name="radio-1"
                                   className="radio radio-primary"
                                   value={address.address_id}
                                   checked={actualRadio === address.address_id}
                                   onChange={async () => {
                                       await dispatch(addressesUpdateRadioThunk({
                                           addressId: address.address_id,
                                           flag: 1
                                       }));
                                   }}
                            />
                        </div>
                        <div>Регион: {address.City?.Region?.region_name}</div>
                        <div>Город: {address.City?.city_name}</div>
                        <div>Адрес: {address.address_name}</div>
                    </div>
                    <div className='flex flex-row items-center justify-center'>
                        <div className='btn btn-ghost btn-sm' onClick={() => {
                            setConfirmModalIsOpen(true);
                            setSelectedAddressToDelete(address.address_id);
                        }}>Удалить адрес
                        </div>
                    </div>

                </div>
            </div>
        )
    })

    return (
        <>
            <div className="flex flex-col w-full">
                <div className='my-3'>Следующие адреса будут использованы по умолчанию при оформлении заказов.</div>

                <div className='flex flex-row'>
                    {
                        !addressIsAdded && (
                            <button className="btn btn-primary my-5 btn-neutral"
                                    onClick={() => setAddressIsAdded(true)}>Добавить новый
                                адрес</button>
                        )
                    }

                    {
                        addressIsAdded ?
                            <>
                                <div className='flex flex-row w-full addresses'>
                                    <AddressForm setAddressIsAdded={setAddressIsAdded} id={clientId}/>
                                    <button onClick={
                                        async () => {
                                            setAddressIsAdded(false);
                                        }}
                                            className='cursor-pointer btn btn-ghost ml-10 flex items-center text-lg close-btn'>Закрыть
                                    </button>
                                </div>
                            </>
                            : null
                    }

                </div>
                <div className='grid grid-cols-3 gap-3 account-main-addresses'>
                    {addressesList}
                </div>
            </div>
            {
                confirmModalIsOpen && (
                    <ConfirmModal show={confirmModalIsOpen}
                                  close={setConfirmModalIsOpen}
                                  text={'Вы действительно хотите удалить адрес?'}
                                  func={() => handleAddressDelete(selectedAddressToDelete)}
                                  clientId={clientId}
                    />
                )
            }
        </>
    )
}