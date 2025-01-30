'use client';
import {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {useAppDispatch} from "@/app/lib/hooks";
import {getCartThunk} from "@/app/store/slices/cartSlice";

const ReduxLoader = () => {
    const dispatch = useAppDispatch();

    let tempClient;
    let client;
    let clientId;
    let token;

    useEffect(()=> {
        (async () => {

            if (typeof window !== "undefined") {
                tempClient = localStorage.getItem("temp-client");
                client = localStorage.getItem("client");
                token = localStorage.getItem("temp-client");
                console.log('toktok',token)
            }

            if (typeof window !== "undefined" && client) {
                clientId = JSON.parse(localStorage.getItem("client")).id;
                token = JSON.parse(localStorage.getItem("client")).accessToken;

                console.log('token client',token);
            }


            if (tempClient) {
                console.log('lalala its temp client')

                dispatch(getCartThunk(tempClient));
            }
            if (client) {
                console.log('lalala its auth client')
                dispatch(getCartThunk(clientId))
            }
        })()
    },[])

    // useEffect(()=> {
    //     if (token) {
    //         (async () => {
    //             if (client) {
    //                 dispatch(getCartThunk(clientId))
    //             }
    //         })()
    //     }
    // },[token,clientId])

    return (
        <>

        </>
    )
}
export default ReduxLoader;