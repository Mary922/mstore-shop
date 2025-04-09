'use client';
import {useEffect, useState} from 'react'
import {useAppDispatch} from "@/app/lib/hooks";
import {getCartThunk} from "@/app/store/slices/cartSlice";
import {wishlistGetThunk} from "@/app/store/slices/wishlistSlice";
import {jwtDecode} from "jwt-decode";

const ReduxLoader = () => {
    const dispatch = useAppDispatch();

    let tempClient;
    let client;
    let clientId;
    let token;

    const isTokenValid = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 < Date.now();
        }   catch(err) {
            return false;
        }
    }

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


            if (tempClient && isTokenValid(tempClient)) {
                // console.log('temp token', tempClient);
                // console.log('im temp hah');
                // console.log("Временный токен истек и удален");
                localStorage.removeItem("temp-client");
                return;

            } else {
                await dispatch(getCartThunk(tempClient));
            }

            if (client && isTokenValid(client)) {
                // console.log('im client constant');
                localStorage.removeItem("client");
                // console.log("Токен клиента истек");
                return;
            } else {
                await dispatch(getCartThunk(clientId))

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