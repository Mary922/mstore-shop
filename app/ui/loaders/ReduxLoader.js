'use client';
import {useEffect, useState} from 'react'
import {useAppDispatch} from "@/app/lib/hooks";
import {getCartThunk} from "@/app/store/slices/cartSlice";
import {wishlistGetThunk} from "@/app/store/slices/wishlistSlice";

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
            }

            if (typeof window !== "undefined" && client) {
                clientId = JSON.parse(localStorage.getItem("client")).id;
                token = JSON.parse(localStorage.getItem("client")).accessToken;
            }


            if (tempClient) {
                dispatch(getCartThunk(tempClient));
            }
            if (client) {
                dispatch(getCartThunk(clientId))
            }
        })()
    },[])

    useEffect(() => {
        // dispatch(restoreCart());
        if (client) {
            dispatch(wishlistGetThunk());
        }
    }, []);

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